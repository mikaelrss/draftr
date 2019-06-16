import React from 'react';
import classNames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';
import { SECONDARY } from '../../styles/colors';

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
  secondary: {
    color: `${SECONDARY}`,
  },
});

export enum FontSize {
  small,
  medium,
  large,
}

export enum FontStyle {
  primary,
  secondary,
}

interface Props {
  size: FontSize;
  children: React.ReactNode;
  style?: FontStyle;
  className?: string;
  disabled?: boolean;
}

const Typography = ({ size, children, className, style }: Props) => (
  <span
    className={classNames(
      css(
        size === FontSize.small && styles.small,
        size === FontSize.medium && styles.medium,
        size === FontSize.large && styles.large,
        style === FontStyle.secondary && styles.secondary,
      ),
      className,
    )}
  >
    {children}
  </span>
);

export default Typography;
