import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import TeamLogo from '../../svg/nfllogos/TeamLogo';
import { rankings_tiers_players } from '../rankings/__generated__/rankings';

const styles = StyleSheet.create({
  name: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  logo: {
    marginRight: '12px',
  },
});

interface IProps {
  player: rankings_tiers_players;
}
const PlayerName = ({ player }: IProps) => (
  <div className={css(styles.name)}>
    <TeamLogo team={player.team} className={css(styles.logo)} />
    {player.displayName}
  </div>
);

export default PlayerName;
