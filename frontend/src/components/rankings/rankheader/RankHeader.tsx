import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Toggle from 'react-toggle';

import EditableField from '../../shared/EditableField';
import { css, StyleSheet } from 'aphrodite/no-important';
import { DEFAULT_PADDING } from '../../../styles/constants';
import { rankings_rank } from '../__generated__/rankings';
import { CHANGE_RANK_NAME, SET_RANK_PRIVATE } from './graphql';
import {
  SetRankMutation,
  SetRankMutationVariables,
} from './__generated__/SetRankMutation';
import Typography, { FontSize } from '../../shared/Typography';
import {
  ChangeRankName,
  ChangeRankNameVariables,
} from './__generated__/ChangeRankName';

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
    <div className={css(styles.header)}>
      <Mutation<ChangeRankName, ChangeRankNameVariables>
        mutation={CHANGE_RANK_NAME}
      >
        {changeRank => (
          <EditableField
            id={`rank-title-${rank.uuid}`}
            value={title}
            disabled={!rank.userOwnsRank}
            label="Rank name"
            onChange={e => {
              setTitle(e.currentTarget.value);
            }}
            onBlur={() => {
              changeRank({ variables: { name: title, uuid: rank.uuid } });
            }}
          />
        )}
      </Mutation>
      {rank.userOwnsRank && (
        <div className={css(styles.private)}>
          <div className={css(styles.toggle)}>
            <Typography size={FontSize.medium}>Private rank</Typography>
            <Mutation<SetRankMutation, SetRankMutationVariables>
              mutation={SET_RANK_PRIVATE}
            >
              {(setRank, { loading }) => (
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
              )}
            </Mutation>
          </div>
          <Typography size={FontSize.small}>
            (private ranks can not be viewed by others).
          </Typography>
        </div>
      )}
    </div>
  );
};

export default RankHeader;
