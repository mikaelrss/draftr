import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { IInjectProps } from 'react-valid8';

import { css, StyleSheet } from 'aphrodite/no-important';
import { BUTTON_HEIGHT } from './Button';
import Typography, { FontSize } from './Typography';
import { ERROR_COLOR } from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/constants';

const styles = StyleSheet.create({
  input: {
    height: `${BUTTON_HEIGHT}px`,
    padding: `0 ${DEFAULT_PADDING / 3}px`,
    marginBottom: `${DEFAULT_PADDING / 3}px`,
  },
  error: {
    color: ERROR_COLOR,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: `${DEFAULT_PADDING}px`,
  },
});

const Error = ({ error }: { error: string }) => (
  <Typography size={FontSize.small} className={css(styles.error)}>
    {error}
  </Typography>
);

type Props = {
  value?: string;
  id: string;
  label: string;
  required?: boolean;
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  error?: string;
  labelClass?: string;
  showError?: boolean;
  focus?: boolean;
} & Partial<IInjectProps>;

const Input = ({
  value,
  className,
  onChange,
  id,
  label,
  required,
  showError,
  onBlur,
  error,
  labelClass,
  focus,
}: Props) => {
  const inputField = useRef(null);

  useEffect(() => {
    if (!inputField || !inputField.current || !focus) return;
    // @ts-ignore
    inputField.current.focus();
  }, []);

  return (
    <label htmlFor={id} className={classNames(css(styles.label), labelClass)}>
      <Typography size={FontSize.medium}>{`${label} ${
        required ? '*' : ''
      }`}</Typography>
      <input
        ref={inputField}
        id={id}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={classNames(css(styles.input), className)}
      />
      {showError && error && <Error error={error} />}
    </label>
  );
};

export default Input;
