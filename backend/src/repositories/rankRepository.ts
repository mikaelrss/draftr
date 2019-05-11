import { dbClient } from '../index';

interface RankEntity {
  name: string;
  id: number;
}

interface IRankObjectEntity {
  id: number;
  tier_id: number;
  player_id: number;
  overall_rank: number;
  rank_id: number;
  tier_order: number;
  name: string;
  display_name: string;
  position: string;
  team: string;
  uuid: string;
}

export interface PlayerRank {
  playerId: number;
  overallRank: number;
  tierOrder: number;
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
  const query = `SELECT t.tier_order, overall_rank, player_id, p.display_name, p.position, p.team, t.uuid
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
    team: row.team,
    uuid: row.uuid,
  }));
};
