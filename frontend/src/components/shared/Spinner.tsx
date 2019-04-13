import React from 'react';
import { JellyfishSpinner } from 'react-spinners-kit';
import { SECONDARY } from '../../styles/colors';

interface IProps {
  loading?: boolean;
}

const Spinner = ({ loading = true }: IProps) => (
  <JellyfishSpinner loading={loading} color={SECONDARY} />
);

export default Spinner;
