import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DEFAULT_PADDING, MOBILE_BREAKPOINT } from '../../styles/constants';

const style = StyleSheet.create({
  content: {
    marginTop: `${DEFAULT_PADDING}px`,
    padding: `0 ${DEFAULT_PADDING}px`,
    [MOBILE_BREAKPOINT]: {
      padding: `0 ${DEFAULT_PADDING / 4}px`,
    },
  },
});

interface IProps {
  children?: ReactNode;
}

const Container = ({ children }: IProps) => {
  return <main className={css(style.content)}>{children}</main>;
};

export default Container;
