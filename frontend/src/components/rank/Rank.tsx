import React from 'react';
import { AllRanks_ranks } from '../ranklist/__generated__/AllRanks';
import Typography, { FontSize } from '../shared/Typography';
import { css, StyleSheet } from 'aphrodite/no-important';
import Paper from '../shared/Paper';
import Link from '../shared/Link';
import { RATE_COLOR, SECONDARY_TEXT } from '../../styles/colors';
import Icon, { IconType } from '../shared/Icon';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '170px',
  },
  link: {
    color: SECONDARY_TEXT,
  },
  rateContainer: {
    position: 'relative',
  },
  star: {
    fill: RATE_COLOR,
    height: '20px',
    width: '20px',
  },
  mask: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '20px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
  },
});

const Rating = ({ rating }: { rating: number }) => {
  const percentCovered = (1 - rating / 5) * 100;
  return (
    <div className={css(styles.rateContainer)}>
      <Icon icon={IconType.star} className={css(styles.star)} />
      <Icon icon={IconType.star} className={css(styles.star)} />
      <Icon icon={IconType.star} className={css(styles.star)} />
      <Icon icon={IconType.star} className={css(styles.star)} />
      <Icon icon={IconType.star} className={css(styles.star)} />
      <div
        className={css(styles.mask)}
        style={{ width: `${percentCovered}%` }}
      />
    </div>
  );
};

interface Props {
  rank: AllRanks_ranks;
}

const Rank = ({ rank }: Props) => (
  <Link to={`/rank/${rank.uuid}`} className={css(styles.link)}>
    <Paper className={css(styles.container)}>
      <Typography size={FontSize.medium}>{rank.name}</Typography>
      <Typography size={FontSize.small}>
        {Math.round(rank.rating * 100) / 100}
      </Typography>
      <Rating rating={rank.rating} />
    </Paper>
  </Link>
);

export default Rank;
