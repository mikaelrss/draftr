import { ForbiddenError } from 'apollo-server';
import { IPlayer } from '../api/players';
import {
  changePlayer,
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
  UpdateTierNameArgs,
} from './types';
import { IContext } from '../index';
import {
  changeTierName,
  createNewTier,
  deleteTier,
  getPersonalTier,
  userOwnsTier,
} from '../services/tierService';
import { getPlayersByTierId } from '../services/rankedPlayerService';
import { TierEntity } from '../repositories/tierRepository';
import {
  getAverageRatingByRankId,
  rateRanking,
} from '../services/userRatingService';
import { userOwnsRank } from '../services/userPreferenceService';

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
    updateTierName: async (
      root: any,
      args: UpdateTierNameArgs,
      context: IContext,
    ) => {
      if (!userOwnsTier(args.tierUuid, context.user)) {
        throw new ForbiddenError('User does not own tier');
      }
      return await changeTierName(args.tierUuid, args.name);
    },
  },
  Rank: {
    rating: async (rank: PersonalRank) => {
      const rating = await getAverageRatingByRankId(rank.id);
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
