import { dbClient } from '../index';

interface IRankedPlayer {
  id: number;
  tierId: number;
  playerId: number;
  overallRank: number;
}

export const insertRankedPlayer = async (
  rankId: number,
  tierId: number,
  playerId: number,
  overallRank: number,
) => {
  const query = `insert into draftr.ranked_player(rank_id, tier_id, player_id, overall_rank)
                 VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [rankId, tierId, playerId, overallRank];
  let result;
  try {
    result = await dbClient.query(query, values);
  } catch (e) {
    console.log('ERROR', e);
  }
  return result.rows[0];
};

export const upgradePosition = async (
  rankId: number,
  newPosition: number,
  currentPosition: number,
) => {
  const query = `update draftr.ranked_player
                 set overall_rank = draftr.ranked_player.overall_rank + 1
                 where draftr.ranked_player.overall_rank >= $2
                   AND draftr.ranked_player.overall_rank < $3
                   AND draftr.ranked_player.rank_id = $1;`;
  const values = [rankId, newPosition, currentPosition];
  await dbClient.query(query, values);
};

export const downgradePosition = async (
  rankId: number,
  newPosition: number,
  currentPosition: number,
) => {
  const query = `update draftr.ranked_player
                 set overall_rank = draftr.ranked_player.overall_rank - 1
                 where draftr.ranked_player.overall_rank > $2
                   AND draftr.ranked_player.overall_rank <= $3
                   AND draftr.ranked_player.rank_id = $1;`;
  const values = [rankId, currentPosition, newPosition];
  await dbClient.query(query, values);
};

export const updateOverallPosition = async (
  rankId: number,
  playerId: number,
  position: number,
) => {
  const query = `update draftr.ranked_player
                 set overall_rank = $3
                 where draftr.ranked_player.rank_id = $1
                   and draftr.ranked_player.player_id = $2`;
  const values = [rankId, playerId, position];
  await dbClient.query(query, values);
};

export const updateTier = async (
  rankId: number,
  playerId: number,
  tierId: number,
) => {
  const query =
    'update draftr.ranked_player set tier_id = $1 where rank_id = $2 and player_id = $3';
  const values = [tierId, rankId, playerId];
  await dbClient.query(query, values);
};
