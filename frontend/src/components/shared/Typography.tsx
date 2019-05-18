import React from 'react';
import classNames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  small: {
    fontSize: '10px',
  },
  medium: {
    fontSize: '14px',
  },
  large: {
    fontSize: '21px',
  },
});

export enum FontSize {
  small,
  medium,
  large,
}

interface Props {
  size: FontSize;
  children: React.ReactNode;
  className?: string;
}

const Typography = ({ size, children, className }: Props) => (
  <span
    className={classNames(
      css(
        size === FontSize.small && styles.small,
        size === FontSize.medium && styles.medium,
        size === FontSize.large && styles.large,
      ),
      className,
    )}
  >
    {children}
  </span>
);

export default Typography;
