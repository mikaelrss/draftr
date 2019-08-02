import { dbClient } from '../index';
import { mapPlayerEntity } from '../services/playerService';

export interface PlayerEntity {
  id: string;
  position: string;
  display_name: string;
  first_name: string;
  last_name: string;
  team: string;
  bye_week: number;
}

export interface PlayerModel {
  playerId: string;
  position: string;
  displayName: string;
  firstName: string;
  lastName: string;
  team: string;
  byeWeek: number;
}

export const insertPlayer = async (player: PlayerModel) => {
  const query = `insert into draftr.player(id,
                                           position,
                                           display_name,
                                           first_name, last_name, team, bye_week)
                 VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
  const values = [
    player.playerId,
    player.position,
    player.displayName,
    player.firstName,
    player.lastName,
    player.team,
    player.byeWeek,
  ];

  const queryResult = await dbClient.query(query, values);
  return mapPlayerEntity(queryResult.rows[0]);
};

export const searchForPlayerRepo = async (
  name: string,
): Promise<PlayerEntity> => {
  const query = `select * from draftr.player where display_name LIKE $1`;
  const values = [name];
  return (await dbClient.query(query, values)).rows[0];
};
