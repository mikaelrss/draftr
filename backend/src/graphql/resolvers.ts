import { getQBs, IPlayer, IRankedPlayer } from '../api/players';
import { getFantasyFootballNerdRankings } from '../api/rankings';
import {
  createDefaultRankings,
  createNewTier,
  getDefaultRankings,
  getPersonalRankings,
} from '../services/rankingService';
import { getAllPlayers } from '../services/playerService';
import { ISetPlayerPositionArgs, ITier } from './types';

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
    createDefaultRankings: async () => {
      await createDefaultRankings();
      return 'Created default rankings';
    },
    personalRankings: async () =>
      (await getPersonalRankings(CURRENT_USER)).tiers,
  },
  Mutation: {
    setPlayerPositionRank: async (root: any, args: ISetPlayerPositionArgs) => {
      const rankings = await getFantasyFootballNerdRankings();
      const playerIndex = rankings.findIndex(p => p.playerId === args.playerId);
      const movePlayerDown = args.positionRank > args.fromPositionRank;

      if (movePlayerDown)
        return moveDownList(rankings, playerIndex, args.positionRank);
      return rankings;
    },
    createTier: async () => {
      await createNewTier(CURRENT_USER);
      return (await getPersonalRankings(CURRENT_USER)).tiers;
    },
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
        }));
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
