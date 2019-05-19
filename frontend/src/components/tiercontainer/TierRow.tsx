import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import moize from 'moize';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  playerDragging: {
    backgroundColor: 'lightgreen',
  },
});

import Player from './Player';
import { rankings_rank_tiers_players } from '../rankings/__generated__/rankings';

interface IProps {
  player: rankings_rank_tiers_players;
  index: number;
  disabled: boolean;
  dragDisabled: boolean;
}

const TierRow = ({ player, index, disabled, dragDisabled }: IProps) => (
  <Draggable
    draggableId={`${player.playerId}`}
    index={index}
    isDragDisabled={dragDisabled}
    key={player.playerId}
  >
    {(draggableProvided, prop) => (
      <div
        ref={draggableProvided.innerRef}
        {...draggableProvided.draggableProps}
        {...draggableProvided.dragHandleProps}
      >
        <Player
          player={player}
          key={player.playerId}
          disabled={disabled}
          className={css(prop.isDragging && styles.playerDragging)}
        />
      </div>
    )}
  </Draggable>
);

export default moize.deep(TierRow);
