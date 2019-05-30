import React from 'react';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { StyleSheet, css } from 'aphrodite/no-important';
import 'react-toastify/dist/ReactToastify.css';

import AppHeader from '../appheader/AppHeader';
import { SECONDARY } from '../../styles/colors';
import LoginCallback from '../../auth/LoginCallback';
import Main from './Main';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  toastError: {
    backgroundColor: SECONDARY,
  },
});

export const history = createBrowserHistory();

const Root = () => (
  <div className={css(styles.root)}>
    <AppHeader />
    <ToastContainer
      position="bottom-center"
      hideProgressBar
      toastClassName={css(styles.toastError)}
      autoClose={3000}
    />
    <Route path="/" component={Main} />
    <Route path="/callback" component={LoginCallback} />
  </div>
);

export default Root;
