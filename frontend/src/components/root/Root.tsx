import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import AppHeader from '../appheader/AppHeader';
import Container from '../shared/Container';
import Rankings from '../rankings/Rankings';
import Team from '../team/Team';

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
        <Team />
        <Rankings />
      </Container>
    </div>
  </>
);

export default Root;
