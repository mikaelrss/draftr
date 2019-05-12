import { dbClient } from '../index';

interface UserPreferenceEntity {
  id: number;
  user_id: string;
  rank_id: number;
}

export const fetchUserPreferencesByUserId = async (
  userId: string,
): Promise<UserPreferenceEntity> => {
  const query = `SELECT * FROM draftr.user_preference where user_id = $1`;
  const values = [userId];
  return (await dbClient.query(query, values)).rows[0];
};
