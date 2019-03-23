import React from 'react';
import classNames from 'classnames';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  Theme,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
  Dashboard,
  ShoppingCart,
  People,
  BarChart,
  Layers,
} from '@material-ui/icons';
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
      <div>
        <IconButton onClick={toggleOpen}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Layers />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default withStyles(styles, { withTheme: true })(AppDrawer);
