import * as React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

export default function Pagination({ count, shape = "rounded", variant = "outlined", onChange, page, buttonHeight="30px", fontSize }) {
  return (
    <MuiPagination sx={{
      '& .MuiPaginationItem-root': {
        background: "#EAEAEA",
        height:buttonHeight,
        minWidth:buttonHeight,
        fontSize:fontSize
      },
      '& .Mui-selected': {
        background: "#4D5156",
        color:"#fff"
      }
    }} count={count} variant={variant} shape={shape} onChange={onChange} page={page} />
  );
}