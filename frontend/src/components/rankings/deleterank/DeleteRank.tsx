import React, { useState } from 'react';
import { Popup } from 'semantic-ui-react';

import { ClickableSurface } from '../../shared/Button';
import Typography, { FontSize, FontStyle } from '../../shared/Typography';
import { css, StyleSheet } from 'aphrodite/no-important';
import { SECONDARY } from '../../../styles/colors';
import Paper from '../../shared/Paper';
import ConfirmationDialog from '../../confirmationdialog/ConfirmationDialog';

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

interface Props {
  userOwnsRank?: boolean;
}

const DeleteRank = () => {
  const [warningOpen, setWarningOpen] = useState(false);

  return (
    <div>
      <Typography size={FontSize.large} style={FontStyle.secondary}>
        Danger zone!
      </Typography>
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
          <ConfirmationDialog text="Deleting this rank cannot be undone" />
        }
        onOpen={() => setWarningOpen(true)}
        onClose={() => setWarningOpen(false)}
      />
    </div>
  );
};

export default DeleteRank;
