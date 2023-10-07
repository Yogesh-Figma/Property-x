import * as React from 'react';
import { Checkbox as MuiCheckbox} from '@mui/material';


export default function CheckBox({ required, disabled, checked, className }) {
  return (
      <MuiCheckbox required={required} disabled={disabled} checked={checked} className={className} sx={{
        paddingTop:0,
        color:"#70757A",
        '&.Mui-checked': {
            color: '#DC143C',
          }
      }}/>
  );
}