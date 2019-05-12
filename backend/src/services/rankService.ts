import createUuid from 'uuid/v4';
import { ForbiddenError } from 'apollo-server';

import { getFantasyFootballNerdRankings } from '../api/rankings';
import { IRankingModel } from '../data/mongoconnector';
import { IRank } from '../graphql/types';
import {
  createRankMap,
  decreaseRank,
  findPrecedingRank,
  getRankMap,
  increaseRank,
  rankedTier,
} from './rankingUtils';
import { IRankedPlayer } from '../api/players';
import {
  fetchRankByUuid,
  fetchRankByUserId,
  insertRank,
  PlayerRank,
} from '../repositories/rankRepository';
import { insertTier } from '../repositories/tierRepository';
import { insertRankedPlayer } from '../repositories/rankedPlayerRepository';
import { setRankId, userOwnsRank } from './userPreferenceService';
import {
  createNewTier,
  getPersonalTier,
  getTiersByRankId,
} from './tierService';

const DEFAULT_RANKINGS = 'defaultRankings';

type IRankMapper = (r: IRank) => IRank;
const DEFAULT_TIERS = 20;

export const createDefaultRankings = async (userId: string) => {
  const fantasyRankings = await getFantasyFootballNerdRankings();
  const tiers = new Array(DEFAULT_TIERS)
    .fill({})
    .map((item: any, index: number) => ({
      ...item,
      rankMap: {},
      tierId: index + 1,
      uuid: createUuid(),
    }));

  const testObject = {
    userId,
    tiers,
  };

  fantasyRankings.forEach((player: IRankedPlayer, index: number) => {
    const tierIndex = Math.min(Math.ceil((index + 1) / 8), DEFAULT_TIERS) - 1;
    testObject.tiers[tierIndex].rankMap[player.playerId] = {
      playerId: player.playerId,
      positionRank: +player.positionRank,
      overallRank: +player.overallRank,
    };
  });

  const rank = await insertRank(userId);
  console.log(rank);
  testObject.tiers.forEach(async tier => {
    const inserted = await insertTier(
      { tierId: tier.tierId, name: `${tier.tierId}` },
      rank.id,
    );
    Object.values(tier.rankMap).forEach(async (player: any) => {
      await insertRankedPlayer(
        inserted.id,
        player.playerId,
        player.overallRank,
      );
    });
  });
  await setRankId(userId, rank.id);
};

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
  ranks: IRankingModel,
  destinationTier: number,
) => [
  ...destination.slice(0, destinationRank - 1).map(mapOperation),
  {
    ...playerRank,
    overallRank: !!destination[destinationRank - 1]
      ? destination[destinationRank - 1].overallRank - 1
      : findPrecedingRank(ranks, destinationTier),
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
    ranks,
    destinationTier,
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
      : findPrecedingRank(ranks, destinationTier) + 1,
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

export const createTierAndMovePlayers = async (
  userId: string,
  originTier: number,
  playerId: string,
) => {
  const rankings = await getPersonalTier(userId);
  // @ts-ignore
  console.log(rankings.tiers.length, originTier);
  // @ts-ignore
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
    // @ts-ignore
    newRanks,
  );
};

export const changePlayer = async (
  rankUuid: string,
  playerId: string,
  destinationTier: number,
  destinationRank: number,
  userId: string,
) => {
  const ranks = await getRankByUuid(rankUuid);
  if (!userOwnsRank(ranks.id, userId)) throw new ForbiddenError('Forbidden');
  console.log(rankUuid, playerId, destinationTier, destinationRank);
};

export const changePlayerRank = async (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  userId: string,
) => {
  console.time('fetchRanks');
  const ranks = await getPersonalTier(userId);
  console.timeEnd('fetchRanks');

  const tierDowngrade = destinationTier > originTier;
  const tierUpgrade = destinationTier < originTier;
  // @ts-ignore
  const { rankMap } = ranks.tiers[destinationTier - 1];
  const destinationEmpty = !rankMap || Object.keys(rankMap).length <= 0;
  // @ts-ignore
  const isLastTier = ranks.tiers.length === destinationTier;

  if (tierDowngrade && destinationEmpty && isLastTier) {
    return await movePlayerCascade(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      // @ts-ignore
      ranks,
    );
  }
  if (tierDowngrade) {
    return await movePlayerPropagate(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      // @ts-ignore
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
      // @ts-ignore
      ranks,
      increaseRank,
    );
  }

  return await movePlayerInsideTier(
    playerId,
    originTier,
    destinationRank,
    // @ts-ignore
    ranks,
  );
};

export interface PersonalTier {
  tierId: number;
  uuid: string;
  players: PlayerRank[];
  name?: string;
}

export interface PersonalRank {
  id: number;
  uuid: string;
  name: string;
  tiers: PersonalTier[];
}

export const getRankByUuid = async (uuid: string) => {
  const rank = await fetchRankByUuid(uuid);
  return {
    id: rank.id,
    uuid: rank.uuid,
    name: rank.name,
    tiers: await getTiersByRankId(rank.id),
  };
};

export const getPersonalRank = async (
  userId: string,
): Promise<PersonalRank> => {
  const rank = await fetchRankByUserId(userId);
  return {
    id: rank.id,
    uuid: rank.uuid,
    name: rank.name,
    tiers: await getPersonalTier(userId),
  };
};
