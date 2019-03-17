import { getQBs, IPlayer } from '../api/players';

export const resolvers = {
  Query: {
    players: async () => await getQBs(),
  },
  Player: {
    lastName: async ({ lname }: IPlayer) => lname,
    firstName: async ({ fname }: IPlayer) => fname,
    dateOfBirth: async ({ dob }: IPlayer) => dob,
  },
};
