import { getQBs, IPlayer } from '../api/players';
import { getFantasyFootballNerdRankings } from '../api/rankings';
import {
  changePlayer,
  createDefaultRankings,
  getRankByUuid,
} from '../services/rankService';
import { createPlayerList } from '../services/playerService';
import { IChangeRankArgs, ICreateTierAndMovePlayersArgs, ITier } from './types';
import { IContext } from '../index';
import { createNewTier, getPersonalTier } from '../services/tierService';

export const resolvers = {
  Query: {
    players: async () => await getQBs(),
    fantasyFootballNerdRankings: async () =>
      await getFantasyFootballNerdRankings(),
    tiers: async (root: any, args: { id: string }, context: IContext) =>
      await getPersonalTier(context.user),
    rank: async (root: any, args: { id: string }) => {
      return await getRankByUuid(args.id);
    },
  },
  Mutation: {
    createDefaultRankings: async (
      root: any,
      args: { userId: string },
      context: any,
    ) => {
      await createDefaultRankings(args.userId);
      return 'Created default rankings';
    },
    createPlayerList: async () => {
      await createPlayerList();
      return 'Players inserted from Fantasy Football Nerds';
    },
    changeRank: async (root: any, args: IChangeRankArgs, context: IContext) => {
      await changePlayer(
        args.rankUuid,
        args.playerId,
        args.destinationTier,
        args.destinationRank,
        context.user,
      );
      return await getRankByUuid(args.rankUuid);
    },
    createTier: async (root: any, args: { id: string }, context: IContext) =>
      await createNewTier(args.id, context.user),
    createTierAndMovePlayers: async (
      root: any,
      args: ICreateTierAndMovePlayersArgs,
      context: IContext,
    ) => {
      console.log('test');
    },
    // await createTierAndMovePlayers(
    //   context.user,
    //   args.originTier,
    //   args.playerId,
    // ),
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
