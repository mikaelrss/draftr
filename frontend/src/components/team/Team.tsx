import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import Paper from '../shared/Paper';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { IState } from '../../redux/store';
import { IPlayerRankingDTO } from '../rankings/graphql';
import PlayerInfo from '../players/PlayerInfo';

const styles = StyleSheet.create({
  team: {
    height: '300px',
    margin: `0 60px ${DEFAULT_PADDING}px 60px`,
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
        <PlayerInfo player={player} key={player.playerId} />
      ))}
    </div>
  </Paper>
);

const withRedux = connect((state: IState) => ({
  selectedPlayers: state.team.selected,
}));

export default withRedux(Team);
