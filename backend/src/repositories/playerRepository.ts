import { IPlayerModel } from '../data/mongoconnector';
import { dbClient } from '../index';

interface IPlayerEntity {
  player_id: string;
  position: string;
  display_name: string;
  first_name: string;
  last_name: string;
  team: string;
  bye_week: number;
}

export const insertPlayer = async (player: IPlayerModel) => {
  const query = `insert into draftr.player(id,
                                           position,
                                           display_name,
                                           first_name, last_name, team, bye_week)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  const values = [
    player.playerId,
    player.position,
    player.displayName,
    player.firstName,
    player.lastName,
    player.team,
    player.byeWeek,
  ];

  dbClient.query(query, values);
};
