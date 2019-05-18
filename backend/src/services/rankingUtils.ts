import { IRankingModel } from '../data/mongoconnector';
import { IRank, IRankMap } from '../graphql/types';
import { getAllPlayers } from './playerService';
import { PersonalRank } from './rankService';

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

export const findNextRankNew = (
  ranks: PersonalRank,
  tierId: number,
  rank: number,
): number => {
  const tiers = ranks.tiers.sort((a, b) => a.tierId - b.tierId);
  const tier = tiers[tierId - 1];

  if (tierId >= tiers.length && tier.players.length === 0) return 403;
  if (tier.players.length === 0) {
    return findNextRankNew(ranks, tierId + 1, rank);
  }
  const sortedPlayers = tier.players.sort(
    (a, b) => a.overallRank - b.overallRank,
  );
  return sortedPlayers[rank - 1].overallRank;
};

export const findPrecedingRankNew = (
  ranks: PersonalRank,
  tierId: number,
  rank: number,
): number => {
  if (tierId === 1) return rank - 1;
  const tiers = ranks.tiers.sort((a, b) => a.tierId - b.tierId);

  const tier = tiers[tierId - 1];
  if (tier.players.length === 0 || rank <= 1) {
    return findPrecedingRankNew(ranks, tierId - 1, rank);
  }
  const sortedPlayers = tier.players.sort(
    (a, b) => a.overallRank - b.overallRank,
  );
  return sortedPlayers[rank - 2].overallRank;
};

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
