import { ForbiddenError, ValidationError } from 'apollo-server';
import {
  createDefaultRankings,
  getRankById,
  getRankByUuid,
  PersonalTier,
  userOwnsRank,
} from './rankService';
import {
  fetchTierByTierOrder,
  fetchTierByUuid,
  insertTier,
  removeTierByUuid,
  removeTiersByRankId,
  TierEntity,
  updateTierName,
  updateTierOrder,
} from '../repositories/tierRepository';
import { fetchRankId } from './userPreferenceService';
import { fetchRank, PlayerRank } from '../repositories/rankRepository';
import groupBy from 'lodash.groupby';
import { getPlayersByTierId } from './rankedPlayerService';

export const createNewTier = async (
  rankUuid: string,
  userId: string,
): Promise<PersonalTier> => {
  const rank = await getRankByUuid(rankUuid);
  if (!userOwnsRank(rank.id, userId)) throw new ForbiddenError('Forbidden');
  let tierId: number;
  if (!rank.tiers.length) {
    tierId = 1;
  } else {
    tierId =
      rank.tiers.sort((a, b) => a.tierId - b.tierId).slice(-1)[0].tierId + 1;
  }

  const insertedTier = await insertTier({ name: 'default', tierId }, rank.id);
  return {
    id: insertedTier.id,
    name: insertedTier.name,
    tierId: +insertedTier.tier_order,
    uuid: insertedTier.uuid,
    players: [],
  };
};

const mapRanks = (ranks: PlayerRank[]) => {
  const tiers = groupBy(ranks, 'tierOrder');
  return Object.keys(tiers).map(tierOrder => ({
    name: tiers[tierOrder][0].tierName,
    id: tiers[tierOrder][0].id,
    tierId: +tierOrder,
    uuid: tiers[tierOrder][0].uuid,
    players: tiers[tierOrder].filter(p => p.playerId != null),
  }));
};

export const getPersonalTier = async (
  userId: string,
): Promise<PersonalTier[]> => {
  const rankId = await fetchRankId(userId);
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

export const userOwnsTier = async (tierUuid: string, userId: string) => {
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
  await updateTierOrder(tier.tier_order, tier.rank_id);
  return tier;
};

export const changeTierName = async (tierUuid: string, name: string) => {
  await updateTierName(tierUuid, name);
  return await getTierByUuid(tierUuid);
};

export const verifyUserCanEditTier = async (tierUuid: string, user: string) => {
  const canEdit = await userOwnsTier(tierUuid, user);
  if (!canEdit) {
    throw new ForbiddenError("You don't own this Tier");
  }
};

export const deleteTiersByRankId = async (rankId: number) => {
  await removeTiersByRankId(rankId);
};
