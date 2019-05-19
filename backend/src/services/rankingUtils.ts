import { PersonalRank } from './rankService';

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
  if (tierId < 1) return 0;
  if (tierId === 1 && rank !== -1) return rank - 1;
  const tiers = ranks.tiers.sort((a, b) => a.tierId - b.tierId);

  const tier = tiers[tierId - 1];
  if (tier.players.length === 0 || rank === 1) {
    return findPrecedingRankNew(ranks, tierId - 1, -1);
  }
  const sortedPlayers = tier.players.sort(
    (a, b) => a.overallRank - b.overallRank,
  );
  if (rank === -1) {
    return sortedPlayers.slice(-1)[0].overallRank;
  }
  return sortedPlayers[rank - 2].overallRank;
};
