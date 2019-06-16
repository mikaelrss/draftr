import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'react-toggle';
import { IState } from '../../../redux/store';
import { toggleActivationStatus } from './draftModeActions';
import Typography, { FontSize } from '../../shared/Typography';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface DispatchProps {
  toggleDraftMode: () => void;
}

interface StateProps {
  draftModeStatus: boolean;
}

type Props = DispatchProps & StateProps;

const DraftMode = ({ toggleDraftMode, draftModeStatus }: Props) => {
  return (
    <div className={css(styles.container)}>
      <Typography size={FontSize.medium}>Draft Mode</Typography>
      <Toggle checked={draftModeStatus} onChange={toggleDraftMode} />
    </div>
  );
};

const withRedux = connect<StateProps, DispatchProps, {}, IState>(
  state => ({
    draftModeStatus: state.draftMode.activated,
  }),
  {
    toggleDraftMode: toggleActivationStatus,
  },
);

export default withRedux(DraftMode);
