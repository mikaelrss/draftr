import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';

import Paper from '../shared/Paper';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { IState } from '../../redux/store';
import PlayerInfo from '../players/PlayerInfo';
import { getBackground } from '../rankings/Rankings';
import { removePlayer } from './TeamActions';
import { ClickableSurface } from '../shared/Button';
import { rankings_tiers_players } from '../rankings/__generated__/rankings';
import { HIGHLIGHT_COLOR } from '../../styles/colors';

const styles = StyleSheet.create({
  team: {
    maxHeight: 'unset !important',
    margin: `0 0 ${DEFAULT_PADDING}px 60px`,
    maxWidth: '1075px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'grid',
    justifyContent: 'center',
    gridGap: `${DEFAULT_PADDING / 2}px`,
    gridTemplateColumns: 'repeat(auto-fill, 200px)',
  },
  paper: {
    padding: `${DEFAULT_PADDING / 4}px`,
    maxWidth: '200px',
    fontSize: '0.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container: {},
  placeholder: {
    width: '200px',
    border: `2px dashed ${HIGHLIGHT_COLOR}`,
    height: `42px`,
    boxShadow: 'unset !important',
  },
});

interface IStateProps {
  selectedPlayers: rankings_tiers_players[];
}

interface IDispatchProps {
  remove: (id: string) => void;
}

type IProps = IStateProps & IDispatchProps;

const Team = ({ selectedPlayers, remove }: IProps) => {
  const placeholders = Array(15 - selectedPlayers.length)
    .fill(null)
    .map((_, i) => ({ playerId: `placeholder-${i}` }));
  return (
    <Paper className={css(styles.team)} noShadow>
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
      {placeholders.map(p => (
        <Paper className={css(styles.placeholder)} key={`${p.playerId}-plch`} />
      ))}
    </Paper>
  );
};

const withRedux = connect(
  (state: IState) => ({
    selectedPlayers: state.team.selected,
  }),
  {
    remove: removePlayer,
  },
);

export default withRedux(Team);
