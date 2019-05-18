import React from 'react';
import { AllRanks_ranks } from '../ranklist/__generated__/AllRanks';
import Typography, { FontSize } from '../shared/Typography';
import { css, StyleSheet } from 'aphrodite/no-important';
import Paper from '../shared/Paper';
import Link from '../shared/Link';
import { SECONDARY_TEXT } from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '170px',
  },
  link: {
    color: SECONDARY_TEXT,
  },
});

interface Props {
  rank: AllRanks_ranks;
}

const Rank = ({ rank }: Props) => (
  <Link to={`/rank/${rank.uuid}`} className={css(styles.link)}>
    <Paper className={css(styles.container)}>
      <Typography size={FontSize.medium}>{rank.name}</Typography>
      <Typography size={FontSize.small}>{rank.rating}</Typography>
    </Paper>
  </Link>
);

export default Rank;
