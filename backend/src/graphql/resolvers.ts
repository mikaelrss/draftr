import { getQBs, IPlayer } from '../api/players';
import { getFantasyFootballNerdRankings } from '../api/rankings';
import {
  changePlayerRank,
  createDefaultRankings,
  createNewTier,
  createTierAndMovePlayers,
  getPersonalRankings,
} from '../services/rankingService';
import {
  createPlayerList,
  getAllPlayers,
  mapPlayer,
} from '../services/playerService';
import { IChangeRankArgs, ICreateTierAndMovePlayersArgs, ITier } from './types';
import { IContext } from '../index';

export const resolvers = {
  Query: {
    players: async () => await getQBs(),
    fantasyFootballNerdRankings: async () =>
      await getFantasyFootballNerdRankings(),
    tiers: async (root: any, args: any, context: IContext) =>
      (await getPersonalRankings(context.user)).tiers,
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
      (await createNewTier(context.user)).tiers,
    createTierAndMovePlayers: async (
      root: any,
      args: ICreateTierAndMovePlayersArgs,
      context: IContext,
    ) => {
      return await createTierAndMovePlayers(
        context.user,
        args.originTier,
        args.playerId,
      );
    },
  },
  Tier: {
    players: async (tier: ITier) => {
      const timer = async () => {
        const all = await getAllPlayers();
        if (!tier.rankMap) return [];
        const tierPlayerIds = Object.keys(tier.rankMap);
        return all
          .filter(player => tierPlayerIds.includes(player.playerId))
          .map(p => ({
            ...mapPlayer(p),
            ...tier.rankMap[p.playerId],
          }))
          .sort((a, b) => a.overallRank - b.overallRank);
      };
      const result = await timer();
      return result;
    },
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
