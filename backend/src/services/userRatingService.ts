import { getRankByUuid } from './rankService';
import {
  fetchRatingsByRankId,
  setRating,
} from '../repositories/userRatingRepository';

export const rateRanking = async (
  rankUuid: string,
  rating: number,
  userId: string,
) => {
  const rank = await getRankByUuid(rankUuid);
  await setRating(rank.id, rating, userId);
};

export const getAverageRatingByRankId = async (
  rankId: number,
): Promise<number> => {
  const ratings = await fetchRatingsByRankId(rankId);
  const totalRating = ratings.reduce((acc, next) => acc + next.rating, 0);
  console.log('TOt', totalRating);
  return totalRating / ratings.length;
};
