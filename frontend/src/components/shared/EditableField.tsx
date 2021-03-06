import React, { SyntheticEvent, useState } from 'react';
import Input from './Input';
import Typography, { FontSize } from './Typography';

import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  input: {
    marginBottom: '0 !important',
  },
});

interface Props {
  id: string;
  label: string;
  value: string;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  disabled?: boolean;
}

const EditableField = ({
  value,
  onChange,
  id,
  label,
  onBlur,
  disabled,
}: Props) => {
  const [edit, setEdit] = useState(false);

  const blur = () => {
    onBlur();
    setEdit(false);
  };

  return (
    <div onClick={() => setEdit(true)}>
      {(!edit || disabled) && (
        <Typography size={FontSize.large}>{value}</Typography>
      )}
      {edit && !disabled && (
        <Input
          focus
          id={id}
          labelClass={css(styles.input)}
          label={label}
          onChange={onChange}
          value={value}
          onBlur={blur}
        />
      )}
    </div>
  );
};

export default EditableField;
