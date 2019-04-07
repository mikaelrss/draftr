import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import Paper from '../shared/Paper';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { IState } from '../../redux/store';
import { IPlayerRankingDTO } from '../rankings/graphql';
import Player from '../positioncontainer/Player';
import PlayerInfo from '../players/PlayerInfo';
import { getBackground } from '../rankings/Rankings';

const styles = StyleSheet.create({
  team: {
    height: '300px',
    margin: `0 60px ${DEFAULT_PADDING}px 60px`,
  },
  paper: {
    padding: `${DEFAULT_PADDING / 4}px`,
    maxWidth: '250px',
    fontSize: '0.5em',
  },
});

interface IStateProps {
  selectedPlayers: IPlayerRankingDTO[];
}

type IProps = IStateProps;

const Team = ({ selectedPlayers }: IProps) => (
  <Paper className={css(styles.team)}>
    <div>Team</div>
    <div>
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
