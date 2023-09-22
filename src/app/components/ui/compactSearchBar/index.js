'use client'
import React from 'react';
import Button from '@/app/components/button';
import { InputAdornment, TextField } from "@mui/material";
import './styles.scss'
import Image from 'next/image';
import searchIcon from '@/app/icons/iconamoon_search.svg'
import DropDown from '@/app/components/dropDown';


const LOCATIONS = [{label:"Noida",value:"noida"},{label:"Gurugram",value:"gurugram"},{label:"New Delhi",value:"delhi"}]
const CompactSearchBar = ({ height = "30px", width = "600px", showSearchIcon, showLocationMenu }) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [location, changeLocation] = React.useState("");

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLocationChange = (event) => {
        changeLocation(event.target.value);
    }


    return (
        <div className='compact-search-bar-container d-flex'>
            {!!showLocationMenu && <div className='location-container'><DropDown label={"Location"} handleChange={handleLocationChange} value={location} values={LOCATIONS} /></div>}
            <div className='compact-search-bar body-txt'>
                <TextField
                    className='search-input-container justify-content-center'
                    id="search"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    sx={{ borderRadius: "30px", background: "#fff", height: { height }, width: { width } }}
                    InputLabelProps={{
                        className: ""
                    }}
                    InputProps={{
                        className: `search-input${showSearchIcon ? "-icon" : ""}`,
                        endAdornment: (
                            <InputAdornment position="end">
                                {showSearchIcon ? <Image src={searchIcon} width={30} height={30} /> : <Button text={"Search"} height={20} rounded={true} />}
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>)
}

export default CompactSearchBar;