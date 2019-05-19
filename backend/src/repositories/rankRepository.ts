import { dbClient } from '../index';
import { fetchRankId } from '../services/userPreferenceService';

interface RankEntity {
  id: number;
  name: string;
  uuid: string;
}

export interface PlayerRank {
  playerId: number;
  id: number;
  overallRank: number;
  tierOrder: number;
  tierName: string;
  displayName: string;
  position: string;
  team: string;
  uuid: string;
}

export const insertRank = async (name: string): Promise<RankEntity> => {
  const query = `insert into draftr.rank(name)
                 VALUES ($1) RETURNING *`;
  const values = [name];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};

export const fetchRank = async (rankId: number): Promise<PlayerRank[]> => {
  const query = `SELECT t.tier_order, t.id, t.name, overall_rank, player_id, p.display_name, p.position, p.team, t.uuid
from draftr.rank
         join draftr.tier as t on rank.id = t.rank_id
         LEFT JOIN draftr.ranked_player as rp on rp.tier_id = t.id
         LEFT join draftr.player as p on rp.player_id = p.id
where draftr.rank.id = $1`;
  const values = [rankId];
  const result = await dbClient.query(query, values);
  return result.rows.map(row => ({
    playerId: row.player_id,
    overallRank: row.overall_rank,
    tierOrder: row.tier_order,
    displayName: row.display_name,
    position: row.position,
    tierName: row.name,
    id: row.id,
    team: row.team,
    uuid: row.uuid,
  }));
};

export const fetchRankByUuid = async (uuid: string): Promise<RankEntity> => {
  const query = `SELECT *
                 from draftr.rank
                 where uuid = $1`;
  const values = [uuid];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};

export const fetchRankById = async (id: number) => {
  const query = `SELECT * from draftr.rank where id = $1`;
  const values = [id];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};

export const fetchRankByUserId = async (userId: string) => {
  const rankId = await fetchRankId(userId);
  return await fetchRankById(rankId);
};

export const fetchRanks = async () => {
  const query = `SELECT * FROM draftr.rank`;
  const result = await dbClient.query(query);
  return result.rows;
};

export const addRank = async (name: string, creator: string) => {
  const query = `INSERT INTO draftr.rank (name, creator) VALUES ($1, $2) RETURNING *`;
  const values = [name, creator];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};
