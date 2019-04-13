import { Player } from '../data/mongoconnector';
import { IPlayer } from '../api/players';

export const getAllPlayers = async (): Promise<IPlayer[]> =>
  (await Player.find({})).map(p => p.toObject());
