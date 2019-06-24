import createUuid from 'uuid/v4';
import { ForbiddenError } from 'apollo-server';

import { getFantasyFootballNerdRankings } from '../api/rankings';
import { findNextRankNew, findPrecedingRankNew } from './rankingUtils';
import { IRankedPlayer } from '../api/players';
import {
  addRank,
  fetchRankById,
  fetchRankByUuid,
  fetchRanks,
  insertRank,
  PlayerRank,
  removeRankById,
  setRankName,
  updateRankPrivate,
} from '../repositories/rankRepository';
import { insertTier } from '../repositories/tierRepository';
import { insertRankedPlayer } from '../repositories/rankedPlayerRepository';
import { setRankId } from './userPreferenceService';
import {
  createNewTier,
  deleteTiersByRankId,
  getTierIdByTierOrder,
  getTiersByRankId,
} from './tierService';
import {
  deleteRankedPlayersByRankId,
  getPlayerRank,
  updatePlayerRank,
  updatePlayerTierCascade,
} from './rankedPlayerService';

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

export const getRankById = async (id: number) => {
  const rank = await fetchRankById(id);
  return {
    id: rank.id,
    uuid: rank.uuid,
    private: rank.private,
    name: rank.name,
    creator: rank.creator,
    tiers: await getTiersByRankId(rank.id),
  };
};

export const getRankByUuid = async (uuid: string) => {
  const rank = await fetchRankByUuid(uuid);
  return {
    id: rank.id,
    uuid: rank.uuid,
    private: rank.private,
    creator: rank.creator,
    name: rank.name,
    tiers: await getTiersByRankId(rank.id),
  };
};

export const userOwnsRank = async (rankId: number, userId: string) => {
  const rank = await getRankById(rankId);
  return rank.creator === userId;
};

export const userOwnsRankByUuid = async (rankUuid: string, userId: string) => {
  const rank = await getRankByUuid(rankUuid);
  return rank.creator === userId;
};

export const verifyUserCanEditRank = async (rankId: number, user: string) => {
  const canEdit = await userOwnsRank(rankId, user);
  if (!canEdit) {
    throw new ForbiddenError("You don't own this Rank");
  }
};

export const verifyUserCanEditRankByUuid = async (
  rankUuid: string,
  user: string,
) => {
  const canEdit = await userOwnsRankByUuid(rankUuid, user);
  if (!canEdit) {
    throw new ForbiddenError("You don't own this Rank");
  }
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
  if (
    originalRank.tier_order - destTier === -1 &&
    rank.tiers[destTier - 1].players.length === 0
  ) {
    // TODO must not overwrite players in other tiers
    await updatePlayerTierCascade(
      rank.id,
      originalRank.overall_rank,
      rank.tiers[originalRank.tier_order - 1].id,
      rank.tiers[destTier - 1].id,
    );
    return;
  }
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
  id?: number;
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

export const createRank = async (name: string, userId: string) => {
  const fantasyRankings = await getFantasyFootballNerdRankings();
  const newRank = await addRank(name, userId);
  const newTier = await createNewTier(newRank.uuid, userId);

  // eslint-disable-next-line
  console.log('TEST', fantasyRankings);

  fantasyRankings.forEach(async player => {
    await insertRankedPlayer(
      newRank.id,
      newTier.id,
      +player.playerId,
      player.overallRank,
    );
  });
  return newRank;
};

export const copyRank = async (
  rankUuid: string,
  name: string,
  userId: string,
) => {
  const rank = await getRankByUuid(rankUuid);
  const newRank = await addRank(name, userId);
  rank.tiers.forEach(async tier => {
    const newTier = await insertTier(tier, newRank.id);
    tier.players.forEach(async player => {
      await insertRankedPlayer(
        newRank.id,
        newTier.id,
        player.playerId,
        player.overallRank,
      );
    });
  });
  return newRank;
};

export const getRanks = async (userId: string) => {
  const ranks = await fetchRanks();
  return ranks.filter(rank => !rank.private || rank.creator === userId);
};

export const setRankPrivate = async (uuid: string, status: boolean) => {
  await updateRankPrivate(uuid, status);
};

export const changeRankName = async (uuid: string, name: string) => {
  await setRankName(uuid, name);
  return await getRankByUuid(uuid);
};

export const deleteRank = async (uuid: string) => {
  const rank = await getRankByUuid(uuid);
  await deleteRankedPlayersByRankId(rank.id);
  await deleteTiersByRankId(rank.id);
  await removeRankById(rank.id);
};
