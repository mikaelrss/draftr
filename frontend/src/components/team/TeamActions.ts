import { IPlayerRankingDTO } from '../rankings/graphql';

export const SELECT_PLAYER = 'SELECT_PLAYER';
export const PLAYER_TAKEN = 'PLAYER_TAKEN';

export interface ISelectPlayerAction {
  type: typeof SELECT_PLAYER;
  payload: IPlayerRankingDTO;
}

export interface IPlayerTakenAction {
  type: typeof PLAYER_TAKEN;
  payload: IPlayerRankingDTO;
}

export const selectPlayer = (player: IPlayerRankingDTO) => ({
  type: SELECT_PLAYER,
  payload: player,
});

export const playerTaken = (player: IPlayerRankingDTO) => ({
  type: PLAYER_TAKEN,
  payload: player,
});

export type ITeamActions = ISelectPlayerAction | IPlayerTakenAction;
