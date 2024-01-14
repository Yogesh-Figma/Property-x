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
import { useSearchParams } from 'next/navigation'



const CompactSearchBar = ({ height = "30px", width = "600px", maxWidth = "", showSearchIcon, showLocationMenu, className, locations }) => {
    const searchParams = useSearchParams()
    const searchQueryParam = searchParams.get('trm');
    const [searchTerm, setSearchTerm] = React.useState(searchQueryParam || "");

    const { userLocationId, setUserLocation } = useAppContext() || {};
    const shrink = searchTerm.length > 0;

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
                <form action={`/search?trm=${searchTerm}`} id="search-form-2">
                    <TextField
                        required={true}
                        name="trm"
                        className='search-input-container justify-content-center'
                        id="search"
                        label={(shrink || showSearchIcon) ? "" : "Search by Locality, Project, City, Builder"}
                        type="search"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        sx={{ borderRadius: "30px", background: "#fff", height: height, width: width, maxWidth: maxWidth }}
                        InputLabelProps={{
                            shrink: shrink,
                            className: shrink ? "body-txt" : "body-txt input-label-no-shrink"
                        }}
                        InputProps={{
                            className: `search-input${showSearchIcon ? "-icon" : ""}`,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {showSearchIcon ? <Image src={searchIcon} width={30} height={30} /> : <Button text={"Search"} height={20} rounded={true} form="search-form-2" type="submit" />}
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
            </div>
        </div>)
}

export default CompactSearchBar;