'use client'
import React from 'react';
import { TextField } from "@mui/material";

const Input = ({ width, className, height,
    value, onChange, label,
    sx, inputLabelClassName = "input-label-no-shrink", inputLabelShrinkClassName,
    startAdornment, endAdornment, inputPropClassName, multiline, rounded, name, minRows, type, maxWidth, additionalParams }) => {
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
            boxShadow: "8px 8px 40px 0px rgba(107, 107, 107, 0.20), 4px 4px 4px 0px rgba(107, 107, 107, 0.11)",
            background: "#FFF",
            width: { width },
            maxWidth:{ maxWidth },
            border: "1px solid #D3D3D3",
            "& .MuiInputBase-root": {
                height: height
            },
            ...sx
        },
        rounded && { borderRadius: height / 2 },
        ]
        }
        InputProps={{
            className: inputPropClassName,
            startAdornment: startAdornment,
            endAdornment: endAdornment
        }}
        {...additionalParams}
        InputLabelProps={{
            shrink: shrink,
            className: shrink ? inputLabelShrinkClassName : inputLabelClassName
        }}
    />)
}

export default Input;