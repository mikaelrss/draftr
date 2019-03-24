import React from 'react';
import classNames from 'classnames';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  Theme,
  ListItem,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

export const DRAWER_WIDTH = 240;

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
  });

interface IProps {
  open: boolean;
  toggleOpen: () => void;
  classes: {
    drawerPaper: string;
    drawerPaperClose: string;
  };
}

const AppDrawer = ({ classes, open, toggleOpen }: IProps) => {
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !open && classes.drawerPaperClose,
        ),
      }}
      open={open}
    >
      <List>
        <ListItem button>
          <ListItemText primary="RB" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="WR" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="QB" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="TE" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="K" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default withStyles(styles, { withTheme: true })(AppDrawer);
