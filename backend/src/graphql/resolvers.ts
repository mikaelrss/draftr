import { IPlayer } from '../api/players';
import {
  changePlayer,
  createDefaultRankings,
  createRank,
  getRankById,
  getRankByUuid,
  getRanks,
} from '../services/rankService';
import { createPlayerList } from '../services/playerService';
import { CreateRankArgs, DeleteTierArgs, IChangeRankArgs } from './types';
import { IContext } from '../index';
import {
  createNewTier,
  deleteTier,
  getPersonalTier,
} from '../services/tierService';
import { getPlayersByTierId } from '../services/rankedPlayerService';
import { TierEntity } from '../repositories/tierRepository';

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
