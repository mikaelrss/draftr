import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { graphql } from 'react-apollo';
import { StyleSheet, css } from 'aphrodite/no-important';

import { IPlayerRankingDTO, IPosition } from '../rankings/graphql';

import Paper from '../shared/Paper';
import Player from './Player';
import selector from './selector';
import { SET_POSITION_RANKING } from './graphql';

const styles = StyleSheet.create({
  playerDragging: {
    backgroundColor: 'lightgreen',
  },
});

interface IStateProps {
  passed: string[];
}

interface IOwnProps {
  position: IPosition;
  players: IPlayerRankingDTO[];
  className?: string;
  mutate?: (e: any) => any;
}

type Props = IOwnProps & IStateProps;

const getTitle = (position: IPosition) => {
  switch (position) {
    case 'QB':
      return 'Quarter Back';
    case 'RB':
      return 'Running Back';
    case 'WR':
      return 'Wide Receiver';
    case 'TE':
      return 'Tight End';
  }
};

const PositionContainer = ({
  position,
  players,
  passed,
  className,
  mutate,
}: Props) => {
  const isDisabled = (id: string) => passed.includes(id);
  const onDragEnd = (result: any) => {
    console.log('Drag ended', result);
    // @ts-ignore
    mutate({
      variables: {
        playerId: result.draggableId,
        positionRank: result.destination.index,
        fromPositionRank: result.source.index,
      },
    });
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`droppable-${position}`}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {getTitle(position)}
              <Paper className={className}>
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
      </DragDropContext>
    </div>
  );
};

const withRedux = connect<IStateProps>(selector);

const withApollo = graphql(SET_POSITION_RANKING);

export default compose<React.ComponentType<IOwnProps>>(
  withRedux,
  withApollo,
)(PositionContainer);
