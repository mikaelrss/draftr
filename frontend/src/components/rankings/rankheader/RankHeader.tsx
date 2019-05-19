import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Toggle from 'react-toggle';

import EditableField from '../../shared/EditableField';
import { css, StyleSheet } from 'aphrodite/no-important';
import { DEFAULT_PADDING } from '../../../styles/constants';
import { rankings_rank } from '../__generated__/rankings';
import { SET_RANK_PRIVATE } from './graphql';
import {
  SetRankMutation,
  SetRankMutationVariables,
} from './__generated__/SetRankMutation';
import Typography, { FontSize } from '../../shared/Typography';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: `${DEFAULT_PADDING}px`,
  },
  private: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  toggle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

interface Props {
  rank: rankings_rank;
}

const RankHeader = ({ rank }: Props) => {
  const [title, setTitle] = useState(rank.name);
  const [rankPrivate, setPrivate] = useState(rank.private);
  return (
    <Mutation<SetRankMutation, SetRankMutationVariables>
      mutation={SET_RANK_PRIVATE}
    >
      {(setRank, { loading }) => (
        <div className={css(styles.header)}>
          <EditableField
            id={`rank-title-${rank.uuid}`}
            value={title}
            disabled={!rank.userOwnsRank}
            label="Rank name"
            onChange={e => {
              setTitle(e.currentTarget.value);
            }}
            onBlur={() => {
              console.log('change rank nam' + '');
            }}
          />
          {rank.userOwnsRank && (
            <div className={css(styles.private)}>
              <div className={css(styles.toggle)}>
                <Typography size={FontSize.medium}>Private rank</Typography>
                <Toggle
                  disabled={!rank.userOwnsRank}
                  checked={rankPrivate}
                  icons={false}
                  onChange={() => {
                    setRank({
                      variables: {
                        uuid: rank.uuid,
                        status: !rankPrivate,
                      },
                    }).then(() => setPrivate(!rankPrivate));
                  }}
                />
              </div>
              <Typography size={FontSize.small}>
                (private ranks can not be viewed by others).
              </Typography>
            </div>
          )}
        </div>
      )}
    </Mutation>
  );
};

export default RankHeader;
