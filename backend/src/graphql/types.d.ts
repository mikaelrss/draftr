export interface ISetPlayerPositionArgs {
  playerId: string;
  positionRank: number;
  fromPositionRank: number;
}

interface IRank {
  overallRanking: number;
  positionRanking: number;
}

export interface IRankMap {
  [playerId: string]: IRank;
}

export interface ITier {
  uuid: string;
  tierId: number;
  rankMap: IRankMap;
}
