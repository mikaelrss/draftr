import mongoose, { Schema, Document } from 'mongoose';
import { MONGO_PASSWORD, MONGO_URL, MONGO_USER } from '../config';
import { IRankMap } from '../graphql/types';

const URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/DraftrDev`;

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

export interface ITiers extends Document {
  uuid: string;
  tierId: number;
  rankMap: IRankMap;
}

export interface IRanking extends Document {
  userId: string;
  tiers: ITiers[];
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

export const PlayerRankings = mongoose.model<IRanking>(
  'playerrankings',
  PlayerRankingsSchema,
);

export const Player = mongoose.model('players', PlayerSchema);
