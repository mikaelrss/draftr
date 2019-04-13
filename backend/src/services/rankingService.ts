import { getFantasyFootballNerdRankings } from '../api/rankings';
import { PlayerRankings } from '../data/mongoconnector';

const DEFAULT_RANKINGS = 'defaultRankings';

export const createDefaultRankings = async () => {
  const rankMap: any = {};
  const testObject = {
    userId: DEFAULT_RANKINGS,
    rankMap,
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

export const getDefaultRankings = async () => {
  const rankMap = await PlayerRankings.find({
    userId: DEFAULT_RANKINGS,
  }).exec();
  // @ts-ignore
  return rankMap.rankMap;
};
