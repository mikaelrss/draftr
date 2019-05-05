import groupBy from 'lodash.groupby';
import { IPlayerModel, Player } from '../data/mongoconnector';
import { getFantasyFootballNerdRankings } from '../api/rankings';
import { insertPlayer, insertPlayers } from '../repositories/playerRepository';

export const getAllPlayers = async (): Promise<IPlayerModel[]> =>
  await Player.find();

export const createPlayerList = async () => {
  const allPlayers = await getFantasyFootballNerdRankings();
  const byPosition = groupBy(allPlayers, 'position');
  // const mostImportant = [
  //   ...byPosition.QB.slice(0, 32),
  //   ...byPosition.RB.slice(0, 70),
  //   ...byPosition.WR.slice(0, 70),
  //   ...byPosition.TE.slice(0, 20),
  //   ...byPosition.K.slice(0, 32),
  //   ...byPosition.DEF,
  // ];
  // allPlayers.slice(0, 403).forEach(player => {
  //   const model = new Player({
  //     ...player,
  //   });
  //   model.save();
  // });
  allPlayers
    .slice(0, 402)
    .map(player => ({
      playerId: player.playerId,
      position: player.position,
      displayName: player.displayName,
      firstName: player.fname,
      lastName: player.lname,
      team: player.team,
      byeWeek: player.byeWeek,
    }))
    .forEach(insertPlayer);
};

export const mapPlayer = (playerModel: IPlayerModel) => ({
  playerId: playerModel.playerId,
  position: playerModel.position,
  displayName: playerModel.displayName,
  firstName: playerModel.firstName,
  lastName: playerModel.lastName,
  team: playerModel.team,
  byeWeek: playerModel.byeWeek,
});
