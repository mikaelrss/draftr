import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';

import { DEFAULT_PADDING, DROP_SHADOW } from '../../styles/constants';
import { SECONDARY } from '../../styles/colors';

const styles = StyleSheet.create({
  paper: {
    maxHeight: '1584px',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    padding: `${DEFAULT_PADDING / 2}px`,
    boxShadow: DROP_SHADOW,
    borderRadius: '4px',

    '::-webkit-scrollbar-track': {
      backgroundColor: '#F5F5F5',
    },
    '::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: '#F5F5F5',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: SECONDARY,
    },
  },
  noShadow: {
    boxShadow: 'none !important',
    borderRadius: 0,
    border: '1px solid #e2e2e2',
  },
  noPadding: {
    padding: '0 !important',
  },
});

interface IProps {
  children?: ReactNode;
  className?: string;
  noShadow?: boolean;
  noPadding?: boolean;
}

const Paper = ({ children, className, noShadow, noPadding }: IProps) => (
  <div
    className={classNames(
      className,
      css(
        styles.paper,
        noShadow && styles.noShadow,
        noPadding && styles.noPadding,
      ),
    )}
  >
    {children}
  </div>
);

export default Paper;
