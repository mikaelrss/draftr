import React from 'react';

import { ReactComponent as Done } from '../../svg/done.svg';
import { ReactComponent as Clear } from '../../svg/clear.svg';
import { ReactComponent as Add } from '../../svg/add.svg';
import { ReactComponent as Draftr } from '../../svg/draftr.svg';

export enum IconType {
  done,
  clear,
  add,
  draftr,
}

interface IIconProps {
  icon: IconType;
  className?: string;
}

const getIcon = (icon: IconType) => {
  switch (icon) {
    case IconType.done:
      return Done;
    case IconType.clear:
      return Clear;
    case IconType.add:
      return Add;
    case IconType.draftr:
      return Draftr;
  }
};

const Icon = ({ icon, className }: IIconProps) => {
  const Component = getIcon(icon);
  return <Component className={className} />;
};

export default Icon;
