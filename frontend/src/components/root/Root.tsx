import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

import Players from '../players/Players';
import AppHeader from '../appheader/AppHeader';
import AppDrawer from '../appdrawer/AppDrawer';
import Container from '../shared/container/container';

const styles = () =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      display: 'flex',
    },
  });

interface IProps {
  classes: {
    root: string;
    content: string;
  };
}

const Root = ({ classes }: IProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleOpen = () => setDrawerOpen(!drawerOpen);
  return (
    <div className={classes.root}>
      <AppHeader drawerOpen={drawerOpen} />
      <AppDrawer open={drawerOpen} toggleOpen={toggleOpen} />
      <Container drawerOpen={drawerOpen}>
        <Players />
      </Container>
    </div>
  );
};

export default withStyles(styles)(Root);
