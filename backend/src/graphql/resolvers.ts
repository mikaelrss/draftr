import { getQBs, IPlayer } from '../api/players';
import { getFantasyFootballNerdRankings } from '../api/rankings';
import {
  changePlayerRank,
  createDefaultRankings,
  createTierAndMovePlayers,
  getPersonalTier,
} from '../services/rankService';
import { createPlayerList } from '../services/playerService';
import { IChangeRankArgs, ICreateTierAndMovePlayersArgs, ITier } from './types';
import { IContext } from '../index';
import { createNewTier } from '../services/tierService';

export const resolvers = {
  Query: {
    players: async () => await getQBs(),
    fantasyFootballNerdRankings: async () =>
      await getFantasyFootballNerdRankings(),
    tiers: async (root: any, args: any, context: IContext) =>
      await getPersonalTier(context.user),
  },
  Mutation: {
    createDefaultRankings: async (root: any, args: { userId: string }) => {
      await createDefaultRankings(args.userId);
      return 'Created default rankings';
    },
    createPlayerList: async () => {
      await createPlayerList();
      return 'Players inserted from Fantasy Football Nerds';
    },
    changeRank: async (root: any, args: IChangeRankArgs, context: IContext) =>
      await changePlayerRank(
        args.playerId,
        args.originTier,
        args.destinationTier,
        args.destinationRank,
        context.user,
      ),
    createTier: async (root: any, args: any, context: IContext) =>
      await createNewTier(context.user),
    createTierAndMovePlayers: async (
      root: any,
      args: ICreateTierAndMovePlayersArgs,
      context: IContext,
    ) =>
      await createTierAndMovePlayers(
        context.user,
        args.originTier,
        args.playerId,
      ),
  },
  Tier: {
    players: async (tier: ITier) =>
      tier.players.sort((a, b) => a.overallRank - b.overallRank),
  },
  Player: {
    lastName: async ({ lname }: IPlayer) => lname,
    firstName: async ({ fname }: IPlayer) => fname,
    dateOfBirth: async ({ dob }: IPlayer) => dob,
  },
  RankedPlayer: {
    lastName: async ({ lname }: IPlayer) => lname,
    firstName: async ({ fname }: IPlayer) => fname,
  },
};
