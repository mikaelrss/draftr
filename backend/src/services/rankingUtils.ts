import { IRankingModel } from '../data/mongoconnector';
import { IRank, IRankMap } from '../graphql/types';
import { getAllPlayers } from './playerService';

export const getRankMap = (ranks: IRankingModel, index: number) =>
  ranks.tiers[index - 1].rankMap;

export const rankedTier = (rankMap: IRankMap): IRank[] => {
  if (!rankMap) return [];
  return Object.values(rankMap).sort((a, b) => a.overallRank - b.overallRank);
};

export const createRankMap = (ranks: IRank[]): IRankMap =>
  ranks.reduce(
    (acc, rank) => ({
      ...acc,
      [rank.playerId]: rank,
    }),
    {},
  );

export const decreaseRank = (rank: IRank) => ({
  ...rank,
  overallRank: rank.overallRank - 1,
});

export const increaseRank = (rank: IRank) => ({
  ...rank,
  overallRank: rank.overallRank + 1,
});

export const findPrecedingRank = (
  ranks: IRankingModel,
  destinationTier: number,
): number => {
  if (destinationTier === 0) return 1;
  const preceding = rankedTier(getRankMap(ranks, destinationTier));
  if (preceding.length === 0) {
    return findPrecedingRank(ranks, destinationTier - 1);
  }
  return preceding.slice(-1)[0].overallRank;
};

export const findFollowingRank = async (
  ranks: IRankingModel,
  destinationTier: number,
): Promise<number> => {
  if (destinationTier > ranks.tiers.length)
    return (await getAllPlayers()).length;
  const following = rankedTier(getRankMap(ranks, destinationTier));
  if (following.length === 0) {
    return findFollowingRank(ranks, destinationTier + 1);
  }
  return following[0].overallRank;
};
