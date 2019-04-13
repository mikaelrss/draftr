import React, { ReactNode } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import classNames from 'classnames';

import { DEFAULT_PADDING } from '../../styles/paddings';

const styles = StyleSheet.create({
  paper: {
    backgroundColor: 'white',
    boxSizing: 'border-box',
    padding: `${DEFAULT_PADDING / 2}px`,
    // prettier-ignore
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    borderRadius: '4px',
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
  children: ReactNode;
  className?: string;
  noShadow?: boolean;
  noPadding?: boolean;
}

const Paper = ({ children, className, noShadow, noPadding }: IProps) => {
  return (
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
};

export default Paper;
