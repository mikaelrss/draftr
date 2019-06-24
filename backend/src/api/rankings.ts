import axios from 'axios';

import { API_KEY, BASE_URL, FORMAT } from '../config';
import { IRankedPlayer } from './players';

const URL = `${BASE_URL}/draft-rankings/${FORMAT}/${API_KEY}`;

export const getFantasyFootballNerdRankings = async (
  all: boolean = false,
): Promise<IRankedPlayer[]> => {
  // eslint-disable-next-line
  console.log('URL', URL);
  const players = (await axios.get(`${URL}`)).data.DraftRankings.sort(
    (a: IRankedPlayer, b: IRankedPlayer) => a.overallRank - b.overallRank,
  );
  if (!all) return players.slice(0, 402);
  // eslint-disable-next-line
  console.log(players[0]);
  // eslint-disable-next-line
  console.log(players[1]);
  // eslint-disable-next-line
  console.log(players[2]);

  return players;
};
