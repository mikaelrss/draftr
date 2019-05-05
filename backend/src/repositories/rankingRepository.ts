import Sequelize from 'sequelize';
import { sequelize } from '../data/postgresConnector';
import { IRankedPlayer } from '../api/players';
import { IRankingModel } from '../data/mongoconnector';

interface IRankEntity {
  id: number;
  player_id: string;
  user_id: string;
  user_rank: string;
}

class Rank extends Sequelize.Model {}
Rank.init(
  {
    player_id: Sequelize.STRING,
    user_id: Sequelize.STRING,
    user_rank: Sequelize.STRING,
  },
  { sequelize, modelName: 'players' },
);

export const insertRankings = async (rankings: IRankingModel) => {

  Rank.create()

  await Rank.create({
    player_id: player.playerId,
    user_id: userId,
    user_rank: player.overallRank,
  });
};
