import {
  rankings,
  rankings_tiers,
  rankings_tiers_players,
} from './__generated__/rankings';
import { changeRank_changeRank } from './__generated__/changeRank';

interface IChangeParams {
  destinationTier: number;
  originTier: number;
  playerId: string;
  destinationRank: number;
}

type IRankMapper = (rank: rankings_tiers_players) => rankings_tiers_players;

const decreaseRank = (
  rank: rankings_tiers_players,
): rankings_tiers_players => ({
  ...rank,
  overallRank: rank.overallRank - 1,
});

const increaseRank = (
  rank: rankings_tiers_players,
): rankings_tiers_players => ({
  ...rank,
  overallRank: rank.overallRank + 1,
});

const findPlayer = (playerId: string) => (p: rankings_tiers_players): boolean =>
  p.playerId === playerId;

const mapIntermediateTiers = (
  ranks: rankings_tiers[],
  originTier: number,
  destinationTier: number,
  operation: IRankMapper,
) =>
  [...ranks.slice(originTier, destinationTier - 1)].map(rankss =>
    rankss.players.map(operation),
  );

const movePlayerInsideTier = (
  playerId: string,
  originTier: number,
  destIndex: number,
  tiers: rankings_tiers[],
) => {
  const tier = tiers[originTier - 1];
  const find = findPlayer(playerId);

  const rank = tier.players.find(find);
  const currentIndex = tier.players.findIndex(find);

  if (!rank) return [];

  const newRank = rank.overallRank - (currentIndex - destIndex + 1);
  const movingUp = newRank < rank.overallRank;

  let newPlayers: rankings_tiers_players[] = [];

  if (movingUp) {
    newPlayers = [
      ...tier.players.slice(0, destIndex - 1),
      { ...rank, overallRank: newRank },
      ...tier.players.slice(destIndex - 1, currentIndex).map(increaseRank),
      ...tier.players.slice(currentIndex + 1),
    ];
  } else {
    const PRE_MOVE = tier.players.slice(0, currentIndex);
    const POST_MOVE = tier.players
      .slice(currentIndex + 1, destIndex)
      .map(decreaseRank);
    const POST_ALL = tier.players.slice(destIndex);
    newPlayers = [
      ...PRE_MOVE,
      ...POST_MOVE,
      { ...rank, overallRank: newRank },
      ...POST_ALL,
    ];
  }

  return [
    ...tiers.slice(0, originTier - 1),
    { ...tier, players: newPlayers },
    ...tiers.slice(originTier),
  ];
};

const movePlayerPropagateLeft = (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  tiers: rankings_tiers[],
  operation: IRankMapper,
) => {
  const origin = tiers[originTier - 1];
  const destination = tiers[destinationTier - 1];
  const find = findPlayer(playerId);

  const rank = origin.players.find(find);
  const currentIndex = origin.players.findIndex(find);

  if (!rank) return [];

  const newOrigin = [
    ...origin.players.slice(0, currentIndex).map(operation),
    ...origin.players.slice(currentIndex + 1),
  ];

  const newPlayerRank = {
    ...rank,
    overallRank: !!destination.players[destinationRank - 1]
      ? destination.players[destinationRank - 1].overallRank
      : origin.players[0].overallRank,
  };

  const newDestination = [
    ...destination.players.slice(0, destinationRank - 1),
    newPlayerRank,
    ...destination.players.slice(destinationRank - 1).map(operation),
  ];

  const intermediate = mapIntermediateTiers(
    tiers,
    destinationTier,
    originTier,
    operation,
  );

  return [
    ...tiers.slice(0, destinationTier - 1),
    { ...tiers[destinationTier - 1], players: newDestination },
    ...intermediate.map((tier, index) => ({
      ...tiers[destinationTier + index],
      players: tier,
    })),
    { ...tiers[originTier - 1], players: newOrigin },
    ...tiers.slice(originTier),
  ];
};

const movePlayerPropagate = (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  tiers: rankings_tiers[],
  operation: IRankMapper,
) => {
  const origin = tiers[originTier - 1];
  const destination = tiers[destinationTier - 1];

  const predicate = findPlayer(playerId);
  const player = origin.players.find(predicate);

  if (!player) return [];

  const playerIndex = origin.players.findIndex(predicate);

  const newOriginPlayers = [
    ...origin.players.slice(0, playerIndex),
    ...origin.players.slice(playerIndex + 1).map(operation),
  ];

  const intermediate = mapIntermediateTiers(
    tiers,
    destinationTier,
    originTier,
    operation,
  );

  const newDestinationPlayers = [
    ...destination.players.slice(0, destinationRank - 1).map(operation),
    {
      ...player,
      overallRank: destination.players[destinationRank - 1].overallRank - 1,
    },
    ...destination.players.slice(destinationRank - 1),
  ];

  return [
    ...tiers.slice(0, originTier - 1),
    { ...origin, players: newOriginPlayers },
    ...intermediate.map((tier, index) => ({
      ...tiers[originTier + index],
      players: tier,
    })),
    { ...destination, players: newDestinationPlayers },
    ...tiers.slice(destinationTier),
  ];
};

const movePlayerCascade = (
  playerId: string,
  originTier: number,
  destinationTier: number,
  destinationRank: number,
  tiers: rankings_tiers[],
) => {
  const origin = tiers[originTier - 1].players;
  const currentIndex = origin.findIndex(findPlayer(playerId));

  const newOrigin = origin.slice(0, currentIndex);
  const newDestination = origin.slice(currentIndex);

  return [
    ...tiers.slice(0, originTier - 1),
    { ...tiers[originTier - 1], players: newOrigin },
    { ...tiers[destinationTier - 1], players: newDestination },
  ];
};

export const generateOptimisticRankChange = (
  params: IChangeParams,
  { tiers }: rankings,
): changeRank_changeRank[] => {
  const { playerId, originTier, destinationRank, destinationTier } = params;

  const tierDowngrade = destinationTier > originTier;
  const tierUpgrade = destinationTier < originTier;

  const destinationPlayers = tiers[destinationTier - 1].players;
  const destinationEmpty =
    !destinationPlayers || Object.keys(destinationPlayers).length <= 0;

  if (tierDowngrade && destinationEmpty) {
    return movePlayerCascade(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      tiers,
    );
  }
  if (tierDowngrade) {
    return movePlayerPropagate(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      tiers,
      decreaseRank,
    );
  }
  if (tierUpgrade) {
    return movePlayerPropagateLeft(
      playerId,
      originTier,
      destinationTier,
      destinationRank,
      tiers,
      increaseRank,
    );
  }
  return movePlayerInsideTier(playerId, originTier, destinationRank, tiers);
};
