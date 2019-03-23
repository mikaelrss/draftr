import React from 'react';
import classNames from 'classnames';
import { AppBar, Button, Theme, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../appdrawer/AppDrawer';

const styles = (theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

interface IProps {
  drawerOpen: boolean;
  classes: {
    grow: string;
    menuButton: string;
    appBar: string;
    appBarShift: string;
  };
}

const AppHeader = ({ classes, drawerOpen }: IProps) => {
  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Draftr
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(AppHeader);
