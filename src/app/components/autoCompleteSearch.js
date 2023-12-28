"use client"

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment, autocompleteClasses } from "@mui/material";
import Image from 'next/image';
import searchIcon from '@/app/icons/iconamoon_search.svg?url'
import Input from '@/app/components/input';

export default function AutoCompleteSearch({ width = 300, value, onChange, height, rounded,
    className,
    label,
    required,
    errorMessage,
    control,
    clearOnEscape,
    name, autoCompleteOptions }) {
    const [autoCompleteValue, setAutoCompleteValue] = React.useState("");
    return (
        <Autocomplete
            clearOnEscape={clearOnEscape}
            options={autoCompleteOptions}
            onChange={(event, newValue) => {
                onChange({target:{ value:newValue?.value, name }})
            }}
            onInputChange={(event, newInputValue) => {
                setAutoCompleteValue(newInputValue);
            }}
            name={name}
            value={autoCompleteOptions.find(item => (item?.value == value || item == value))}
            inputValue={autoCompleteValue}
            sx={{ width: width,
                '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
                    padding: "0px",
                    height: "100%",
                    fontSize:"12px"
                },
                '& .MuiInputLabel-root': {
                    transform:"none",
                    padding:"8px",
                    fontSize:"12px"
                },
                 [`& .${autocompleteClasses.popupIndicator}`]: {
                transform: "none"
              } }}
            popupIcon={<Image src={searchIcon} width={18} height={18} />}
            renderInput={(params) => <Input
                control={control}
                required={required}
                errorMessage={errorMessage}
                value={value}
                inputLabelShrinkClassName={"input-label"}
                additionalParams = { params }
                rounded={true}
                width={"100%"}
                className={className}
                label={label}
                name={name}             
                height={height}
            />}
        />
    );
}