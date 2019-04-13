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
  rankMap: IRankMap;
}

export interface IChangeRankArgs {
  playerId: string;
  originTier: number;
  destinationTier: number;
  destinationRank: number;
}
