import React from 'react';
import { Link as Path } from 'react-router-dom';
import classNames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';
import { PRIMARY_TEXT } from '../../styles/colors';

const styles = StyleSheet.create({
  link: {
    textDecoration: 'none',
    color: PRIMARY_TEXT,
  },
});

interface Props {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

const Link = ({ children, className, to }: Props) => (
  <Path to={to} className={classNames(css(styles.link), className)}>
    {children}
  </Path>
);

export default Link;
