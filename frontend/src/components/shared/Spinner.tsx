import React from 'react';
import { SpiralSpinner } from 'react-spinners-kit';
import { PRIMARY, SECONDARY } from '../../styles/colors';

interface IProps {
  loading?: boolean;
}

const Spinner = ({ loading = true }: IProps) => (
  <SpiralSpinner loading={loading} frontColor={SECONDARY} backColor={PRIMARY} />
);

export default Spinner;
