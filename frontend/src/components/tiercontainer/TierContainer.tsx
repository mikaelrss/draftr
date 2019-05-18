import React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { css, StyleSheet } from 'aphrodite/no-important';

import Paper from '../shared/Paper';
import { PLAYER_HEIGHT } from './Player';
import selector from './selector';
import TierRow from './TierRow';
import {
  rankings,
  rankings_rank,
  rankings_rank_tiers,
  rankingsVariables,
} from '../rankings/__generated__/rankings';
import { IconButton } from '../shared/Button';
import { IconType } from '../shared/Icon';
import { DELETE_TIER } from './graphql';
import {
  deleteTierMutation,
  deleteTierMutation_deleteTier,
  deleteTierMutationVariables,
} from './__generated__/deleteTierMutation';
import { GET_FANTASY_FOOTBALL_RANKINGS } from '../rankings/graphql';
import { ALL_RANKS_QUERY } from '../ranklist/graphql';

const styles = StyleSheet.create({
  playerDragging: {
    backgroundColor: 'lightgreen',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

type Props = IOwnProps & IStateProps & RouteComponentProps<{ id: string }>;

const TierContainer = ({ tier, passed, className, match }: Props) => {
  const isDisabled = (id: number) => passed.includes(id);
  const { id: rankId } = match.params;
  return (
    <Mutation<deleteTierMutation, deleteTierMutationVariables>
      mutation={DELETE_TIER}
      variables={{ tierUuid: tier.uuid }}
      update={(cache, { data }) => {
        const query = cache.readQuery<rankings, rankingsVariables>({
          query: GET_FANTASY_FOOTBALL_RANKINGS,
          variables: { id: rankId },
        });
        if (!query || !query.rank || !data) return;
        const { tiers } = query.rank;
        const tierIndex = tiers.findIndex(t => t.uuid === data.deleteTier.uuid);
        cache.writeQuery<rankings, rankingsVariables>({
          query: GET_FANTASY_FOOTBALL_RANKINGS,
          variables: { id: rankId },
          data: {
            rank: {
              ...query.rank,
              tiers: [
                ...tiers.slice(0, tierIndex),
                ...tiers.slice(tierIndex + 1),
              ],
            },
          },
        });
      }}
    >
      {(deleteTier, { loading }) => {
        return (
          <div>
            <Droppable droppableId={`tier#${tier.tierId}`}>
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className={css(styles.nameContainer)}>
                    <span>{tier.name || `Tier ${tier.tierId}`}</span>
                    <IconButton
                      icon={IconType.delete}
                      onClick={deleteTier}
                      loading={loading}
                    />
                  </div>
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
      }}
    </Mutation>
  );
};

const withRedux = connect<IStateProps>(selector);

export default compose<React.ComponentType<IOwnProps>>(
  withRedux,
  withRouter,
)(TierContainer);
