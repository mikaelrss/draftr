import uuid from 'uuid/v4';

import { getFantasyFootballNerdRankings } from '../api/rankings';
import { IRankingModel, PlayerRankings } from '../data/mongoconnector';
import { IRank, IRankMap } from '../graphql/types';

const DEFAULT_RANKINGS = 'defaultRankings';

type IRankMapper = (r: IRank) => IRank;

export const createDefaultRankings = async (userId: string) => {
  const rankMap: any = {};
  const testObject = {
    userId,
    tiers: [{ tierId: 1, rankMap, uuid: uuid() }],
  };
  const fantasyRankings = await getFantasyFootballNerdRankings();
  fantasyRankings.forEach((player: any) => {
    rankMap[player.playerId] = {
      playerId: player.playerId,
      positionRank: +player.positionRank,
      overallRank: +player.overallRank,
    };
  });

  const test = new PlayerRankings(testObject);
  test.save();
  return test;
};

export const createNewTier = async (userId: string): Promise<IRankingModel> => {
  const ranks = await getPersonalRankings(userId);
  const rankObject = ranks.toObject();

  ranks.tiers = [
    ...rankObject.tiers,
    {
      uuid: uuid(),
      tierId: ranks.tiers.length + 1,
      rankMap: {},
    },
  ];
  ranks.save();
  return ranks;
};

const getRankMap = (ranks: IRankingModel, index: number) =>
  ranks.tiers[index - 1].rankMap;

const rankedTier = (rankMap: IRankMap): IRank[] => {
  if (!rankMap) return [];
  return Object.values(rankMap).sort((a, b) => a.overallRank - b.overallRank);
};

const createRankMap = (ranks: IRank[]): IRankMap =>
  ranks.reduce(
    (acc, rank) => ({
      ...acc,
      [rank.playerId]: rank,
    }),
    {},
  );

const decreaseRank = (rank: IRank) => ({
  ...rank,
  overallRank: rank.overallRank - 1,
});

const increaseRank = (rank: IRank) => ({
  ...rank,
  overallRank: rank.overallRank + 1,
});

const createNewOrigin = (
  playerId: string,
  origin: IRank[],
  mapOperation: IRankMapper,
) => {
  const playerIndex = origin.findIndex(p => p.playerId === playerId);
  return [
    ...origin.slice(0, playerIndex),
    ...origin.slice(playerIndex + 1).map(mapOperation),
  ];
};

const createDestination = (
  playerRank: IRank,
  destination: IRank[],
  destinationRank: number,
  mapOperation: IRankMapper,
) => [
  ...destination.slice(0, destinationRank - 1).map(mapOperation),
  {
    ...playerRank,
    overallRank: destination[destinationRank - 1].overallRank - 1,
  },
  ...destination.slice(destinationRank - 1),
];

const mapIntermediateTiers = (
  ranks: IRankingModel,
  originTier: number,
  destinationTier: number,
  operation: IRankMapper,
) =>
  [...ranks.tiers.slice(originTier, destinationTier - 1)]
    .map(value => rankedTier(value.rankMap))
    .map(rankss => rankss.map(operation));

const movePlayerPropagate = async (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destRank: number,
  ranks: IRankingModel,
  operation: IRankMapper,
) => {
  const origin = rankedTier(getRankMap(ranks, originTier));
  const destination = rankedTier(getRankMap(ranks, destinationTier));

  const movedRank = origin.find(rank => rank.playerId === playerId);

  const newOrigin = createNewOrigin(playerId, origin, operation);
  const intermediate = mapIntermediateTiers(
    ranks,
    originTier,
    destinationTier,
    operation,
  );

  const newDest = createDestination(
    movedRank,
    destination,
    destRank,
    operation,
  );
  transformPlayerRankings(
    ranks,
    newOrigin,
    newDest,
    originTier,
    destinationTier,
    intermediate,
  );
  console.time('updateRanks');
  ranks.save();
  console.timeEnd('updateRanks');
  return ranks.tiers;
};

const transformPlayerRankings = (
  ranks: IRankingModel,
  newOrigin: IRank[],
  newDest: IRank[],
  originTier: number,
  destinationTier: number,
  intermediate: IRank[][] = [],
) => {
  const test = ranks.toObject();
  ranks.tiers = [
    ...test.tiers.slice(0, originTier - 1),
    { ...test.tiers[originTier - 1], rankMap: createRankMap(newOrigin) },
    ...intermediate.map((tier, index) => ({
      ...test.tiers[originTier + index],
      rankMap: createRankMap(tier),
    })),
    { ...test.tiers[destinationTier - 1], rankMap: createRankMap(newDest) },
    ...test.tiers.slice(destinationTier),
  ];
};

