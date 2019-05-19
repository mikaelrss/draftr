import { dbClient } from '../index';

export const fetchRankId = async (userId: string) => {
  const query = `SELECT * from draftr.user_preference where user_id = $1`;
  const values = [userId];
  const res = await dbClient.query(query, values);
  return res.rows[0] ? res.rows[0].rank_id : null;
};

export const setRankId = async (userId: string, rankId: number) => {
  const query = `insert into draftr.user_preference (user_id, rank_id) values ($1, $2)`;
  const values = [userId, rankId];
  await dbClient.query(query, values);
};
