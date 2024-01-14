'use client'
import React from 'react';
import { TextField } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const InputBase = ({ width, className, height,
    required,
    pattern,
    min,
    max,
    minLength,
    maxLength,
    disabled,
    validate,
    isNumber,
    errorMessage,
    value, onChange, label,
    sx, inputLabelClassName = "input-label-no-shrink",
    inputLabelShrinkClassName,
    startAdornment, endAdornment, inputPropClassName,
    multiline, rounded, name = "",
    minRows, type, maxWidth, additionalParams, field, error }) => {
    const shrink = (value || "").length > 0;

    const allowOnlyNumber = (value) => {
        return value.replace(/[^0-9]/g, '')
    }

    const onChangeWrapper = (event) => {
        let wrappedEvent = { ...event };
        if (!!maxLength && (event.target.value || "").length > maxLength) {
            return;
        }
        if (isNumber) {
            wrappedEvent.target.value = allowOnlyNumber(wrappedEvent.target.value);
        }
        if(onChange != null) {
            onChange(wrappedEvent)
        }
    }
    return (
        <TextField
            {...field}
            name={name}
            disabled={disabled}
            className={`${className} rounded-input`}
            value={value}
            onChange={onChangeWrapper}
            multiline={multiline}
            label={shrink ? "" : label}
            minRows={minRows}
            type={type}
            sx={[{
                width: { width },
                maxWidth: { maxWidth },

                "& .MuiInputBase-root": {
                    height: height,
                    border: "1px solid #D3D3D3",
                    boxShadow: "8px 8px 40px 0px rgba(107, 107, 107, 0.20), 4px 4px 4px 0px rgba(107, 107, 107, 0.11)",
                    background: "#FFF",
                    "&.Mui-error": {
                        border: "1px solid #d32f2f",
                    }
                },
                ...sx
            },
            rounded && { "& .MuiInputBase-root": { borderRadius: height / 2 } },
            ]
            }
            InputProps={{
                className: inputPropClassName,
                startAdornment: startAdornment,
                endAdornment: endAdornment
            }}
            {...additionalParams}
            error={error !== undefined}
            helperText={error ? errorMessage : ""}
            InputLabelProps={{
                shrink: shrink,
                className: shrink ? inputLabelShrinkClassName : inputLabelClassName
            }}
        />)
}

const Input = (props) => {
    return (!!props.control ?
        <Controller
            control={props.control}
            name={(props.controllerPrefix||"") + props.name}
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
                <InputBase {...props} field={field} error={error} />
            )} /> : <InputBase {...props} />)
}

export default Input;