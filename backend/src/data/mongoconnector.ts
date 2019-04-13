import mongoose, { Schema } from 'mongoose';
import { MONGO_PASSWORD, MONGO_URL, MONGO_USER } from '../config';

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

const PlayerRankingsSchema = new Schema(
  {
    userId: Schema.Types.String,
    tiers: [
      new Schema({
        tierId: Schema.Types.Number,
        rankMap: Schema.Types.Mixed,
      }),
    ],
  },
  { strict: false },
);

export const PlayerRankings = mongoose.model(
  'playerrankings',
  PlayerRankingsSchema,
);

export const Player = mongoose.model('players', PlayerSchema);
