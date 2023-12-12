'use client'
import React from 'react';
import Button from '@/app/components/button';
import { InputAdornment, TextField } from "@mui/material";
import './styles.scss'
import Image from 'next/image';
import searchIcon from '@/app/icons/iconamoon_search.svg?url'
import DropDown from '@/app/components/dropDown';
import Link from 'next/link'
import { useQuery } from 'react-query';
import { useAppContext } from '@/lib/appContext';



const CompactSearchBar = ({ height = "30px", width = "600px", maxWidth="", showSearchIcon, showLocationMenu, className, locations }) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const { userLocationId, setUserLocation } = useAppContext() || {};

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLocationChange = (event) => {
        setUserLocation(event.target.value);
    }


    return (
        <div className={`compact-search-bar-container d-flex ${className}`}>
            {!!showLocationMenu && <div className='location-container'>
                <DropDown label={"Location"} handleChange={handleLocationChange} value={userLocationId} values={locations} /></div>}
            <div className='compact-search-bar body-txt'>
                <TextField
                    className='search-input-container justify-content-center'
                    id="search"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    sx={{ borderRadius: "30px", background: "#fff", height: height, width:width, maxWidth:maxWidth }}
                    InputLabelProps={{
                        className: ""
                    }}
                    InputProps={{
                        className: `search-input${showSearchIcon ? "-icon" : ""}`,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Link href="/search" className='search-link' passHref>{showSearchIcon ? <Image src={searchIcon} width={30} height={30} /> : <Button text={"Search"} height={20} rounded={true} />}</Link>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>)
}

export default CompactSearchBar;