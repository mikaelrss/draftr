import { dbClient } from '../index';

interface IRankEntity {
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

interface IRank {
  playerId: number;
  overallRank: number;
  tierOrder: number;
  displayName: string;
  position: string;
  team: string;
  uuid: string;
}

export const insertRank = async (name: string): Promise<IRankEntity> => {
  const query = `insert into draftr.rank(name)
                 VALUES ($1) RETURNING *`;
  const values = [name];
  const result = await dbClient.query(query, values);
  console.log(result.rows);
  return result.rows[0];
};

export const fetchRank = async (rankId: number) => {
  const query = `SELECT t.tier_order, overall_rank, player_id, p.display_name, p.position, p.team, t.uuid
from draftr.ranked_player
         LEFT join draftr.tier as t on ranked_player.tier_id = t.id
         LEFT join draftr.rank as r on t.rank_id = r.id
         LEFT JOIN draftr.player as p on ranked_player.player_id = p.id
where r.id = $1`;
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
