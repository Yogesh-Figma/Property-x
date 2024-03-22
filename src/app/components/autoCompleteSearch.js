"use client"

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment, autocompleteClasses } from "@mui/material";
import Image from 'next/image';
import Input from '@/app/components/input';
import SearchIcon from '@/app/icons/iconamoon_search.svg';

export default function AutoCompleteSearch({ width = 300, value, onChange, height, rounded,
    className,
    label,
    required,
    errorMessage,
    control,
    clearOnEscape,
    onInputChange,
    renderOption,
    name, autoCompleteOptions }) {
    const [autoCompleteValue, setAutoCompleteValue] = React.useState("");
    const selectedValue = React.useMemo(
        () => autoCompleteOptions.find(item => (item?.value == value || item == value || item?.label == value)) || "",
        [autoCompleteOptions, value]
      );
      
    return (
        <Autocomplete
            clearOnEscape={clearOnEscape}
            options={autoCompleteOptions}
            renderOption={renderOption}
            onChange={(event, newValue) => {
                onChange({target:{ value:newValue?.value, name }})
            }}
            onInputChange={(event, newInputValue) => {
                setAutoCompleteValue(newInputValue);
                if(!!onInputChange) {
                    onInputChange(newInputValue)
                }
            }}
            name={name}
            isOptionEqualToValue={(option, value) => option?.value == value?.value || option?.label == value?.label || option == value}
            value={selectedValue}
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
                '& .MuiAutocomplete-endAdornment': {
                    right:"12px !important"
                },
                 [`& .${autocompleteClasses.popupIndicator}`]: {
                transform: "none"
              } }}
            popupIcon={<span className="search-icon">
            <SearchIcon />
        </span>}
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