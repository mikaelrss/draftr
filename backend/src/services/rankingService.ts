import { getFantasyFootballNerdRankings } from '../api/rankings';
import { PlayerRankings } from '../data/mongoconnector';

const DEFAULT_RANKINGS = 'defaultRankings';

export const createDefaultRankings = async () => {
  const rankMap: any = {};
  const testObject = {
    userId: DEFAULT_RANKINGS,
    tiers: [{ tierId: 1, rankMap }],
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

export const getPersonalRankings = async () => {
  const ranks = await getDefaultRankings();
  console.log('TEUT', ranks);
  // @ts-ignore
  return ranks.tiers;
};

export const getDefaultRankings = async () =>
  await PlayerRankings.findOne({
    userId: DEFAULT_RANKINGS,
  }).exec();
