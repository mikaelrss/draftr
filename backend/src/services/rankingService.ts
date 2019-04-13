import uuid from 'uuid/v4';

import { getFantasyFootballNerdRankings } from '../api/rankings';
import { PlayerRankings } from '../data/mongoconnector';
import { ITier } from '../graphql/types';

const DEFAULT_RANKINGS = 'defaultRankings';

interface IRankings {
  _id?: string;
  userId: string;
  tiers: ITier[];
}

export const createDefaultRankings = async () => {
  const rankMap: any = {};
  const testObject: IRankings = {
    userId: DEFAULT_RANKINGS,
    tiers: [{ tierId: 1, rankMap, uuid: uuid() }],
  };
  const fantasyRankings = await getFantasyFootballNerdRankings();
  fantasyRankings.forEach((player: any) => {
    rankMap[player.playerId] = {
      positionRank: +player.positionRank,
      overallRank: +player.overallRank,
    };
  });

  const test = new PlayerRankings(testObject);
  test.save();
};

export const createNewTier = async (userId: string) => {
  const rankings = await getPersonalRankings(userId);
  const newRankings = new PlayerRankings({
    ...rankings,
    tiers: [
      ...rankings.tiers,
      {
        uuid: uuid(),
        tierId: rankings.tiers.length + 1,
        rankMap: {},
      },
    ],
  });

  await PlayerRankings.updateOne({ _id: rankings._id }, newRankings);
};

export const getPersonalRankings = async (
  userId: string,
): Promise<IRankings> => {
  return (await PlayerRankings.findOne({
    userId,
  })).toObject();
};

export const getDefaultRankings = async () =>
  await PlayerRankings.findOne({
    userId: DEFAULT_RANKINGS,
  }).exec();
