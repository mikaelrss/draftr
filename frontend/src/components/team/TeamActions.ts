import { rankings_rank_tiers_players } from '../rankings/__generated__/rankings';

export const SELECT_PLAYER = 'SELECT_PLAYER';
export const PLAYER_TAKEN = 'PLAYER_TAKEN';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UNTAKE_PLAYER = 'UNTAKE_PLAYER';

export interface ISelectPlayerAction {
  type: typeof SELECT_PLAYER;
  payload: rankings_rank_tiers_players;
}

export interface IPlayerTakenAction {
  type: typeof PLAYER_TAKEN;
  payload: rankings_rank_tiers_players;
}

export interface IRemovePlayerAction {
  type: typeof REMOVE_PLAYER;
  payload: number;
}

export interface IUntakePlayerAction {
  type: typeof UNTAKE_PLAYER;
  payload: number;
}

export const selectPlayer = (player: rankings_rank_tiers_players) => ({
  type: SELECT_PLAYER,
  payload: player,
});

export const playerTaken = (player: rankings_rank_tiers_players) => ({
  type: PLAYER_TAKEN,
  payload: player,
});

export const removePlayer = (playerId: number) => ({
  type: REMOVE_PLAYER,
  payload: playerId,
});

export const untakePlayer = (playerId: number) => ({
  type: UNTAKE_PLAYER,
  payload: playerId,
});

export type ITeamActions =
  | ISelectPlayerAction
  | IPlayerTakenAction
  | IRemovePlayerAction
  | IUntakePlayerAction;
