import { getPersonalRank, PersonalTier } from './rankService';
import { insertTier } from '../repositories/tierRepository';

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
