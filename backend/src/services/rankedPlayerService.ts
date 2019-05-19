import { fetchPlayerRank } from '../repositories/userPreferenceRepository';
import {
  downgradePosition,
  fetchPlayersByTierId,
  updateOverallPosition,
  updateTier, updateTierCascade,
  upgradePosition,
} from '../repositories/rankedPlayerRepository';

export const getPlayerRank = async (playerId: number, rankId: number) => {
  const result = await fetchPlayerRank(rankId, playerId);
  if (result == null) throw Error('Could not fetch player rank information');
  return result;
};

export const getPlayersByTierId = async (id: number) =>
  await fetchPlayersByTierId(id);

export const updatePlayerRank = async (
  rankId: number,
  playerId: number,
  currentPosition: number,
  newPosition: number,
  tierId: number,
) => {
  const positionUpgrade = newPosition < currentPosition;
  if (positionUpgrade) {
    await upgradePosition(rankId, newPosition, currentPosition);
  } else {
    await downgradePosition(rankId, newPosition, currentPosition);
  }
  await updateOverallPosition(rankId, playerId, newPosition);
  await updateTier(rankId, playerId, tierId);
};

export const updatePlayerTierCascade = async (
  rankId: number,
  playerRank: number,
  destinationTier: number,
) => {
  await updateTierCascade(rankId, playerRank, destinationTier);
};
