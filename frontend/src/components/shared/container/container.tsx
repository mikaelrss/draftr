import React, { ReactNode } from 'react';

import css from './container.module.scss';

interface IProps {
  children: ReactNode;
}

const Container = ({ children }: IProps) => {
  return <div className={css.container}>{children}</div>;
};

export default Container;
