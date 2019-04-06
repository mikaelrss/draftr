import React from 'react';
import { IPlayerRankingDTO } from '../rankings/graphql';
import TeamLogo from '../../svg/nfllogos/TeamLogo';
import Paper from '../shared/Paper';
import { css, StyleSheet } from 'aphrodite/no-important';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { IconButton } from '../shared/Button';
import { SECONDARY } from '../../styles/colors';

interface IPlayerProps {
  player: IPlayerRankingDTO;
  positionRank: number;
}

const styles = StyleSheet.create({
  player: {
    fontSize: '0.70em',
    display: 'grid',
    gridTemplateColumns: 'auto 30px 70px',
    height: '50px',
    alignItems: 'center',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: '12px',
  },
  clear: {
    marginLeft: '6px',
    backgroundColor: `${SECONDARY} !important`,
  },
});

const Player = ({ player, positionRank }: IPlayerProps) => (
  <div className={css(styles.player)}>
    <div className={css(styles.name)}>
      <TeamLogo team={player.team} className={css(styles.logo)} />
      {player.displayName}
    </div>
    <div>{positionRank}</div>
    <div>
      <IconButton
        icon="done"
        onClick={() => {
          console.log('add');
        }}
      />
      <IconButton
        icon="clear"
        className={css(styles.clear)}
        onClick={() => {
          console.log('taken');
        }}
      />
    </div>
  </div>
);

interface IProps {
  position: string;
  players: IPlayerRankingDTO[];
}

const PositionContainer = ({ position, players }: IProps) => {
  return (
    <div>
      {position}
      <Paper>
        {players.map((player, index) => (
          <Player
            player={player}
            positionRank={index + 1}
            key={player.playerId}
          />
        ))}
      </Paper>
    </div>
  );
};

export default PositionContainer;
