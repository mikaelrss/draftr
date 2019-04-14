import { getQBs, IPlayer, IRankedPlayer } from '../api/players';
import { getFantasyFootballNerdRankings } from '../api/rankings';
import {
  changePlayerRank,
  createDefaultRankings,
  createNewTier,
  getDefaultRankings,
  getPersonalRankings,
} from '../services/rankingService';
import { getAllPlayers } from '../services/playerService';
import { IChangeRankArgs, ISetPlayerPositionArgs, ITier } from './types';

const moveDownList = (
  players: IRankedPlayer[],
  playerIndex: number,
  toRank: number,
) => {
  const previouslyRanked = players.slice(0, playerIndex);

  const changed = players.slice(playerIndex + 1, toRank).map(p => ({
    ...p,
    positionRank: p.positionRank,
  }));

  return [
    ...previouslyRanked,
    ...changed,
    {
      ...players[playerIndex],
      positionRank: toRank,
    },
    ...players.slice(toRank + 1),
  ];
};

const CURRENT_USER = 'mikaelrss';
export const resolvers = {
  Query: {
    players: async () => await getQBs(),
    fantasyFootballNerdRankings: async () =>
      await getFantasyFootballNerdRankings(),
    personalRankings: async () =>
      (await getPersonalRankings(CURRENT_USER)).tiers,
  },
  Mutation: {
    createDefaultRankings: async (root: any, args: { userId: string }) => {
      await createDefaultRankings(args.userId);
      return 'Created default rankings';
    },
    setPlayerPositionRank: async (root: any, args: ISetPlayerPositionArgs) => {
      const rankings = await getFantasyFootballNerdRankings();
      const playerIndex = rankings.findIndex(p => p.playerId === args.playerId);
      const movePlayerDown = args.positionRank > args.fromPositionRank;

      if (movePlayerDown)
        return moveDownList(rankings, playerIndex, args.positionRank);
      return rankings;
    },
    changeRank: async (root: any, args: IChangeRankArgs) => {
      console.time('changeRank');
      const result = await changePlayerRank(
        args.playerId,
        args.originTier,
        args.destinationTier,
        args.destinationRank,
        'mikaelrss',
      );
      console.timeEnd('changeRank');
      return result;
    },
    createTier: async () => (await createNewTier(CURRENT_USER)).tiers,
  },
  Tier: {
    players: async (tier: ITier) => {
      const all = await getAllPlayers();
      if (!tier.rankMap) return [];
      const tierPlayerIds = Object.keys(tier.rankMap);
      return all
        .filter(player => tierPlayerIds.includes(player.playerId))
        .map(p => ({
          ...p,
          ...tier.rankMap[p.playerId],
        }))
        .sort((a, b) => a.overallRank - b.overallRank);
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
