import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import TeamLogo from '../../svg/nfllogos/TeamLogo';
import { rankings_rank_tiers_players } from '../rankings/__generated__/rankings';
import { DEFAULT_PADDING, MOBILE_BREAKPOINT } from '../../styles/constants';

const styles = StyleSheet.create({
  name: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  logo: {
    marginRight: '12px',
    [MOBILE_BREAKPOINT]: {
      width: '20px !important',
      height: '20px !important',
      margin: `0 ${DEFAULT_PADDING / 4}px 0 0`,
    },
  },
});

interface IProps {
  player: rankings_rank_tiers_players;
}
const PlayerName = ({ player }: IProps) => (
  <div className={css(styles.name)}>
    <TeamLogo team={player.team} className={css(styles.logo)} />
    {player.displayName}
  </div>
);

export default PlayerName;
