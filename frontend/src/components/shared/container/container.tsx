import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite';

const style = StyleSheet.create({
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    overflow: 'auto',
    marginTop: 64,
  },
});

interface IProps {
  children: ReactNode;
}

const Container = ({ children }: IProps) => {
  return <main className={css(style.content)}>{children}</main>;
};

export default Container;
