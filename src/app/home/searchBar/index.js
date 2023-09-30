
'use client'
import React from 'react';
import './styles.scss'
import { Container, InputAdornment, TextField, Tabs, Tab, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import fluentLocation from '../../icons/fluent_my-location-12-regular.svg?url';
import solidVoice from '../../icons/icon-park-solid_voice.svg?url';
import Image from 'next/image';
import NextLinkButton from '@/app/components/nextLinkButton';
import searchIcon from '@/app/icons/iconamoon_search_white.svg?url'

const TAB_LABELS = ["Buy", "Rent", "Lease", "Commercial", "Residential", "Projects"];

const muiTab = {
    tab: {
        ".Mui-selected": {
            color: "#4d5156 !important"
        }
    }
}



const SearchBar = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const [location, setLocation] = React.useState();
    const [searchTerm, setSearchTerm] = React.useState("");
    const shrink = searchTerm.length > 0;

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleLocation = (event) => {
        setLocation(event.target.value);
    };


    return (<div className='search-bar body-txt'>
        <Tabs value={activeTab} onChange={handleChange} className="search-tabs" sx={muiTab.tab} TabIndicatorProps={{
            style: {
                backgroundColor: "#dc143c"
            }
        }}>
            {TAB_LABELS.map(label => <Tab label={label} />)}
        </Tabs>
        <div className='search-box-row'>
            <TextField
                className='search-input-container'
                type="search"
                label={shrink ? "" : "Search by Locality, Project, City, Builder"}
                value={searchTerm}
                onChange={handleSearchTermChange}
                sx={{ maxWidth: "1035px", minWidth: "600px", borderRadius: "8px", width:"38vw"}}
                InputLabelProps={{
                    shrink: shrink,
                    className: shrink ? "body-txt" : "body-txt input-label-no-shrink"
                }}
                InputProps={{
                    className: "search-input",
                    startAdornment: (
                        <div className='d-flex align-items-center'>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 87, border: "0" }} className='sub-heading-3 search-location-dropdown'>
                                <InputLabel id="select-standard-label">Location</InputLabel>
                                <Select
                                    disableUnderline={true}
                                    labelId="select-standard-label"
                                    id="select-standard"
                                    value={location}
                                    onChange={handleLocation}
                                    label="Location"
                                >
                                    <MenuItem value={10}>Gurgaon</MenuItem>
                                    <MenuItem value={20}>Delhi</MenuItem>
                                    <MenuItem value={30}>Banglore</MenuItem>
                                </Select>
                            </FormControl>
                            <div className='vertical-line'></div>
                        </div>
                    ),
                    endAdornment: (
                        <InputAdornment position="end" className='search-bar-icons'>
                            <Image src={fluentLocation} width={24} height={24} />
                            <Image src={solidVoice} width={24} height={24} />
                        </InputAdornment>
                    ),
                }}
            />
            <NextLinkButton text={"Search"} href="/search" icon={<Image src={searchIcon} width={30} height={30}/>} className={"search-bar-btn"}/>
        </div>
    </div>)
}

export default SearchBar;