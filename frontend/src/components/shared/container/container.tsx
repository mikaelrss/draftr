import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: 'calc(100vh - 64px)',
      overflow: 'auto',
      marginTop: 64,
    },
  });

interface IProps {
  children: ReactNode;
  classes: {
    content: string;
  };
}

const Container = ({ children, classes }: IProps) => {
  return <main className={classNames(classes.content)}>{children}</main>;
};

export default withStyles(styles)(Container);
