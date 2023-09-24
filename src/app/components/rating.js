"use client"
import * as React from 'react';
import {Rating as MuiRating} from '@mui/material';
import Stack from '@mui/material/Stack';

export default function Rating({value, size="small" }) {
  return (
    <Stack spacing={1}>
      <MuiRating name="ratings" precision={0.5} value={value} size={size} readOnly />
    </Stack>
  );
}