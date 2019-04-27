import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';

import {
  PRIMARY,
  PRIMARY_TEXT,
  SECONDARY,
  SECONDARY_HOVER,
} from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/constants';
import Icon, { IconType } from './Icon';

const styles = StyleSheet.create({
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    fill: PRIMARY_TEXT,
    color: PRIMARY_TEXT,
    padding: 0,
    backgroundColor: PRIMARY,
    width: '32px',
    height: '32px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickSurface: {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
  },
  button: {
    height: '32px',
    border: 'none',
    outline: 'none',
    backgroundColor: SECONDARY,
    color: PRIMARY_TEXT,
    padding: `0 ${DEFAULT_PADDING}px`,
    ':hover': {
      backgroundColor: SECONDARY_HOVER,
    },
  },
});

interface IIconProps {
  icon: IconType;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const IconButton = ({
  icon,
  onClick,
  className,
  disabled,
}: IIconProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames(css(styles.iconButton), className)}
  >
    <Icon icon={icon} />
  </button>
);

interface IDivProps {
  onClick: () => any;
  children: React.ReactNode;
  className?: string;
}

export const ClickableSurface = ({
  onClick,
  children,
  className,
}: IDivProps) => (
  <div
    onClick={onClick}
    className={classNames(css(styles.clickSurface), className)}
  >
    {children}
  </div>
);

interface IButtonProps {
  onClick: () => any;
  value?: string;
  className?: string;
  style?: object;
}

export const Button = ({ onClick, className, style, value }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(className, css(styles.button))}
    >
      {value}
    </button>
  );
};
