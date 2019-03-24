import React from 'react';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import AppHeader from '../appheader/AppHeader';
import Container from '../shared/container/container';
import Rankings from '../rankings/Rankings';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = () => ({
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
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppHeader />
        <Container>
          <Rankings />
        </Container>
      </div>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(Root);
