'use client'
import React from 'react';
import { TextField } from "@mui/material";

const Input = ({ width, className, height,
    value, onChange, label,
    sx, inputLabelClassName = "input-label-no-shrink", inputLabelShrinkClassName,
    startAdornment, endAdornment, inputPropClassName, multiline, rounded, name, minRows, type }) => {
    const shrink = (value || "").length > 0;
    return (<TextField
        name={name}
        className={`${className} rounded-input`}
        value={value}
        onChange={onChange}
        multiline={multiline}
        label={shrink ? "" : label}
        minRows={minRows}
        type={type}
        sx={[{
            width: { width },
            border: "1px solid #D3D3D3",
            "& .MuiInputBase-root": {
                height: height
            },
            ...sx
        },
        rounded && { borderRadius: height / 2 },
        ]
        }
        InputLabelProps={{
            shrink: shrink,
            className: shrink ? inputLabelShrinkClassName : inputLabelClassName
        }}
        InputProps={{
            className: inputPropClassName,
            startAdornment: startAdornment,
            endAdornment: endAdornment
        }}
    />)
}

export default Input;