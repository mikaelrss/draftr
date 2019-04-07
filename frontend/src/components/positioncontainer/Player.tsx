import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';

import TeamLogo from '../../svg/nfllogos/TeamLogo';
import { IconButton } from '../shared/Button';
import { playerTaken, selectPlayer } from '../team/TeamActions';
import { IPlayerRankingDTO } from '../rankings/graphql';
import { SECONDARY } from '../../styles/colors';

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.35,
  },
  player: {
    fontSize: '0.70em',
    display: 'grid',
    gridTemplateColumns: 'auto 30px 70px',
    height: '50px',
    alignItems: 'center',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: '12px',
  },
  clear: {
    marginLeft: '6px',
    backgroundColor: `${SECONDARY} !important`,
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

export const Player = ({
  player,
  positionRank,
  select,
  take,
  disabled,
}: IPlayerProps) => {
  return (
    <div className={css(styles.player, disabled && styles.disabled)}>
      <div className={css(styles.name)}>
        <TeamLogo team={player.team} className={css(styles.logo)} />
        {player.displayName}
      </div>
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
