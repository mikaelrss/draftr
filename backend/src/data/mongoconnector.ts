import { IRankMap } from '../graphql/types';

export interface ITiersModel extends Document {
  uuid: string;
  tierId: number;
  rankMap: IRankMap;
}

export interface IRankingModel extends Document {
  userId: string;
  tiers: ITiersModel[];
}

export interface IPlayerModel extends Document {
  playerId: string;
  position: string;
  displayName: string;
  firstName: string;
  lastName: string;
  team: string;
  byeWeek: number;
}
