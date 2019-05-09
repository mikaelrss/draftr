import { dbClient } from '../index';

interface IRankedPlayer {
  id: number;
  tierId: number;
  playerId: number;
  overallRank: number;
}

export const insertRankedPlayer = async (
  tierId: number,
  playerId: number,
  overallRank: number,
) => {
  const query = `insert into draftr.ranked_player(tier_id, player_id, overall_rank) VALUES ($1, $2, $3) RETURNING *`;
  const values = [tierId, playerId, overallRank];
  let result;
  try {
    result = await dbClient.query(query, values);
  } catch (e) {
    console.log('ERROR', e);
  }
  return result.rows[0];
};
