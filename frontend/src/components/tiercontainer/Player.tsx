import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moize from 'moize';

import { ClickableSurface, IconButton } from '../shared/Button';
import { playerTaken, selectPlayer, untakePlayer } from '../team/TeamActions';
import {
  QB_COLOR,
  RB_COLOR,
  SECONDARY,
  TE_COLOR,
  WR_COLOR,
} from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/constants';
import PlayerName from './PlayerName';
import { getBackground } from '../rankings/Rankings';
import { rankings_rank_tiers_players } from '../rankings/__generated__/rankings';
import { IconType } from '../shared/Icon';

export const PLAYER_HEIGHT = 48;
const styles = StyleSheet.create({
  disabled: {
    opacity: 0.35,
  },
  player: {
    position: 'relative',
    fontSize: '0.5em',
    display: 'grid',
    gridTemplateColumns: 'auto 30px 70px',
    height: `${PLAYER_HEIGHT}px`,
    alignItems: 'center',
    paddingLeft: `${DEFAULT_PADDING / 2}px`,
    paddingRight: `${DEFAULT_PADDING / 2}px`,
  },
  add: {
    marginRight: '6px',
  },
  clear: {
    backgroundColor: `${SECONDARY} !important`,
  },
  icon: {
    height: `${PLAYER_HEIGHT * 0.64}px !important`,
    width: `${PLAYER_HEIGHT * 0.64}px !important`,
  },
  shade: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.6,
    width: '100%',
    top: 0,
    left: 0,
    height: `${PLAYER_HEIGHT}px`,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rb: { backgroundColor: `${RB_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  wr: { backgroundColor: `${WR_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  te: { backgroundColor: `${TE_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  qb: { backgroundColor: `${QB_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
});

interface IDispatchProps {
  select: (player: rankings_rank_tiers_players) => void;
  take: (player: rankings_rank_tiers_players) => void;
  untake: (playerId: number) => void;
}

type IPlayerProps = {
  player: rankings_rank_tiers_players;
  disabled?: boolean;
  className?: string;
} & IDispatchProps;

const Player = ({
  player,
  select,
  take,
  disabled,
  className,
  untake,
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
      <div className={css(styles.buttonContainer)}>
        <IconButton
          icon={IconType.add}
          className={css(styles.icon, styles.add)}
          onClick={() => select(player)}
          disabled={disabled}
        />
        <IconButton
          icon={IconType.clear}
          className={css(styles.clear, styles.icon)}
          onClick={() => take(player)}
          disabled={disabled}
        />
      </div>
      {disabled && (
        <ClickableSurface
          onClick={() => {
            untake(player.playerId);
          }}
          className={css(styles.shade)}
        />
      )}
    </div>
  );
};

const withRedux = connect<{}, IDispatchProps>(
  null,
  {
    select: selectPlayer,
    take: playerTaken,
    untake: untakePlayer,
  },
);
export default withRedux(moize.deep(Player));
