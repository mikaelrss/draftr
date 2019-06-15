import React from 'react';

import { ReactComponent as Draftr } from '../../svg/draftr.svg';
import { ReactComponent as Done } from '../../svg/done.svg';
import { ReactComponent as Clear } from '../../svg/clear.svg';
import { ReactComponent as Add } from '../../svg/add.svg';
import { ReactComponent as Delete } from '../../svg/delete.svg';
import { ReactComponent as Star } from '../../svg/star.svg';

export enum IconType {
  done,
  delete,
  clear,
  add,
  star,
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
    case IconType.delete:
      return Delete;
    case IconType.star:
      return Star;
  }
};

const Icon = ({ icon, className }: IIconProps) => {
  const Component = getIcon(icon);
  return <Component className={className} />;
};

export default Icon;
