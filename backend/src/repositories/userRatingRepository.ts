import { dbClient } from '../index';

export interface UserRatingEntity {
  rank_id: number;
  user_id: string;
  rating: number;
}

export const setRating = async (
  rankId: number,
  rating: number,
  userId: string,
) => {
  const query = `INSERT INTO draftr.user_rating(rank_id, user_id, rating) values ($1, $2, $3)`;
  const values = [rankId, userId, rating];
  await dbClient.query(query, values);
};

export const fetchRatingsByRankId = async (
  rankId: number,
): Promise<UserRatingEntity[]> => {
  const query = `SELECT * FROM draftr.user_rating where rank_id = $1`;
  const values = [rankId];
  const result = await dbClient.query(query, values);
  return result.rows;
};
