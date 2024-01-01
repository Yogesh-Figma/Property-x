import * as React from 'react';
import { Checkbox as MuiCheckbox } from '@mui/material';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

export default function CheckBox({ required, disabled, checked, className, onChange, name }) {
  const onClick = () => {
    onChange({target:{
      name:name,
      value: !checked
    }})
  }
  
  return (
    <MuiCheckbox
      name={name}
      onChange={onClick}
      icon={<CheckBoxOutlineBlankRoundedIcon />}
      checkedIcon={<CheckBoxRoundedIcon />}
      required={required}
      disabled={disabled}
      checked={checked}
      className={className}
      sx={{
        paddingTop: 0,
        color: "#70757A",
        '&.Mui-checked': {
          color: '#DC143C',
        }
      }} />
  );
}