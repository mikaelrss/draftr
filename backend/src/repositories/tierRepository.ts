import { dbClient } from '../index';
import { RankedPlayer } from './rankedPlayerRepository';

interface INamedTier {
  name: string;
  tierId: number;
}

export interface TierEntity {
  id: number;
  uuid: string;
  rank_id: number;
  tier_order: number;
  name: string;
  players?: RankedPlayer[];
}

export const insertTier = async (
  tier: INamedTier,
  rankId: number,
): Promise<TierEntity> => {
  const query = `insert into draftr.tier(rank_id, name, tier_order)
                 VALUES ($1, $2, $3) returning *`;
  const values = [rankId, tier.name, tier.tierId];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};

export const fetchTierByTierOrder = async (
  rankId: number,
  tierOrder: number,
) => {
  console.log(rankId, tierOrder, 'HAL');
  const query =
    'SELECT * FROM draftr.tier where tier_order = $2 and rank_id = $1';
  const values = [rankId, tierOrder];
  return (await dbClient.query(query, values)).rows[0];
};

export const fetchTierByUuid = async (uuid: string): Promise<TierEntity> => {
  const query = `SELECT *
                 FROM draftr.tier
                 where uuid = $1
  `;
  const values = [uuid];
  const queryResult = await dbClient.query(query, values);
  return queryResult.rows[0];
};

export interface TierEntity {
  id: number;
  rank_id: number;
  uuid: string;
  tier_order: number;
  name: string;
}

export const fetchTiersByRankId = async (id: number): Promise<TierEntity[]> => {
  const query = `SELECT *
                 from draftr.tier
                 WHERE rank_id = $1`;
  const values = [id];
  const result = await dbClient.query(query, values);
  return result.rows;
};

export const removeTierByUuid = async (uuid: string) => {
  const query = `DELETE
                 FROM draftr.tier
                 where uuid = $1`;
  const values = [uuid];
  await dbClient.query(query, values);
};

export const updateTierOrder = async (tierOrder: number, rankId: number) => {
  const query = `update draftr.tier
set tier_order = tier_order - 1
where rank_id = $1
  and tier_order > $2`;
  const values = [rankId, tierOrder];
  await dbClient.query(query, values);
};

export const updateTierName = async (tierUuid: string, name: string) => {
  const query = `update draftr.tier set name =$1 where uuid =$2`;
  const values = [name, tierUuid];
  await dbClient.query(query, values);
};
