import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { css, StyleSheet } from 'aphrodite/no-important';

import Paper from '../shared/Paper';
import { PLAYER_HEIGHT } from './Player';
import selector from './selector';
import TierRow from './TierRow';
import { rankings_rank_tiers } from '../rankings/__generated__/rankings';
import TierHeader from './tierheader/TierHeader';

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
  placeholder: {
    height: 0,
  },
});

interface IStateProps {
  passed: number[];
}

interface IOwnProps {
  tier: rankings_rank_tiers;
  className?: string;
}

type Props = IOwnProps & IStateProps;

const TierContainer = ({ tier, passed, className }: Props) => {
  const isDisabled = (id: number) => passed.includes(id);
  return (
    <div>
      <Droppable droppableId={`tier#${tier.tierId}`}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <TierHeader tier={tier} />
            <Paper
              className={classNames(
                css(
                  styles.defaultPaper,
                  tier.players.length === 0 && styles.paper,
                  snapshot.isDraggingOver && styles.isDraggingOver,
                ),
                className,
              )}
              noPadding
            >
              {tier.players.map((player, index) => (
                <TierRow
                  player={player}
                  index={index}
                  key={`row-${player.playerId}`}
                  disabled={isDisabled(player.playerId)}
                />
              ))}
            </Paper>
            <div className={css(styles.placeholder)}>
              {provided.placeholder}
            </div>
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
