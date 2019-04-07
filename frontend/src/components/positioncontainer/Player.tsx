import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import TeamLogo from '../../svg/nfllogos/TeamLogo';
import { IconButton } from '../shared/Button';
import { playerTaken, selectPlayer } from '../team/TeamActions';
import { IPlayerRankingDTO } from '../rankings/graphql';
import { SECONDARY } from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/paddings';

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
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  logo: {
    marginRight: '12px',
  },
  clear: {
    marginLeft: '6px',
    backgroundColor: `${SECONDARY} !important`,
  },
  shade: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.6,
    width: `calc(100% + ${DEFAULT_PADDING}px)`,
    top: 0,
    height: '50px',
    left: `-${DEFAULT_PADDING / 2}px`,
  },
});

interface IDispatchProps {
  select: (player: IPlayerRankingDTO) => void;
  take: (player: IPlayerRankingDTO) => void;
}

type IPlayerProps = {
  player: IPlayerRankingDTO;
  positionRank: number;
  disabled?: boolean;
} & IDispatchProps;

export const PlayerName = ({ player }: { player: IPlayerRankingDTO }) => (
  <div className={css(styles.name)}>
    <TeamLogo team={player.team} className={css(styles.logo)} />
    {player.displayName}
  </div>
);

const Player = ({
  player,
  positionRank,
  select,
  take,
  disabled,
}: IPlayerProps) => {
  return (
    <div className={css(styles.player, disabled && styles.disabled)}>
      <PlayerName player={player} />
      <div>{positionRank}</div>
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
    // @ts-ignore
    select: selectPlayer,
    take: playerTaken,
  },
);
export default withRedux(Player);
