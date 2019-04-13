import uuid from 'uuid/v4';

import { getFantasyFootballNerdRankings } from '../api/rankings';
import { PlayerRankings } from '../data/mongoconnector';
import { IRank, IRankMap, ITier } from '../graphql/types';

const DEFAULT_RANKINGS = 'defaultRankings';

interface IRankings {
  _id?: string;
  userId: string;
  tiers: ITier[];
}

export const createDefaultRankings = async (userId: string) => {
  const rankMap: any = {};
  const testObject: IRankings = {
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

export const createNewTier = async (userId: string) => {
  const rankings = await getPersonalRankings(userId);
  const newRankings = new PlayerRankings({
    ...rankings,
    tiers: [
      ...rankings.tiers,
      {
        uuid: uuid(),
        tierId: rankings.tiers.length + 1,
        rankMap: {},
      },
    ],
  });

  await PlayerRankings.updateOne({ _id: rankings._id }, newRankings);
};

const rankedTier = (rankMap: IRankMap) =>
  Object.values(rankMap).sort((a, b) => a.overallRank - b.overallRank);

const createRankMap = (ranks: IRank[]) =>
  ranks.reduce(
    (acc, rank) => ({
      ...acc,
      [rank.playerId]: rank,
    }),
    {},
  );

const movePlayerAndRest = async (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  ranks: IRankings,
) => {
  const originTierRankMap = ranks.tiers[originTier - 1].rankMap;
  const originTierList = rankedTier(originTierRankMap);
  const currentIndex = originTierList.findIndex(
    player => player.playerId === playerId,
  );
  const newOrigin = originTierList.slice(0, currentIndex);
  const newDestination = originTierList.slice(currentIndex);
  console.log('RANK', ranks);
  const newRanks = new PlayerRankings({
    ...ranks,
    tiers: [
      ...ranks.tiers.slice(0, originTier - 1),
      { ...ranks.tiers[originTier - 1], rankMap: createRankMap(newOrigin) },
      {
        ...ranks.tiers[destinationTier - 1],
        rankMap: createRankMap(newDestination),
      },
      ...ranks.tiers.slice(destinationTier),
    ],
  });
  await PlayerRankings.updateOne({ _id: newRanks._id }, newRanks);
  return newRanks.toObject().tiers;
};

export const changePlayerRank = async (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  userId: string,
) => {
  const ranks = await getPersonalRankings(userId);
  const tierDowngrade = destinationTier > originTier;
  const destTIre = ranks.tiers[destinationTier - 1];
  console.log('ONTEUHNTOEUH', destTIre);
  const destinationTierEmpty =
    !destTIre.rankMap || Object.keys(destTIre.rankMap).length <= 0;
  const originTierArray = ranks.tiers[originTier - 1];
  const originRank = originTierArray.rankMap[+playerId].overallRank;

  if (tierDowngrade && destinationTierEmpty) {
    return await movePlayerAndRest(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      ranks,
    );
  }

  const newOverallRank =
    Object.keys(originTierArray.rankMap).length + destinationRank - 1;
  console.log('ORIGINRANK', originRank, newOverallRank);
  const newOriginTier = [];

  console.log('RaNNNK', ranks);
  console.log('Args', playerId, destinationRank, destinationTier, originTier);
};

export const getPersonalRankings = async (
  userId: string,
): Promise<IRankings> => {
  return (await PlayerRankings.findOne({
    userId,
  })).toObject();
};

export const getDefaultRankings = async () =>
  await PlayerRankings.findOne({
    userId: DEFAULT_RANKINGS,
  }).exec();
