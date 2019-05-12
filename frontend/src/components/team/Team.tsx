import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Sticky } from 'react-sticky';

import Paper from '../shared/Paper';
import {
  DEFAULT_PADDING,
  DESKTOP_BREAKPOINT,
  MOBILE_BREAKPOINT,
} from '../../styles/constants';
import { IState } from '../../redux/store';
import { getBackground } from '../rankings/Rankings';
import { removePlayer } from './TeamActions';
import { ClickableSurface } from '../shared/Button';
import { rankings_rank_tiers_players } from '../rankings/__generated__/rankings';
import { HIGHLIGHT_COLOR } from '../../styles/colors';
import PlayerName from '../tiercontainer/PlayerName';

const styles = StyleSheet.create({
  team: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 120px)',
    gridGap: `${DEFAULT_PADDING / 2}px`,
    justifyContent: 'center',
    backgroundColor: 'white',
    left: '0',
    width: '100%',
    [DESKTOP_BREAKPOINT]: {
      gridTemplateColumns: 'repeat(auto-fill, 170px)',
      fontSize: '0.75em',
      svg: {
        width: '20px !important',
        height: '20px !important',
      },
    },
    [MOBILE_BREAKPOINT]: {
      gridTemplateColumns: 'repeat(auto-fill, 120px)',
      padding: `${DEFAULT_PADDING / 2}px 0 !important`,
    },
  },
  paper: {
    padding: `${DEFAULT_PADDING / 4}px`,
    fontSize: '0.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [MOBILE_BREAKPOINT]: {
      padding: `0 !important`,
      fontSize: '0.35em !important',
    },
  },
  placeholder: {
    backgroundColor: 'transparent !important',
    border: `1px dashed ${HIGHLIGHT_COLOR}`,
    boxShadow: 'unset !important',
  },
  common: {
    maxWidth: '200px',
    width: '100%',
    height: `32px`,
  },
  container: {
    zIndex: 2,
  },
});

interface IStateProps {
  selectedPlayers: rankings_rank_tiers_players[];
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
    <Sticky>
      {({ style }) => (
        <div style={style} className={css(styles.container)}>
          <Paper className={css(styles.team)} noShadow>
            {selectedPlayers.map(player => (
              <ClickableSurface
                onClick={() => remove(player.playerId)}
                key={player.playerId}
              >
                <Paper
                  className={css(
                    getBackground(player.position),
                    styles.paper,
                    styles.common,
                  )}
                >
                  <PlayerName player={player} />
                  <div>{player.overallRank}</div>
                </Paper>
              </ClickableSurface>
            ))}
            {placeholders.map(p => (
              <Paper
                className={css(styles.placeholder, styles.common)}
                key={`${p.playerId}-plch`}
              />
            ))}
          </Paper>
        </div>
      )}
    </Sticky>
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
