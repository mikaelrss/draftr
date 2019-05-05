import Sequelize from 'sequelize';
import { sequelize } from '../data/postgresConnector';
import { IPlayerModel } from '../data/mongoconnector';

interface IPlayerEntity {
  player_id: string;
  position: string;
  display_name: string;
  first_name: string;
  last_name: string;
  team: string;
  bye_week: number;
}

class Player extends Sequelize.Model {}
Player.init(
  {
    player_id: Sequelize.STRING,
    position: Sequelize.STRING,
    display_name: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    team: Sequelize.STRING,
    bye_week: Sequelize.NUMBER,
  },
  { sequelize, modelName: 'players' },
);

export const insertPlayers = async (players: IPlayerModel[]) => {};

export const insertPlayer = async (player: IPlayerModel) => {
  await Player.create({
    player_id: player.playerId,
    position: player.position,
    display_name: player.displayName,
    first_name: player.firstName,
    last_name: player.lastName,
    team: player.team,
    bye_week: player.byeWeek,
  });
};
