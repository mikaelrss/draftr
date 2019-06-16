import React from 'react';
import Paper from '../shared/Paper';
import Typography, { FontSize, FontStyle } from '../shared/Typography';
import { PrimaryButton, SecondaryButton } from '../shared/Button';

import { StyleSheet, css } from 'aphrodite/no-important';
import { DEFAULT_PADDING } from '../../styles/constants';
import { loadConfigurationFromPath } from 'tslint/lib/configuration';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: `${DEFAULT_PADDING}px`,
  },
});

interface Props {
  onConfirm?: () => void;
  onCancel?: () => void;
  text?: string;
  loading?: boolean;
}

const ConfirmationDialog = ({ onCancel, onConfirm, text, loading }: Props) => (
  <Paper className={css(styles.container)}>
    {!!text && (
      <Typography size={FontSize.small} style={FontStyle.secondary}>
        {text}
      </Typography>
    )}
    <div className={css(styles.buttonContainer)}>
      <SecondaryButton value="Cancel" onClick={onCancel} />
      <PrimaryButton value="Delete" onClick={onConfirm} loading={loading} />
    </div>
  </Paper>
);

export default ConfirmationDialog;
