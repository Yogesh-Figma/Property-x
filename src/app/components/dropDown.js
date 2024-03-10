import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Input } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { useForm, Controller, useFieldArray } from "react-hook-form";

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

function DropDownBase({ label, handleChange,
  value, values = [], multiple, width, className, variant = "standard",
  hideLabel = false, errorMessage,
 field, error }) {
  const theme = useTheme();
  return (
    <div>
      <FormControl sx={{ width: width }} variant={variant} className={className} error={error}  {...field}>
        <Select
          multiple={multiple}
          displayEmpty
          value={value}
          onChange={handleChange}        
          input={<Input disableUnderline={true} />}
          renderValue={(selected) => {
            if (!hideLabel && !selected?.length) {
              return label;
            }
            const objFnd = (values.find(item => (item.value == selected) || (item.id == selected)) || {});
            return objFnd.label || objFnd.name
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label', MenuProps: { disableScrollLock: true } }}    
        >
          {(values || []).map((item, index) => (
            <MenuItem
              key={index}
              value={item.value || item.id}
            >
              {item.label || item.name}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </div>
  );
}


const DropDown = (props) => {
  return (!!props.control ?
    <>
    {props.register && <input className='d-none' defaultValue={""} {...props.register((props.controllerPrefix || "") + props.name, { required: true })} value={props.value} />}
    <Controller
      control={props.control}
      name={(props.controllerPrefix || "") + props.name}
      defaultValue=""
      rules={{
        min: props.min,
        max: props.max,
        minLength: props.minLength,
        maxLength: props.maxLength,
        validate: props.validate,
        required: props.required,
        pattern: props.pattern
      }}
      render={({ field, fieldState: { error } }) => (
        <DropDownBase {...props} field={field} error={error} />
      )} /></> : <DropDownBase {...props} />)
      
}

export default DropDown;