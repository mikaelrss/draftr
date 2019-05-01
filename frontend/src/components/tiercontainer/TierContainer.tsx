import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { css, StyleSheet } from 'aphrodite/no-important';

import Paper from '../shared/Paper';
import Player, { PLAYER_HEIGHT } from './Player';
import selector from './selector';
import { rankings_tiers_players } from '../rankings/__generated__/rankings';
import TierRow from './TierRow';

const styles = StyleSheet.create({
  playerDragging: {
    backgroundColor: 'lightgreen',
  },
  defaultPaper: {
    paddingBottom: '0 !important',
    overflowY: 'auto',
  },
  paper: {
    minHeight: '300px',
  },
  isDraggingOver: {
    paddingBottom: `${PLAYER_HEIGHT}px !important`,
  },
});

interface IStateProps {
  passed: string[];
}

interface IOwnProps {
  tierId: number;
  players: rankings_tiers_players[];
  className?: string;
}

type Props = IOwnProps & IStateProps;

const TierContainer = ({ tierId, players, passed, className }: Props) => {
  const isDisabled = (id: string) => passed.includes(id);

  return (
    <div>
      <Droppable droppableId={`tier#${tierId}`}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            Tier {tierId}
            <Paper
              className={classNames(
                css(
                  styles.defaultPaper,
                  players.length === 0 && styles.paper,
                  snapshot.isDraggingOver && styles.isDraggingOver,
                ),
                className,
              )}
              noPadding
            >
              {players.map((player, index) => (
                <TierRow
                  player={player}
                  index={index}
                  key={`row-${player.playerId}`}
                  disabled={isDisabled(player.playerId)}
                />
              ))}
            </Paper>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const withRedux = connect<IStateProps>(selector);

export default compose<React.ComponentType<IOwnProps>>(withRedux)(
  TierContainer,
);
