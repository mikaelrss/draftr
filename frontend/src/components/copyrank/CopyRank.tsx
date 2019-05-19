import React from 'react';
import Form from 'react-valid8';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Typography, { FontSize } from '../shared/Typography';
import { Button } from '../shared/Button';

import { css, StyleSheet } from 'aphrodite/no-important';
import { COPY_RANK } from './graphql';
import { rankings_rank } from '../rankings/__generated__/rankings';
import {
  CopyRankMutation,
  CopyRankMutationVariables,
} from './__generated__/CopyRankMutation';
import Input from '../shared/Input';
import Paper from '../shared/Paper';

const styles = StyleSheet.create({
  copyRank: {
    height: '160px',
  },
  form: {
    transition: 'all ease-in-out 200ms',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    opacity: 0.3,
    ':hover': { opacity: 1 },
    ':focus-within': { opacity: 1 },
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

interface Props {
  rank: rankings_rank;
}

const CopyRank = ({ rank }: Props) => {
  return (
    <Mutation<CopyRankMutation, CopyRankMutationVariables> mutation={COPY_RANK}>
      {(copyRank, { loading, data }) => {
        if (data && data.copyRank) {
          return <Redirect to={`/rank/${data.copyRank.uuid}`} />;
        }

        return (
          <div>
            <Typography size={FontSize.large}>Copy this rank!</Typography>
            <Paper className={css(styles.copyRank)}>
              <Form
                formClassName={css(styles.form)}
                validate={validate}
                injectErrorAsProps
                submit={(values: FormValues) => {
                  if (!values.name) throw Error('Validation failed');
                  copyRank({
                    variables: {
                      name: values.name,
                      rankUuid: rank.uuid,
                    },
                  });
                }}
              >
                <Input name="name" id="tier_name" label="Name" />
                <Button
                  type="submit"
                  value="Create Rank"
                  loading={loading}
                  disabled={loading}
                />
              </Form>
            </Paper>
          </div>
        );
      }}
    </Mutation>
  );
};

export default CopyRank;
