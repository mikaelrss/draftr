import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DEFAULT_PADDING } from '../../styles/paddings';

const styles = StyleSheet.create({
  paper: {
    backgroundColor: 'white',
    boxSizing: 'border-box',
    padding: `0 ${DEFAULT_PADDING / 2}px`,
    // prettier-ignore
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    borderRadius: '4px',
  },
});

interface IProps {
  children: ReactNode;
}

const Paper = ({ children }: IProps) => {
  return <div className={css(styles.paper)}>{children}</div>;
};

export default Paper;
