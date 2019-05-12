import { fetchPlayerRank } from '../repositories/userPreferenceRepository';
import {
  downgradePosition,
  updateOverallPosition,
  updateTier,
  upgradePosition,
} from '../repositories/rankedPlayerRepository';

export const getPlayerRank = async (playerId: number, rankId: number) => {
  const result = await fetchPlayerRank(rankId, playerId);
  if (result == null) throw Error('Could not fetch player rank information');
  return result;
};
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
