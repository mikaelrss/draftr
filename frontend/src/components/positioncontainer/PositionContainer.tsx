import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ChildMutateProps, graphql } from 'react-apollo';
import { css, StyleSheet } from 'aphrodite/no-important';

import Paper from '../shared/Paper';
import Player from './Player';
import selector from './selector';
import { SET_POSITION_RANKING } from './graphql';
import {
  positionRank,
  positionRankVariables,
} from './__generated__/positionRank';
import { rankings_personalRankings_players } from '../rankings/__generated__/rankings';

const styles = StyleSheet.create({
  playerDragging: {
    backgroundColor: 'lightgreen',
  },
});

interface IStateProps {
  passed: string[];
}

interface IOwnProps {
  tierId: number;
  players: rankings_personalRankings_players[];
  className?: string;
}

type ChildProps = ChildMutateProps<
  IOwnProps,
  positionRank,
  positionRankVariables
>;

type Props = IOwnProps & IStateProps & ChildProps;

const PositionContainer = ({
  tierId,
  players,
  passed,
  className,
  mutate,
}: Props) => {
  const isDisabled = (id: string) => passed.includes(id);
  const onDragEnd = (result: any) => {
    console.log('Drag ended', result);
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
        <Droppable droppableId={`droppable-${tierId}`}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              Tier {tierId}
              <Paper className={className} noPadding>
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

const withApollo = graphql<
  IOwnProps,
  positionRank,
  positionRankVariables,
  ChildProps
>(SET_POSITION_RANKING);

export default compose<React.ComponentType<IOwnProps>>(
  withRedux,
  withApollo,
)(PositionContainer);
