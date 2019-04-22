import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Sticky } from 'react-sticky';

import Paper from '../shared/Paper';
import {
  DEFAULT_PADDING,
  DESKTOP_BREAKPOINT,
  MOBILE_BREAKPOINT,
  TRANSITION,
} from '../../styles/constants';
import { IState } from '../../redux/store';
import PlayerInfo from '../players/PlayerInfo';
import { getBackground } from '../rankings/Rankings';
import { removePlayer } from './TeamActions';
import { ClickableSurface } from '../shared/Button';
import { rankings_tiers_players } from '../rankings/__generated__/rankings';
import { HIGHLIGHT_COLOR, PRIMARY } from '../../styles/colors';
import PlayerName from '../tiercontainer/PlayerName';

const styles = StyleSheet.create({
  team: {
    maxHeight: 'unset !important',
    margin: `0 0 ${DEFAULT_PADDING}px 60px`,
    maxWidth: '1075px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'grid',
    justifyContent: 'center',
    gridGap: `${DEFAULT_PADDING / 2}px`,
    gridTemplateColumns: 'repeat(auto-fill, 200px)',
    backgroundColor: 'transparent !important',
    border: 'none !important',
    transition: `backgroundColor ${TRANSITION}`,
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
    border: `2px dashed ${HIGHLIGHT_COLOR}`,
    boxShadow: 'unset !important',
    [MOBILE_BREAKPOINT]: {
      borderWidth: '1px',
    },
  },
  stickyPlaceholder: {
    borderWidth: '1px',
  },
  common: {
    maxWidth: '200px',
    width: '100%',
    height: `42px`,
  },
  sticky: {
    backgroundColor: 'white',
    width: '100vw',
    maxWidth: 'unset',
    position: 'relative',
    left: `-${DEFAULT_PADDING}px`,
    gridTemplateColumns: 'repeat(auto-fill, 120px)',
    [DESKTOP_BREAKPOINT]: {
      gridTemplateColumns: 'repeat(auto-fill, 170px)',
      fontSize: '0.75em',
      svg: {
        width: '20px !important',
        height: '20px !important',
      },
    },
    [MOBILE_BREAKPOINT]: {
      left: `-${DEFAULT_PADDING / 4}px`,
    },
    marginBottom: '0 !important',
  },
  stickyCommon: {
    height: '32px',
  },
  container: {
    zIndex: 2,
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
    <Sticky>
      {({ style, isSticky }) => (
        <div style={style} className={css(styles.container)}>
          <Paper
            className={css(styles.team, isSticky && styles.sticky)}
            noShadow
          >
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
                    isSticky && styles.stickyCommon,
                  )}
                >
                  <PlayerName player={player} />
                  <div>{player.overallRank}</div>
                </Paper>
              </ClickableSurface>
            ))}
            {placeholders.map(p => (
              <Paper
                className={css(
                  styles.placeholder,
                  styles.common,
                  isSticky && styles.stickyCommon,
                  isSticky && styles.stickyPlaceholder,
                )}
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
