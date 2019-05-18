import createUuid from 'uuid/v4';
import { ForbiddenError } from 'apollo-server';

import { getFantasyFootballNerdRankings } from '../api/rankings';
import { findNextRankNew, findPrecedingRankNew } from './rankingUtils';
import { IRankedPlayer } from '../api/players';
import {
  fetchRankByUuid,
  fetchRankByUserId,
  insertRank,
  PlayerRank,
  fetchRank,
  fetchRankById,
} from '../repositories/rankRepository';
import { insertTier } from '../repositories/tierRepository';
import { insertRankedPlayer } from '../repositories/rankedPlayerRepository';
import { setRankId, userOwnsRank } from './userPreferenceService';
import {
  getPersonalTier,
  getTierIdByTierOrder,
  getTiersByRankId,
} from './tierService';
import { getPlayerRank, updatePlayerRank } from './rankedPlayerService';

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
      { tierId: tier.tierId, name: 'default' },
      rank.id,
    );
    Object.values(tier.rankMap).forEach(async (player: any) => {
      await insertRankedPlayer(
        rank.id,
        inserted.id,
        player.playerId,
        player.overallRank,
      );
    });
  });
  await setRankId(userId, rank.id);
};

export const changePlayer = async (
  rankUuid: string,
  playerId: number,
  destTier: number,
  destRank: number,
  userId: string,
) => {
  const rank = await getRankByUuid(rankUuid);
  const originalRank = await getPlayerRank(playerId, rank.id);
  if (!userOwnsRank(rank.id, userId)) throw new ForbiddenError('Forbidden');

  const tierDownGrade = originalRank.tier_order < destTier;
  let newOverallRank = 0;
  if (tierDownGrade) {
    newOverallRank = findNextRankNew(rank, destTier, destRank) - 1;
  } else {
    newOverallRank = findPrecedingRankNew(rank, destTier, destRank) + 1;
  }

  const newTierId = await getTierIdByTierOrder(rank.id, destTier);
  await updatePlayerRank(
    rank.id,
    playerId,
    originalRank.overall_rank,
    newOverallRank,
    newTierId,
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

export const getRankById = async (id: number) => {
  const rank = await fetchRankById(id);
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
