import axios from 'axios';

import { API_KEY, BASE_URL, FORMAT } from '../config';
import { IPlayer } from './players';

const URL = `${BASE_URL}/draft-rankings/${FORMAT}/${API_KEY}`;

export const getFantasyFootballNerdRankings = async (): Promise<IPlayer[]> =>
  (await axios.get(`${URL}`)).data.DraftRankings;
