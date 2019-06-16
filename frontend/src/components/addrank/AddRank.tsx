import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Mutation } from 'react-apollo';
import { css, StyleSheet } from 'aphrodite/no-important';
import Form from 'react-valid8';

import { IconType } from '../shared/Icon';
import { PrimaryButton, IconButton } from '../shared/Button';
import { DEFAULT_PADDING } from '../../styles/constants';
import Paper from '../shared/Paper';
import Input from '../shared/Input';
import { SECONDARY_TEXT } from '../../styles/colors';
import { ADD_RANK } from './graphql';
import {
  AddRankMutation,
  AddRankMutationVariables,
} from './__generated__/AddRankMutation';
import { ALL_RANKS_QUERY } from '../ranklist/graphql';
import { AllRanks } from '../ranklist/__generated__/AllRanks';

const styles = StyleSheet.create({
  addRank: {
    position: 'fixed',
    right: `${DEFAULT_PADDING}px`,
  },
  form: {
    transition: 'all ease-in-out 200ms',
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: `${DEFAULT_PADDING}px !important`,
  },
  close: {
    position: 'absolute',
    right: `${DEFAULT_PADDING / 4}px`,
    top: `${DEFAULT_PADDING / 4}px`,
    backgroundColor: 'transparent !important',
    fill: `${SECONDARY_TEXT} !important`,
  },
});

interface FormValues {
  name?: string;
}

const validate = (values: FormValues) => {
  const errors: FormValues = {};
  if (!values.name) errors.name = 'Name is required';
  return errors;
};

const AddRank = () => {
  const [formVisible, setFormVisible] = useState(false);

  const formStyle = useSpring({
    bottom: formVisible ? `${DEFAULT_PADDING}px` : '-400px',
    config: config.stiff,
  });

  const buttonStyle = useSpring({
    bottom: !formVisible ? `${DEFAULT_PADDING}px` : '-400px',
    config: config.stiff,
  });

  return (
    <>
      <Mutation<AddRankMutation, AddRankMutationVariables>
        mutation={ADD_RANK}
        update={(cache, { data }) => {
          const query = cache.readQuery<AllRanks>({
            query: ALL_RANKS_QUERY,
          });
          if (!query || !query.ranks || !data || !data.createRank) return;
          const { ranks } = query;
          cache.writeQuery<AllRanks>({
            query: ALL_RANKS_QUERY,
            data: {
              ranks: [...ranks, data.createRank],
            },
          });
        }}
      >
        {(addRank, { loading }) => (
          <animated.div style={formStyle} className={css(styles.addRank)}>
            <Paper>
              <Form
                formClassName={css(styles.form)}
                validate={validate}
                injectErrorAsProps
                submit={(values: FormValues) => {
                  if (!values.name) throw Error('Validation failed');
                  addRank({ variables: { name: values.name } }).then(() =>
                    setFormVisible(false),
                  );
                }}
              >
                <Input name="name" id="tier_name" label="Name" />
                <PrimaryButton
                  type="submit"
                  value="Create Rank"
                  loading={loading}
                />
              </Form>
              <IconButton
                className={css(styles.close)}
                icon={IconType.clear}
                onClick={() => setFormVisible(false)}
              />
            </Paper>
          </animated.div>
        )}
      </Mutation>
      <animated.div style={buttonStyle} className={css(styles.addRank)}>
        <IconButton icon={IconType.add} onClick={() => setFormVisible(true)} />
      </animated.div>
    </>
  );
};

export default AddRank;
