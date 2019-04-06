import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';

import { ReactComponent as Done } from '../../svg/done.svg';
import { ReactComponent as Clear } from '../../svg/clear.svg';
import { PRIMARY, PRIMARY_TEXT } from '../../styles/colors';

type Icon = 'done' | 'clear';

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
});

const getIcon = (icon: Icon) => {
  switch (icon) {
    case 'done':
      return <Done />;
    case 'clear':
      return <Clear />;
  }
};

interface IconProps {
  icon: Icon;
  onClick: () => void;
  className?: string;
}

export const IconButton = ({ icon, onClick, className }: IconProps) => (
  <button
    onClick={onClick}
    className={classNames(css(styles.iconButton), className)}
  >
    {getIcon(icon)}
  </button>
);
