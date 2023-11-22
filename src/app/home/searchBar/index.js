
'use client'
import React from 'react';
import './styles.scss'
import { Container, InputAdornment, TextField, Tabs, Tab, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import fluentLocation from '../../icons/fluent_my-location-12-regular.svg?url';
import solidVoice from '../../icons/icon-park-solid_voice.svg?url';
import Image from 'next/image';
import NextLinkButton from '@/app/components/nextLinkButton';
import searchIcon from '@/app/icons/iconamoon_search_white.svg?url'
import DropDown from '@/app/components/dropDown'

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
    const [location, setLocation] = React.useState("");
    const [searchTerm, setSearchTerm] = React.useState("");
    const shrink = searchTerm.length > 0;
    const LOCATIONS = [{ label: "Delhi", value: "Delhi" }, { label: "Gurgaon", value: "Gurgaon" }, { label: "Noida", value: "Noida" }]

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
            {TAB_LABELS.map((label, index) => <Tab key={index} label={label} />)}
        </Tabs>
        <div className='search-box-row d-flex'>
            <div className='search-box d-flex'>
                <div className='location-container align-items-center d-lg-flex d-none'>
                    <DropDown className={"sub-heading-3 search-location-dropdown"} label={"Location"} handleChange={handleLocation} value={location} values={LOCATIONS} />
                    <div className='vertical-line'></div>
                </div>
                <TextField
                    className='search-input-container'
                    type="search"
                    label={shrink ? "" : "Search by Locality, Project, City, Builder"}
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    sx={{
                        width:"60vw",
                        maxWidth: "790px",
                         minWidth: "323px", 
                         flex: 1, 
                        '& .MuiFormLabel-root': {
                            fontSize: 'clamp(12px, 1.5vw, 1rem)',
                            top: "50%",
                            transform: "translateY(-50%)",
                            paddingLeft:"22px"                          
                        },
                        '& .MuiInputBase-root':{
                            paddingRight:"0px"
                        }                        
                    }}
                    InputLabelProps={{
                        shrink: shrink,
                        className: shrink ? "body-txt" : "body-txt input-label-no-shrink"
                    }}
                    InputProps={{
                        className: "search-input",
                        endAdornment: (
                            <InputAdornment position="end" className=''>
                                <div className='d-lg-flex search-bar-icons d-none'>
                                    <Image src={fluentLocation} width={24} height={24} />
                                    <Image src={solidVoice} width={24} height={24} />
                                </div>
                                <div className='d-lg-none d-flex'>
                                    <NextLinkButton text={""} rounded={true} href="/search" height={72} icon={<Image src={searchIcon} width={30} height={30} />} className={"search-bar-compact-btn"} />
                                </div>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <NextLinkButton text={"Search"} rounded={true} href="/search" height={68} icon={<Image src={searchIcon} width={30} height={30} />} className={"search-bar-btn d-none d-lg-inline-flex"} />
        </div>
    </div>)
}

export default SearchBar;