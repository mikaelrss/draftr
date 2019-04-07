import { IPlayerRankingDTO } from '../rankings/graphql';

export const SELECT_PLAYER = 'SELECT_PLAYER';
export const PLAYER_TAKEN = 'PLAYER_TAKEN';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export interface ISelectPlayerAction {
  type: typeof SELECT_PLAYER;
  payload: IPlayerRankingDTO;
}

export interface IPlayerTakenAction {
  type: typeof PLAYER_TAKEN;
  payload: IPlayerRankingDTO;
}

export interface IRemovePlayerAction {
  type: typeof REMOVE_PLAYER;
  payload: string;
}

export const selectPlayer = (player: IPlayerRankingDTO) => ({
  type: SELECT_PLAYER,
  payload: player,
});

export const playerTaken = (player: IPlayerRankingDTO) => ({
  type: PLAYER_TAKEN,
  payload: player,
});

export const removePlayer = (playerId: string) => ({
  type: REMOVE_PLAYER,
  payload: playerId,
});

export type ITeamActions =
  | ISelectPlayerAction
  | IPlayerTakenAction
  | IRemovePlayerAction;
