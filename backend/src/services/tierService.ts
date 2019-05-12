import {
  createDefaultRankings,
  getPersonalRank,
  PersonalTier,
} from './rankService';
import { insertTier } from '../repositories/tierRepository';
import { fetchRankId } from './userPreferenceService';
import { fetchRank, PlayerRank } from '../repositories/rankRepository';
import groupBy from 'lodash.groupby';

export const createNewTier = async (userId: string): Promise<PersonalTier> => {
  const rank = await getPersonalRank(userId);
  const tierId =
    rank.tiers.sort((a, b) => a.tierId - b.tierId).slice(-1)[0].tierId + 1;
  const insertedTier = await insertTier({ name: 'default', tierId }, rank.id);
  return {
    tierId: +insertedTier.tier_order,
    uuid: insertedTier.uuid,
    players: [],
  };
};

const mapRanks = (ranks: PlayerRank[]) => {
  const tiers = groupBy(ranks, 'tierOrder');
  return Object.keys(tiers).map(tierOrder => ({
    tierId: +tierOrder,
    uuid: tiers[tierOrder][0].uuid,
    players: tiers[tierOrder].filter(p => p.playerId != null),
  }));
};

export const getPersonalTier = async (
  userId: string,
): Promise<PersonalTier[]> => {
  const rankId = await fetchRankId(userId);
  console.log(rankId);
  if (rankId == null) await createDefaultRankings(userId);
  const ranks = await fetchRank(rankId || (await fetchRankId(userId)));
  return mapRanks(ranks);
};

export const getTiersByRankId = async (rankId: number) => {
  const ranks = await fetchRank(rankId);
  return mapRanks(ranks);
};
