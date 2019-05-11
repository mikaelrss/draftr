import { dbClient } from '../index';

interface INamedTier {
  name: string;
  tierId: number;
}

interface TierEntity {
  id: number;
  uuid: string;
  rank_id: number;
  tier_order: number;
  name: string;
}

export const insertTier = async (
  tier: INamedTier,
  rankId: number,
): Promise<TierEntity> => {
  const query = `insert into draftr.tier(rank_id, name, tier_order)VALUES ($1, $2, $3) returning *`;
  const values = [rankId, tier.name, tier.tierId];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};