const movePlayerInsideTier = async (
  playerId: string,
  tierId: number,
  destIndex: number,
  ranks: IRankingModel,
) => {
  const tier = rankedTier(getRankMap(ranks, tierId));

  const currentRank = tier.find(r => r.playerId === playerId);
  const currentIndex = tier.findIndex(r => r.playerId === playerId);

  const newRank = currentRank.overallRank - (currentIndex - destIndex + 1);

  const movingUp = newRank < currentRank.overallRank;
  let newTier: IRank[];

  if (movingUp) {
    newTier = [
      ...tier.slice(0, destIndex - 1),
      { ...currentRank, overallRank: newRank },
      ...tier.slice(destIndex - 1, currentIndex).map(increaseRank),
      ...tier.slice(currentIndex + 1),
    ];
  } else {
    const PRE_MOVE = tier.slice(0, currentIndex);
    const POST_MOVE = tier.slice(currentIndex + 1, destIndex).map(decreaseRank);
    const POST_ALL = tier.slice(destIndex);
    newTier = [
      ...PRE_MOVE,
      ...POST_MOVE,
      { ...currentRank, overallRank: newRank },
      ...POST_ALL,
    ];
  }

  const tiers = ranks.toObject().tiers;
  ranks.tiers = [
    ...tiers.slice(0, tierId - 1),
    { ...tiers[tierId - 1], rankMap: createRankMap(newTier) },
    ...tiers.slice(tierId),
  ];
  ranks.save();
  return ranks.tiers;
};

const movePlayerCascade = async (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  ranks: IRankingModel,
) => {
  if (destinationTier - originTier > 1) {
    throw Error('Cannot move more than one TIER at a time');
  }
  const originTierRankMap = ranks.tiers[originTier - 1].rankMap;
  const originTierList = rankedTier(originTierRankMap);
  const currentIndex = originTierList.findIndex(
    player => player.playerId === playerId,
  );
  const newOrigin = originTierList.slice(0, currentIndex);
  const newDestination = originTierList.slice(currentIndex);
  transformPlayerRankings(
    ranks,
    newOrigin,
    newDestination,
    originTier,
    destinationTier,
  );
  ranks.save();
  return ranks.tiers;
};

const movePlayerPropagateLeft = async (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destRank: number,
  ranks: IRankingModel,
  operation: IRankMapper,
) => {
  const origin = rankedTier(getRankMap(ranks, originTier));
  const destination = rankedTier(getRankMap(ranks, destinationTier));

  const playerIndex = origin.findIndex(r => r.playerId === playerId);
  const movedRank = origin.find(r => r.playerId === playerId);

  const newOrigin = [
    ...origin.slice(0, playerIndex).map(operation),
    ...origin.slice(playerIndex + 1),
  ];

  const newRank = {
    ...movedRank,
    overallRank: !!destination[destRank - 1]
      ? destination[destRank - 1].overallRank
      : origin[0].overallRank,
  };

  const newDestination = [
    ...destination.slice(0, destRank - 1),
    newRank,
    ...destination.slice(destRank - 1).map(operation),
  ];

  const intermediate = mapIntermediateTiers(
    ranks,
    destinationTier,
    originTier,
    operation,
  );

  const tiers = ranks.toObject().tiers;
  const PRE_DESTINATION = tiers.slice(0, destinationTier - 1);
  const POST_ORIGIN = tiers.slice(originTier);

  const CHANGE_DESTINATION = tiers[destinationTier - 1];
  const CHANGE_ORIGIN = tiers[originTier - 1];

  ranks.tiers = [
    ...PRE_DESTINATION,
    { ...CHANGE_DESTINATION, rankMap: createRankMap(newDestination) },
    ...intermediate.map((tier, index) => ({
      ...tiers[destinationTier + index],
      rankMap: createRankMap(tier),
    })),
    {
      ...CHANGE_ORIGIN,
      rankMap: createRankMap(newOrigin),
    },
    ...POST_ORIGIN,
  ];
  ranks.save();
  return ranks.tiers;
};

export const changePlayerRank = async (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  userId: string,
) => {
  console.time('fetchRanks');
  const ranks = await getPersonalRankings(userId);
  console.timeEnd('fetchRanks');

  const tierDowngrade = destinationTier > originTier;
  const tierUpgrade = destinationTier < originTier;

  const { rankMap } = ranks.tiers[destinationTier - 1];
  const destinationEmpty = !rankMap || Object.keys(rankMap).length <= 0;

  if (tierDowngrade && destinationEmpty) {
    return await movePlayerCascade(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      ranks,
    );
  }
  if (tierDowngrade) {
    return await movePlayerPropagate(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      ranks,
      decreaseRank,
    );
  }
  if (tierUpgrade) {
    return await movePlayerPropagateLeft(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      ranks,
      increaseRank,
    );
  }

  return await movePlayerInsideTier(
    playerId,
    originTier,
    destinationRank,
    ranks,
  );
};

export const createTierAndMovePlayers = async (
  userId: string,
  originTier: number,
  playerId: string,
) => {
  const rankings = await getPersonalRankings(userId);
  console.log(rankings.tiers.length, originTier);
  if (rankings.tiers.length !== originTier) {
    // move single player to new tier
    throw new Error(
      'Need to move a player from last tier to create a new tier',
    );
  }
  const newRanks = await createNewTier(userId);
  return await movePlayerCascade(
    playerId,
    originTier,
    originTier + 1,
    1,
    newRanks,
  );
};

export const getPersonalRankings = async (
  userId: string,
): Promise<IRankingModel> => {
  const ranks = await PlayerRankings.findOne({
    userId,
  });
  if (ranks == null) return await createDefaultRankings(userId);
  return ranks;
};

export const getDefaultRankings = async () =>
  await PlayerRankings.findOne({
    userId: DEFAULT_RANKINGS,
  }).exec();
