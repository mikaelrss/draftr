import React from 'react';
import { Link } from 'react-router-dom';
import { AllRanks_ranks } from '../ranklist/__generated__/AllRanks';
import Typography, { FontSize } from '../shared/Typography';
import { StyleSheet, css } from 'aphrodite/no-important';
import { SECONDARY_TEXT } from '../../styles/colors';
import Paper from '../shared/Paper';

const styles = StyleSheet.create({
  link: {
    textDecoration: 'none',
    color: SECONDARY_TEXT,
  },
  container: {
    width: '170px',
  },
});

interface Props {
  rank: AllRanks_ranks;
}

const Rank = ({ rank }: Props) => (
  <Link to={`/rank/${rank.uuid}`} className={css(styles.link)}>
    <Paper className={css(styles.container)}>
      <Typography size={FontSize.medium}>{rank.name}</Typography>
    </Paper>
  </Link>
);

export default Rank;
