import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { IconButton } from '../../shared/Button';
import { IconType } from '../../shared/Icon';
import {
  rankings,
  rankings_rank_tiers,
  rankingsVariables,
} from '../../rankings/__generated__/rankings';

import { StyleSheet, css } from 'aphrodite/no-important';
import {
  deleteTierMutation,
  deleteTierMutationVariables,
} from './__generated__/deleteTierMutation';
import { DELETE_TIER, RENAME_TIER } from './graphql';
import { GET_FANTASY_FOOTBALL_RANKINGS } from '../../rankings/graphql';
import Spinner from '../../shared/Spinner';
import {
  RenameTierMutation,
  RenameTierMutationVariables,
} from './__generated__/RenameTierMutation';
import EditableField from '../../shared/EditableField';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

type Props = {
  tier: rankings_rank_tiers;
} & RouteComponentProps<{ id: string }>;

const TierHeader = ({ tier, match }: Props) => {
  const { id: rankId } = match.params;
  const [tierName, setTierName] = useState(tier.name);

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
      {(deleteTier, { loading }) => (
        <Mutation<RenameTierMutation, RenameTierMutationVariables>
          mutation={RENAME_TIER}
          variables={{
            tierUuid: tier.uuid,
            name: tierName,
          }}
        >
          {(renameTier, data) => (
            <div className={css(styles.container)}>
              <EditableField
                onBlur={() => {
                  renameTier();
                  console.log('Save');
                }}
                id={`TierName${tier.uuid}`}
                label="Name"
                value={tierName}
                onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
                  setTierName(e.currentTarget.value)
                }
              />
              {data.loading && <Spinner />}
              <IconButton
                icon={IconType.delete}
                onClick={deleteTier}
                loading={loading}
              />
            </div>
          )}
        </Mutation>
      )}
    </Mutation>
  );
};

export default withRouter(TierHeader);
