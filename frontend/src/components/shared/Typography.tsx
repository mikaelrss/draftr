import React from 'react';
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
}

const Typography = ({ size, children }: Props) => (
  <span
    className={css(
      size === FontSize.small && styles.small,
      size === FontSize.medium && styles.medium,
      size === FontSize.large && styles.large,
    )}
  >
    {children}
  </span>
);

export default Typography;
