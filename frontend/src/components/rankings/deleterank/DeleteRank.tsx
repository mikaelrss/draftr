import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { Popup } from 'semantic-ui-react';

import { ClickableSurface } from '../../shared/Button';
import Typography, { FontSize, FontStyle } from '../../shared/Typography';
import { css, StyleSheet } from 'aphrodite/no-important';
import { SECONDARY } from '../../../styles/colors';
import Paper from '../../shared/Paper';
import ConfirmationDialog from '../../confirmationdialog/ConfirmationDialog';
import { DELETE_RANK } from './graphql';
import {
  DeleteRankMutation,
  DeleteRankMutationVariables,
} from './__generated__/DeleteRankMutation';
import { ALL_RANKS_QUERY } from '../../ranklist/graphql';
import { sendGaEvent } from '../../app/App';

const styles = StyleSheet.create({
  paper: {
    backgroundColor: 'rgba(255,100,100,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: `3px dashed ${SECONDARY}`,
  },
  surface: {
    height: 'inherit',
  },
});

const DeleteContainer = () => (
  <Paper className={css(styles.paper)}>
    <Typography size={FontSize.large}>Delete this rank</Typography>
  </Paper>
);

type Props = {
  uuid: string;
} & RouteComponentProps;

const DeleteRank = ({ uuid, history }: Props) => {
  const [warningOpen, setWarningOpen] = useState(false);

  return (
    <div>
      <Typography size={FontSize.large} style={FontStyle.secondary}>
        Danger zone!
      </Typography>
      <Mutation<DeleteRankMutation, DeleteRankMutationVariables>
        mutation={DELETE_RANK}
        variables={{ uuid }}
        refetchQueries={() => [{ query: ALL_RANKS_QUERY }]}
      >
        {(deleteRank, { loading }) => (
          <Popup
            open={warningOpen}
            on="click"
            position="bottom center"
            trigger={
              <ClickableSurface className={css(styles.surface)}>
                <DeleteContainer />
              </ClickableSurface>
            }
            content={
              <ConfirmationDialog
                loading={loading}
                text="Deleting this rank cannot be undone"
                onCancel={() => setWarningOpen(false)}
                onConfirm={() => {
                  sendGaEvent('Rank', 'Delete', uuid);
                  deleteRank()
                    .then(() => history.push('/'))
                    .catch(() => toast.error('Could not delete rank'));
                }}
              />
            }
            onOpen={() => setWarningOpen(true)}
            onClose={() => setWarningOpen(false)}
          />
        )}
      </Mutation>
    </div>
  );
};

export default withRouter(DeleteRank);
