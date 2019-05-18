interface CreateRankArgs {
  name: string;
}

interface IRank {
  playerId: string;
  overallRank: number;
  positionRank: number;
}

export interface IRankMap {
  [playerId: string]: IRank;
}

export interface IChangeRankArgs {
  rankUuid: string;
  playerId: number;
  destinationTier: number;
  destinationRank: number;
}

export interface DeleteTierArgs {
  id: string;
}
