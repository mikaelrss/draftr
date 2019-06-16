import { IPlayer } from '../api/players';
import {
  changePlayer,
  changeRankName,
  copyRank,
  createRank,
  deleteRank,
  getRankById,
  getRankByUuid,
  getRanks,
  PersonalRank,
  setRankPrivate,
  userOwnsRank,
  verifyUserCanEditRank,
  verifyUserCanEditRankByUuid,
} from '../services/rankService';
import { createPlayerList } from '../services/playerService';
import {
  CopyRankArgs,
  CreateRankArgs,
  DeleteTierArgs,
  IChangeRankArgs,
  RateRankArgs,
  SetRankPrivateArgs,
  UpdateRankNameArgs,
  UpdateTierNameArgs,
} from './types';
import { Context } from '../index';
import {
  changeTierName,
  createNewTier,
  deleteTier,
  getPersonalTier,
  verifyUserCanEditTier,
} from '../services/tierService';
import { getPlayersByTierId } from '../services/rankedPlayerService';
import { TierEntity } from '../repositories/tierRepository';
import {
  getAverageRatingByRankId,
  rateRanking,
} from '../services/userRatingService';

export const resolvers = {
  Query: {
    tiers: async (root: any, args: { id: string }, context: Context) =>
      await getPersonalTier(context.user),
    rank: async (root: any, args: { id: string }, ctx: Context) => {
      const rank = await getRankByUuid(args.id);
      if (!rank.private) return rank;
      await verifyUserCanEditRank(rank.id, ctx.user);
      return rank;
    },
    ranks: async (root: any, args: any, ctx: Context) =>
      await getRanks(ctx.user),
  },
  Mutation: {
    rateRank: async (root: any, args: RateRankArgs, ctx: Context) => {
      await rateRanking(args.rankUuid, args.rating, ctx.user);
      return await getRankByUuid(args.rankUuid);
    },
    createRank: async (root: any, args: CreateRankArgs, context: Context) => {
      const rank = await createRank(args.name, context.user);
      return await getRankById(rank.id);
    },
    copyRank: async (root: any, args: CopyRankArgs, context: Context) => {
      return await copyRank(args.rankUuid, args.name, context.user);
    },
    createPlayerList: async () => {
      await createPlayerList();
      return 'Players inserted from Fantasy Football Nerds';
    },
    deleteRank: async (_: any, { id }: { id: string }, context: Context) => {
      await verifyUserCanEditRankByUuid(id, context.user);
      await deleteRank(id);
    },
    changeRank: async (root: any, args: IChangeRankArgs, context: Context) => {
      await verifyUserCanEditRankByUuid(args.rankUuid, context.user);
      await changePlayer(
        args.rankUuid,
        args.playerId,
        args.destinationTier,
        args.destinationRank,
        context.user,
      );
      return await getRankByUuid(args.rankUuid);
    },
    deleteTier: async (root: any, args: DeleteTierArgs, context: Context) => {
      await verifyUserCanEditTier(args.id, context.user);
      return await deleteTier(args.id, context.user);
    },
    createTier: async (root: any, args: { id: string }, context: Context) => {
      await verifyUserCanEditRankByUuid(args.id, context.user);
      return await createNewTier(args.id, context.user);
    },
    updateRankName: async (
      _: any,
      args: UpdateRankNameArgs,
      context: Context,
    ) => {
      await verifyUserCanEditRankByUuid(args.rankUuid, context.user);
      return await changeRankName(args.rankUuid, args.name);
    },
    updateTierName: async (
      root: any,
      args: UpdateTierNameArgs,
      context: Context,
    ) => {
      await verifyUserCanEditTier(args.tierUuid, context.user);
      return await changeTierName(args.tierUuid, args.name);
    },
    setRankPrivate: async (
      root: any,
      args: SetRankPrivateArgs,
      cxt: Context,
    ) => {
      await verifyUserCanEditRankByUuid(args.uuid, cxt.user);
      await setRankPrivate(args.uuid, args.status);
    },
  },
  Rank: {
    rating: async (rank: PersonalRank) => {
      const rating = await getAverageRatingByRankId(rank.id);
      return rating || 0;
    },
    userOwnsRank: async (rank: PersonalRank, _: any, context: Context) => {
      return await userOwnsRank(rank.id, context.user);
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
