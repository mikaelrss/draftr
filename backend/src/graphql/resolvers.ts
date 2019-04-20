import { getQBs, IPlayer } from '../api/players';
import { getFantasyFootballNerdRankings } from '../api/rankings';
import {
  changePlayerRank,
  createDefaultRankings,
  createNewTier,
  getPersonalRankings,
} from '../services/rankingService';
import {
  createPlayerList,
  getAllPlayers,
  mapPlayer,
} from '../services/playerService';
import { IChangeRankArgs, ITier } from './types';
import { IContext } from '../index';

export const resolvers = {
  Query: {
    players: async () => await getQBs(),
    fantasyFootballNerdRankings: async () =>
      await getFantasyFootballNerdRankings(),
    tiers: async (root: any, args: any, context: IContext) => {
      console.log(context.user);
      // console.time('AGQL -- personalRankings');
      const iTiers = (await getPersonalRankings(context.user)).tiers;
      // console.timeEnd('AGQL -- personalRankings');
      return iTiers;
    },
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
    changeRank: async (root: any, args: IChangeRankArgs, context: IContext) => {
      // console.time('changeRank');
      const result = await changePlayerRank(
        args.playerId,
        args.originTier,
        args.destinationTier,
        args.destinationRank,
        context.user,
      );
      // console.timeEnd('changeRank');
      return result;
    },
    createTier: async (root: any, args: any, context: IContext) => {
      // console.time('MUTATION == createTier');
      const iTiersModels = (await createNewTier(context.user)).tiers;
      // console.timeEnd('MUTATION == createTier');
      return iTiersModels;
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
      // console.time(`AGQL -- RESOLVER -- TIER - players - #${tier.tierId}`);
      const result = await timer();
      // console.timeEnd(`AGQL -- RESOLVER -- TIER - players - #${tier.tierId}`);
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
