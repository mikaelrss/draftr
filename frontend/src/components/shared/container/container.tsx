import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../../appdrawer/AppDrawer';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },
    contentOpenShift: {
      marginLeft: `${DRAWER_WIDTH}px`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  });

interface IProps {
  children: ReactNode;
  drawerOpen: boolean;
  classes: {
    content: string;
    contentOpenShift: string;
  };
}

const Container = ({ children, classes, drawerOpen }: IProps) => {
  return (
    <main
      className={classNames(classes.content, {
        [classes.contentOpenShift]: drawerOpen,
      })}
    >
      {children}
    </main>
  );
};

export default withStyles(styles)(Container);
