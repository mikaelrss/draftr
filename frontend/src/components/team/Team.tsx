import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

import Paper from '../shared/Paper';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { IState } from '../../redux/store';
import PlayerInfo from '../players/PlayerInfo';
import { getBackground } from '../rankings/Rankings';
import { removePlayer } from './TeamActions';
import { ClickableSurface } from '../shared/Button';
import { rankings_personalRankings_players } from '../rankings/__generated__/rankings';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container: {
    display: 'grid',
    gridGap: `${DEFAULT_PADDING / 2}px`,
    gridTemplateColumns: 'repeat(auto-fill, 200px)',
  },
});

interface IStateProps {
  selectedPlayers: rankings_personalRankings_players[];
}

interface IDispatchProps {
  remove: (id: string) => void;
}

type IProps = IStateProps & IDispatchProps;

const Team = ({ selectedPlayers, remove }: IProps) => (
  <Paper className={css(styles.team)} noShadow>
    <div className={css(styles.container)}>
      {selectedPlayers.map(player => (
        <ClickableSurface
          onClick={() => remove(player.playerId)}
          key={player.playerId}
        >
          <Paper className={css(getBackground(player.position), styles.paper)}>
            <PlayerInfo player={player} />
            <div>{player.overallRank}</div>
          </Paper>
        </ClickableSurface>
      ))}
    </div>
  </Paper>
);

const withRedux = connect(
  (state: IState) => ({
    selectedPlayers: state.team.selected,
  }),
  {
    remove: removePlayer,
  },
);

export default withRedux(Team);
