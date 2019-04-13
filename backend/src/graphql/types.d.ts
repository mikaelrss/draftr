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
  tierId: number;
  rankMap: IRankMap;
}
