import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Input } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DropDown({label, handleChange, value, values, multiple, width, className, variant="standard", hideLabel= false}) {
  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ width: width }} variant={variant} className={className}>
        <Select
          multiple={multiple}
          displayEmpty
          value={value}
          onChange={handleChange}
          input={<Input disableUnderline={true}/>}
          renderValue={(selected) => {
            if (!hideLabel && selected.length === 0) {
              return label;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label',MenuProps: {disableScrollLock: true} }}
        >
          {values.map((item) => (
            <MenuItem
              key={item.label}
              value={item.value}            
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}