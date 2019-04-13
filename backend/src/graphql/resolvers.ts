import { getQBs, IPlayer, IRankedPlayer } from '../api/players';
import { getFantasyFootballNerdRankings } from '../api/rankings';
import { getDefaultRankings } from '../services/rankingService';

interface ISetPlayerPositionArgs {
  playerId: string;
  positionRank: number;
  fromPositionRank: number;
}

getDefaultRankings();

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

export const resolvers = {
  Query: {
    players: async () => await getQBs(),
    fantasyFootballNerdRankings: async () =>
      await getFantasyFootballNerdRankings(),
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
