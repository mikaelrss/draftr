import React from 'react';
import Paper from '../shared/Paper';
import { css, StyleSheet } from 'aphrodite/no-important';
import Link from '../shared/Link';
import Typography, { FontSize } from '../shared/Typography';
import { SECONDARY_TEXT } from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
  },
  font: {
    color: SECONDARY_TEXT,
  },
});
const ProfileMenu = () => (
  <Paper className={css(styles.container)}>
    <Link to="/">
      <Typography className={css(styles.font)} size={FontSize.medium}>
        All ranks
      </Typography>
    </Link>
    <Link to="/my-ranks">
      <Typography className={css(styles.font)} size={FontSize.medium}>
        My ranks
      </Typography>
    </Link>
  </Paper>
);

export default ProfileMenu;
