import axios from 'axios';

import { API_KEY, BASE_URL, FORMAT } from '../config';
import { IRankedPlayer } from './players';

const URL = `${BASE_URL}/draft-rankings/${FORMAT}/${API_KEY}`;

export const getFantasyFootballNerdRankings = async (
  all: boolean = false,
): Promise<IRankedPlayer[]> => {
  const players = (await axios.get(`${URL}`)).data.DraftRankings.sort(
    (a: IRankedPlayer, b: IRankedPlayer) => a.overallRank - b.overallRank,
  );
  if (!all) return players.slice(0, 402);
  return players;
};
