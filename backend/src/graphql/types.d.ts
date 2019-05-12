import { IRankedPlayer } from '../api/players';

export interface ISetPlayerPositionArgs {
  playerId: string;
  positionRank: number;
  fromPositionRank: number;
}

interface IRank {
  playerId: string;
  overallRank: number;
  positionRank: number;
}

export interface IRankMap {
  [playerId: string]: IRank;
}

export interface ITier {
  uuid: string;
  tierId: number;
  players: IRankedPlayer[];
}

export interface IChangeRankArgs {
  rankUuid: string;
  playerId: string;
  destinationTier: number;
  destinationRank: number;
}

export interface ICreateTierAndMovePlayersArgs {
  playerId: string;
  originTier: number;
}
