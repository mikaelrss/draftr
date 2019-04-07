import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { IPlayerRankingDTO } from '../rankings/graphql';
import TeamLogo from '../../svg/nfllogos/TeamLogo';

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

const PlayerName = ({ player }: { player: IPlayerRankingDTO }) => (
  <div className={css(styles.name)}>
    <TeamLogo team={player.team} className={css(styles.logo)} />
    {player.displayName}
  </div>
);

export default PlayerName;
