import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import AppHeader from '../appheader/AppHeader';
import Container from '../shared/Container';
import Rankings from '../rankings/Rankings';

const style = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Root = () => (
  <>
    <div className={css(style.root)}>
      <AppHeader />
      <Container>
        <Rankings />
      </Container>
    </div>
  </>
);

export default Root;
