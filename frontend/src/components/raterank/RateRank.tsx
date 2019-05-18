import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';

import { css, StyleSheet } from 'aphrodite/no-important';
import Paper from '../shared/Paper';
import { DEFAULT_PADDING } from '../../styles/constants';
import { rankings_rank } from '../rankings/__generated__/rankings';
import Typography, { FontSize } from '../shared/Typography';
import { IconButton } from '../shared/Button';
import Icon, { IconType } from '../shared/Icon';
import { RATE_COLOR, RATE_COLOR_DAMPENED } from '../../styles/colors';
import { ADD_RATING_MUTATION } from './graphql';
import {
  AddRatingMutation,
  AddRatingMutationVariables,
} from './__generated__/AddRatingMutation';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    bottom: `${DEFAULT_PADDING}px`,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  star: {
    width: '40px',
    height: '40px',
  },
  button: {
    fill: RATE_COLOR_DAMPENED,
    transition: 'fill 200ms ease-in-out',
    ':hover': {
      fill: RATE_COLOR,
    },
    width: '40px',
    height: '40px',
    backgroundColor: 'transparent',
  },
  input: {
    display: 'none',
  },
  label: {
    height: '40px',
  },
});

interface Props {
  rank: rankings_rank;
}

interface RadioProps {
  value: any;
  onChange: any;
}

const Radio = ({ value, onChange }: RadioProps) => {
  return (
    <>
      <label className={css(styles.label)}>
        <Icon
          icon={IconType.star}
          className={css(styles.button, styles.star)}
        />
        <input
          type="radio"
          value={value}
          onChange={onChange}
          className={css(styles.input)}
        />
      </label>
    </>
  );
};

const hasRatedCurrentRank = (uuid: string) => {
  const value = localStorage.getItem(`rate_${uuid}`);
  if (!value) return false;
  return value.includes('true');
};

const RateRank = ({ rank }: Props) => {
  const [voted, setVoted] = useState(hasRatedCurrentRank(rank.uuid));
  const addRating = useMutation<AddRatingMutation, AddRatingMutationVariables>(
    ADD_RATING_MUTATION,
  );
  const storeAnswer = () => {
    localStorage.setItem(`rate_${rank.uuid}`, 'true');
    setVoted(true);
  };

  const change = (e: React.SyntheticEvent<HTMLInputElement>) => {
    addRating({
      variables: {
        rankUuid: rank.uuid,
        rating: +e.currentTarget.value,
      },
    });
    storeAnswer();
  };
  if (voted) return null;
  return (
    <Paper className={css(styles.container)}>
      <Typography size={FontSize.medium}>Rate this ranking!</Typography>
      <Radio value={1} onChange={change} />
      <Radio value={2} onChange={change} />
      <Radio value={3} onChange={change} />
      <Radio value={4} onChange={change} />
      <Radio value={5} onChange={change} />
      <IconButton icon={IconType.clear} onClick={storeAnswer} />
    </Paper>
  );
};

export default RateRank;
