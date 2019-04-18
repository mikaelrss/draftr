import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DEFAULT_PADDING } from '../../styles/paddings';

const style = StyleSheet.create({
  content: {
    marginTop: `${DEFAULT_PADDING}px`,
    padding: `0 ${DEFAULT_PADDING}px`,
  },
});

interface IProps {
  children: ReactNode;
}

const Container = ({ children }: IProps) => {
  return <main className={css(style.content)}>{children}</main>;
};

export default Container;
