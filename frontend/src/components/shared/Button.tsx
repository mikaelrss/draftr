import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { CircleSpinner } from 'react-spinners-kit';
import classNames from 'classnames';

import {
  PRIMARY,
  PRIMARY_BUTTON_BG_COLOR,
  PRIMARY_BUTTON_BG_HOVER,
  PRIMARY_TEXT,
  SECONDARY_BUTTON_HOVER,
} from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/constants';
import Icon, { IconType } from './Icon';

export const BUTTON_HEIGHT = 32;

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
    width: `${BUTTON_HEIGHT}px`,
    height: `${BUTTON_HEIGHT}px`,
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
    height: `${BUTTON_HEIGHT}px`,
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    outline: 'none',
    padding: `0 ${DEFAULT_PADDING / 2}px`,
    transition: 'background-color 0.2s ease-in-out',
  },
  primary: {
    backgroundColor: PRIMARY_BUTTON_BG_COLOR,
    color: PRIMARY_TEXT,
    ':hover': {
      backgroundColor: PRIMARY_BUTTON_BG_HOVER,
    },
  },
  secondary: {
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: SECONDARY_BUTTON_HOVER,
    },
  },
  disabled: {
    opacity: 0.6,
  },
  load: {
    marginRight: `${DEFAULT_PADDING / 2}px`,
  },
});

interface IIconProps {
  icon: IconType;
  onClick: () => void;
  className?: string;
  iconClass?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const IconButton = ({
  icon,
  onClick,
  className,
  iconClass,
  loading,
  disabled,
}: IIconProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames(
      css(styles.iconButton, disabled && styles.disabled),
      className,
    )}
  >
    {loading && <CircleSpinner size={10} />}
    {!loading && <Icon icon={icon} className={iconClass} />}
  </button>
);

interface IDivProps {
  onClick?: () => any;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const ClickableSurface = ({
  onClick,
  children,
  className,
  disabled,
  ...props
}: IDivProps) => {
  const spreadProps = {
    ...props,
    onClick,
    className: classNames(css(styles.clickSurface), className),
  };
  if (disabled) {
    delete spreadProps.onClick;
  }
  return <div {...spreadProps}>{children}</div>;
};

interface IButtonProps {
  onClick?: () => any;
  value?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loading?: boolean;
  style?: object;
  disabled?: boolean;
}

export const PrimaryButton = ({
  onClick,
  className,
  style,
  value,
  type,
  loading,
  disabled,
}: IButtonProps) => {
  const spreadProps = {
    type,
    style,
    className: classNames(
      className,
      css(styles.button, disabled && styles.disabled, styles.primary),
    ),
    onClick,
  };
  if (disabled) {
    delete spreadProps.onClick;
  }
  return (
    <button {...spreadProps}>
      {loading && (
        <span className={css(styles.load)}>
          <CircleSpinner size={10} />
        </span>
      )}
      {value}
    </button>
  );
};

export const SecondaryButton = ({
  onClick,
  className,
  style,
  value,
  type,
  loading,
  disabled,
}: IButtonProps) => {
  const spreadProps = {
    type,
    style,
    className: classNames(
      className,
      css(styles.button, disabled && styles.disabled, styles.secondary),
    ),
    onClick,
  };
  if (disabled) {
    delete spreadProps.onClick;
  }
  return (
    <button {...spreadProps}>
      {loading && (
        <span className={css(styles.load)}>
          <CircleSpinner size={10} />
        </span>
      )}
      {value}
    </button>
  );
};
