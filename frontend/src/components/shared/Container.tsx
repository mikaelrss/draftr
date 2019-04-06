import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const style = StyleSheet.create({
  content: {
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
