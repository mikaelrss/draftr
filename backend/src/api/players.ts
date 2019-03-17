import axios from 'axios';

import { API_KEY, BASE_URL, FORMAT } from '../config';

const URL = `${BASE_URL}/players/${FORMAT}/${API_KEY}`;

export interface IPlayer {
  playerId: string;
  active: boolean;
  jersey: string;
  lname: string;
  fname: string;
  displayName: string;
  team: string;
  position: string;
  height: string;
  weight: string;
  dob: string;
  college: string;
}

export interface IPlayerDTO {
  playerId: string;
  active: boolean;
  jersey: string;
  lastName: string;
  firstName: string;
  displayName: string;
  team: string;
  position: string;
  height: string;
  weight: string;
  dateOfBirth: string;
  college: string;
}

export const getQBs = async (): Promise<IPlayer[]> =>
  (await axios.get(`${URL}/QB`)).data.Players;
