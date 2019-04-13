import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';

import { ReactComponent as Done } from '../../svg/done.svg';
import { ReactComponent as Clear } from '../../svg/clear.svg';
import { ReactComponent as Add } from '../../svg/add.svg';
import { PRIMARY, PRIMARY_TEXT } from '../../styles/colors';

type Icon = 'done' | 'clear' | 'add';

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
});

const getIcon = (icon: Icon) => {
  switch (icon) {
    case 'done':
      return <Done />;
    case 'clear':
      return <Clear />;
    case 'add':
      return <Add />;
  }
};

interface IIconProps {
  icon: Icon;
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
    {getIcon(icon)}
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
