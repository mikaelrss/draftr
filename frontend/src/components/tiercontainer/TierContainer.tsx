import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { css, StyleSheet } from 'aphrodite/no-important';

import Paper from '../shared/Paper';
import Player from './Player';
import selector from './selector';
import { rankings_tiers_players } from '../rankings/__generated__/rankings';

const styles = StyleSheet.create({
  playerDragging: {
    backgroundColor: 'lightgreen',
  },
  paper: {
    minHeight: '300px',
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
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            Tier {tierId}
            <Paper
              className={classNames(
                css(players.length === 0 && styles.paper),
                className,
              )}
              noPadding
            >
              {players.map((player, index) => (
                <Draggable
                  draggableId={player.playerId}
                  index={index}
                  key={player.playerId}
                >
                  {(draggableProvided, { isDragging }) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <Player
                        player={player}
                        key={player.playerId}
                        disabled={isDisabled(player.playerId)}
                        className={css(isDragging && styles.playerDragging)}
                      />
                    </div>
                  )}
                </Draggable>
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
