import { IPlayer } from '../api/players';
import {
  changePlayer,
  createDefaultRankings,
  createRank,
  getRankById,
  getRankByUuid,
  getRanks,
  PersonalRank,
} from '../services/rankService';
import { createPlayerList } from '../services/playerService';
import {
  CreateRankArgs,
  DeleteTierArgs,
  IChangeRankArgs,
  RateRankArgs,
} from './types';
import { IContext } from '../index';
import {
  createNewTier,
  deleteTier,
  getPersonalTier,
} from '../services/tierService';
import { getPlayersByTierId } from '../services/rankedPlayerService';
import { TierEntity } from '../repositories/tierRepository';
import {
  getAverageRatingByRankId,
  rateRanking,
} from '../services/userRatingService';

export const resolvers = {
  Query: {
    tiers: async (root: any, args: { id: string }, context: IContext) =>
      await getPersonalTier(context.user),
    rank: async (root: any, args: { id: string }) => {
      return await getRankByUuid(args.id);
    },
    ranks: async (root: any, args: any) => await getRanks(),
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
    rateRank: async (root: any, args: RateRankArgs, ctx: IContext) => {
      await rateRanking(args.rankUuid, args.rating, ctx.user);
      return await getRankByUuid(args.rankUuid);
    },
    createRank: async (root: any, args: CreateRankArgs, context: IContext) => {
      const rank = await createRank(args.name, context.user);
      return await getRankById(rank.id);
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
    deleteTier: async (root: any, args: DeleteTierArgs, context: IContext) => {
      return await deleteTier(args.id, context.user);
    },
    createTier: async (root: any, args: { id: string }, context: IContext) =>
      await createNewTier(args.id, context.user),
  },
  Rank: {
    rating: async (rank: PersonalRank) => {
      console.log(rank);
      const rating = await getAverageRatingByRankId(rank.id);
      console.log('NUMB', rating);
      return rating || 0;
    },
  },
  Tier: {
    players: async (tier: TierEntity) => {
      const players = tier.players || (await getPlayersByTierId(tier.id));
      return players.sort((a, b) => a.overallRank - b.overallRank);
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
