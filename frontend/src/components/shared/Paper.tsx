import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  paper: {
    width: '300px',
    backgroundColor: 'white',
    // prettier-ignore
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
  },
});

interface IProps {
  children: ReactNode;
}

const Paper = ({ children }: IProps) => {
  return <div className={css(styles.paper)}>{children}</div>;
};

export default Paper;
