import mongoose, { Schema, Document } from 'mongoose';
import {
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_USER,
  MLAB_URL,
  MLAB_PASSWORD,
  MLAB_USER,
  DB_NAME,
} from '../config';
import { IRankMap } from '../graphql/types';

const MLAB_URI = `mongodb://${MLAB_USER}:${MLAB_PASSWORD}@${MLAB_URL}/draftrdev`;
const URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${DB_NAME}`;

mongoose.connect(URI, { useNewUrlParser: true });

const PlayerSchema = new Schema({
  playerId: Schema.Types.String,
  position: Schema.Types.String,
  displayName: Schema.Types.String,
  firstName: Schema.Types.String,
  lastName: Schema.Types.String,
  team: Schema.Types.String,
  byeWeek: Schema.Types.Number,
});

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

const PlayerRankingsSchema = new Schema(
  {
    userId: Schema.Types.String,
    tiers: [
      new Schema({
        uuid: Schema.Types.String,
        tierId: Schema.Types.Number,
        rankMap: Schema.Types.Mixed,
      }),
    ],
  },
  { strict: false },
);

export const PlayerRankings = mongoose.model<IRankingModel>(
  'playerrankings',
  PlayerRankingsSchema,
);

export const Player = mongoose.model<IPlayerModel>('players', PlayerSchema);
