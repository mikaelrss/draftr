import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import Paper from '../shared/Paper';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { IState } from '../../redux/store';
import { IPlayerRankingDTO } from '../rankings/graphql';
import PlayerInfo from '../players/PlayerInfo';
import { getBackground } from '../rankings/Rankings';

const styles = StyleSheet.create({
  team: {
    height: '174px',
    margin: `0 0 ${DEFAULT_PADDING}px 60px`,
    width: '1075px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paper: {
    padding: `${DEFAULT_PADDING / 4}px`,
    maxWidth: '250px',
    fontSize: '0.5em',
  },
  container: {
    display: 'grid',
    gridGap: `${DEFAULT_PADDING / 2}px`,
    gridTemplateColumns: 'repeat(auto-fill, 200px)',
  },
});

interface IStateProps {
  selectedPlayers: IPlayerRankingDTO[];
}

type IProps = IStateProps;

const Team = ({ selectedPlayers }: IProps) => (
  <Paper className={css(styles.team)} noShadow>
    <div className={css(styles.container)}>
      {selectedPlayers.map(player => (
        <Paper className={css(getBackground(player.position), styles.paper)}>
          <PlayerInfo player={player} key={player.playerId} />
        </Paper>
      ))}
    </div>
  </Paper>
);

const withRedux = connect((state: IState) => ({
  selectedPlayers: state.team.selected,
}));

export default withRedux(Team);
