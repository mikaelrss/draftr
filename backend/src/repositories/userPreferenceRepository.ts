import { dbClient } from '../index';

interface UserPreferenceEntity {
  id: number;
  user_id: string;
  rank_id: number;
}

export const fetchUserPreferencesByUserId = async (
  userId: string,
): Promise<UserPreferenceEntity> => {
  const query = `SELECT *
                 FROM draftr.user_preference
                 where user_id = $1`;
  const values = [userId];
  return (await dbClient.query(query, values)).rows[0];
};

interface PlayerRankEntity {
  overall_rank: number;
  tier_order: number;
}

export const fetchPlayerRank = async (
  rankId: number,
  playerId: number,
): Promise<PlayerRankEntity> => {
  const query = `SELECT overall_rank, t.tier_order
from draftr.ranked_player
         join draftr.tier as t on ranked_player.tier_id = t.id
where draftr.ranked_player.rank_id = $1
  AND player_id = $2`;
  const values = [rankId, playerId];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};
