'use client'
import React, { useEffect } from 'react';
import Button from '@/app/components/button';
import { InputAdornment, TextField } from "@mui/material";
import './styles.scss'
import Image from 'next/image';
import searchIcon from '@/app/icons/iconamoon_search.svg?url'
import DropDown from '@/app/components/dropDown';
import Link from 'next/link'
import { useQuery } from 'react-query';
import { useAppContext } from '@/lib/appContext';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import PlaceIcon from '@mui/icons-material/Place';


const CompactSearchBar = ({ height = "30px", width = "600px", maxWidth = "", mobileSearch, showSearchIcon, showLocationMenu, className, locations }) => {
    const SEARCH_REGEX = /\/search\/([^?]+)/
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const matches = SEARCH_REGEX.exec(pathName);
    const searchTermFromParam = ((matches != null && matches.length > 0) ? matches[1] : "").replaceAll("-", " ");
    const cityNameFromParam = !!searchTermFromParam ? searchParams.get("city") : "";
    const [searchTerm, setSearchTerm] = React.useState(searchTermFromParam);
    let { userLocation, setUserLocation } = useAppContext() || {};
    let [hydrated, hydrate] = React.useState(false);
    const [openLocationDropDown, setLocationDropOpen] = React.useState(false);

    useEffect(() => {
        hydrate(true);
    }, []);

    const router = useRouter();
    const shrink = searchTerm.length > 0;

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLocationChange = (event) => {
        const location = locations.find(item => item.value == event.target.value);
        setUserLocation(location);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let redirectUrl = `/search/${searchTerm.replaceAll(" ", "-")}`
        if (!!userLocation) {
            redirectUrl = redirectUrl + `?city=${userLocation.label}`
        }
        router.push(redirectUrl);
    }

    const currentLocation = React.useMemo(() => {
        let location = {}
        if (userLocation?.value && !!locations) {
            location = locations.find(item => item.value == userLocation?.value);
        }
        else if (!!cityNameFromParam && !!locations) {
            location = locations.find(item => item.label.toLowerCase() == cityNameFromParam.toLowerCase());
        }
        return location

    }, [userLocation?.value, cityNameFromParam])

    const handleLocationIconClick = () => {
        setLocationDropOpen(!openLocationDropDown);
    };

    return (
        <div className={`compact-search-bar-container d-flex ${className}`}>
            {!!showLocationMenu && <div className='location-container'>
                <DropDown label={"Location"} handleChange={handleLocationChange} value={hydrated ? currentLocation.value : ""} values={locations} suppressHydrationWarning /></div>}

            {mobileSearch && <>
                <PlaceIcon onClick={handleLocationIconClick} />
                <Dialog
                sx={{
                    "& .MuiDialog-container": {
                        display: "inline-block",
                        top: "100px",
                        position:"relative"
                    }
                }}
                disableEscapeKeyDown open={openLocationDropDown} onClose={handleLocationIconClick}>
                    <DialogTitle>Select Location</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <DropDown label={"Location"} handleChange={handleLocationChange} value={hydrated ? currentLocation.value : ""} values={locations} suppressHydrationWarning />
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Button text={"Ok"} height={20} rounded={true} onClick={handleLocationIconClick} />
                    </DialogActions>
                </Dialog>
            </>}
            <div className='compact-search-bar body-txt'>
                <form onSubmit={handleSubmit} id="search-form-2">
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
                                !mobileSearch && <InputAdornment position="end">
                                    {showSearchIcon ? <Image alt="search icon" src={searchIcon} width={30} height={30} /> : <Button text={"Search"} height={20} rounded={true} form="search-form-2" type="submit" />}
                                </InputAdornment>
                            ),
                            startAdornment: (
                                mobileSearch ? <InputAdornment position="start">
                                    <Image alt="search icon" src={searchIcon} width={15} height={15} />
                                </InputAdornment>: null
                            ),
                        }}
                    />
                </form>
            </div>
        </div>)
}

export default CompactSearchBar;