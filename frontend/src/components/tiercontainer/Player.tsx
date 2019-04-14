import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { IconButton } from '../shared/Button';
import { playerTaken, selectPlayer } from '../team/TeamActions';
import {
  QB_COLOR,
  RB_COLOR,
  SECONDARY,
  TE_COLOR,
  WR_COLOR,
} from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/paddings';
import PlayerName from './PlayerName';
import { getBackground } from '../rankings/Rankings';
import { rankings_personalRankings_players } from '../rankings/__generated__/rankings';

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.35,
  },
  player: {
    position: 'relative',
    fontSize: '0.5em',
    display: 'grid',
    gridTemplateColumns: 'auto 30px 70px',
    height: '50px',
    alignItems: 'center',
    paddingLeft: `${DEFAULT_PADDING / 2}px`,
    paddingRight: `${DEFAULT_PADDING / 2}px`,
  },
  clear: {
    marginLeft: '6px',
    backgroundColor: `${SECONDARY} !important`,
  },
  shade: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.6,
    width: '100%',
    top: 0,
    height: '50px',
    left: `-${DEFAULT_PADDING / 2}px`,
  },
  rb: { backgroundColor: `${RB_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  wr: { backgroundColor: `${WR_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  te: { backgroundColor: `${TE_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  qb: { backgroundColor: `${QB_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
});

interface IDispatchProps {
  select: (player: rankings_personalRankings_players) => void;
  take: (player: rankings_personalRankings_players) => void;
}

type IPlayerProps = {
  player: rankings_personalRankings_players;
  disabled?: boolean;
  className?: string;
} & IDispatchProps;

const Player = ({
  player,
  select,
  take,
  disabled,
  className,
}: IPlayerProps) => {
  return (
    <div
      className={classNames(
        css(
          styles.player,
          disabled && styles.disabled,
          getBackground(player.position),
        ),
        className,
      )}
    >
      <PlayerName player={player} />
      <div>{player.overallRank}</div>
      <div>
        <IconButton
          icon="done"
          onClick={() => select(player)}
          disabled={disabled}
        />
        <IconButton
          icon="clear"
          className={css(styles.clear)}
          onClick={() => take(player)}
          disabled={disabled}
        />
      </div>
      {disabled && <div className={css(styles.shade)} />}
    </div>
  );
};

const withRedux = connect<{}, IDispatchProps>(
  null,
  {
    select: selectPlayer,
    take: playerTaken,
  },
);
export default withRedux(Player);
