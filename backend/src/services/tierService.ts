import { ForbiddenError, ValidationError } from 'apollo-server';
import {
  createDefaultRankings,
  getRankById,
  getRankByUuid,
  PersonalTier,
} from './rankService';
import {
  fetchTierByTierOrder,
  fetchTierByUuid,
  insertTier,
  removeTierByUuid,
  TierEntity,
} from '../repositories/tierRepository';
import { fetchRankId, userOwnsRank } from './userPreferenceService';
import { fetchRank, PlayerRank } from '../repositories/rankRepository';
import groupBy from 'lodash.groupby';
import { getPlayersByTierId } from './rankedPlayerService';

export const createNewTier = async (
  rankUuid: string,
  userId: string,
): Promise<PersonalTier> => {
  const rank = await getRankByUuid(rankUuid);
  if (!userOwnsRank(rank.id, userId)) throw new ForbiddenError('Forbidden');
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
    name: tiers[tierOrder][0].tierName,
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

export const getTierIdByTierOrder = async (
  rankId: number,
  tierOrder: number,
) => {
  const result = await fetchTierByTierOrder(rankId, tierOrder);
  return result.id;
};

const userOwnsTier = async (tierUuid: string, userId: string) => {
  const tier = await fetchTierByUuid(tierUuid);
  const rank = await getRankById(tier.rank_id);
  return userOwnsRank(rank.id, userId);
};

const getTierByUuid = async (tierUuid: string): Promise<TierEntity> => {
  const tierEntity = await fetchTierByUuid(tierUuid);
  return {
    id: tierEntity.id,
    uuid: tierEntity.uuid,
    rank_id: tierEntity.rank_id,
    tier_order: tierEntity.tier_order,
    name: tierEntity.name,
    players: await getPlayersByTierId(tierEntity.id),
  };
};

export const deleteTier = async (tierUuid: string, userId: string) => {
  if (!userOwnsTier(tierUuid, userId)) {
    throw new ForbiddenError("You don't own the tier");
  }
  const tier = await getTierByUuid(tierUuid);
  if (!tier) throw new ValidationError('Tier does not exist');
  if (tier.players.length !== 0) {
    throw new ValidationError('You can not delete a tier with players');
  }
  await removeTierByUuid(tierUuid);
  return tier;
};
