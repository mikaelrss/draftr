import uuid from 'uuid/v4';

import { getFantasyFootballNerdRankings } from '../api/rankings';
import { IRanking, PlayerRankings } from '../data/mongoconnector';
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
};

export const createNewTier = async (userId: string): Promise<IRanking> => {
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

const getRankMap = (ranks: IRanking, index: number) => {
  const rankMap = ranks.tiers[index - 1].rankMap;
  console.log('GETTING RANK MAP', rankMap);
  return rankMap;
};

const rankedTier = (rankMap: IRankMap): IRank[] => {
  if (!rankMap) return [];
  const values = Object.values(rankMap);
  console.log('Trying RANKED TIER', rankMap, values);
  return values.sort((a, b) => a.overallRank - b.overallRank);
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
  ranks: IRanking,
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
  ranks: IRanking,
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
  ranks: IRanking,
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

const movePlayerCascade = async (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  ranks: IRanking,
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
  ranks: IRanking,
  operation: IRankMapper,
) => {
  console.log('VARS', originTier, destinationTier);
  const origin = rankedTier(getRankMap(ranks, originTier));
  console.log('ORIGIN', origin);
  const destination = rankedTier(getRankMap(ranks, destinationTier));
  console.log('DESTINATION', destination);

  const playerIndex = origin.findIndex(r => r.playerId === playerId);
  const movedRank = origin.find(r => r.playerId === playerId);

  const newOrigin = [
    ...origin.slice(0, playerIndex).map(operation),
    ...origin.slice(playerIndex + 1),
  ];
  console.log('NEW ORIGIN', newOrigin);

  const newRank = {
    ...movedRank,
    overallRank: !!destination[destRank - 1]
      ? destination[destRank - 1].overallRank
      : origin[0].overallRank,
  };

  console.log('NEW RANK', newRank);

  const newDestination = [
    ...destination.slice(0, destRank - 1),
    newRank,
    ...destination.slice(destRank - 1).map(operation),
  ];
  console.log('NEW DESTINATION', newDestination);

  const intermediate = mapIntermediateTiers(
    ranks,
    destinationTier,
    originTier,
    operation,
  );

  console.log('INTERMEDIATE', intermediate);

  //
  const test = ranks.toObject();
  const PRE_DESTINATION = test.tiers.slice(0, destinationTier - 1);
  const POST_ORIGIN = test.tiers.slice(originTier);

  console.log('PRE DESTINATION', PRE_DESTINATION);

  const CHANGE_DESTINATION = test.tiers[destinationTier - 1];
  const CHANGE_ORIGIN = test.tiers[originTier - 1];

  ranks.tiers = [
    ...PRE_DESTINATION,
    { ...CHANGE_DESTINATION, rankMap: createRankMap(newDestination) },
    ...intermediate.map((tier, index) => ({
      ...test.tiers[destinationTier + index],
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
  const originTierArray = ranks.tiers[originTier - 1];
  const originRank = originTierArray.rankMap[+playerId].overallRank;

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
    // TODO: This don't work
    return await movePlayerPropagateLeft(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      ranks,
      increaseRank,
    );
  }

  const newOverallRank =
    Object.keys(originTierArray.rankMap).length + destinationRank - 1;
  console.log('ORIGINRANK', originRank, newOverallRank);
  const newOriginTier = [];

  console.log('RaNNNK', ranks);
  console.log('Args', playerId, destinationRank, destinationTier, originTier);
};

export const getPersonalRankings = async (userId: string): Promise<IRanking> =>
  await PlayerRankings.findOne({
    userId,
  });

export const getDefaultRankings = async () =>
  await PlayerRankings.findOne({
    userId: DEFAULT_RANKINGS,
  }).exec();
