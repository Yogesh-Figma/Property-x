
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
import { useAppContext } from '@/lib/appContext';
import Button from '@/app/components/button';
import { useSearchParams, useRouter } from 'next/navigation'

const TAB_LABELS = {"Buy":{"param":""}, "Commercial":{"param":"category=commercial"}, 
"Residential":{"param":"category=residential"}, "Projects":{"param":"onlyProject=true"}};

const muiTab = {
    tab: {
        ".Mui-selected": {
            color: "#4d5156 !important"
        }
    }
}



const SearchBar = ({ locations }) => {
    const [activeTab, setActiveTab] = React.useState("Buy");
    const { userLocation, setUserLocation } = useAppContext();
    const [searchTerm, setSearchTerm] = React.useState("");
    const router = useRouter();
    const shrink = searchTerm.length > 0;

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleLocation = (event) => {
        setUserLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let redirectUrl = `/search/${searchTerm.replaceAll(" ", "-")}`;
        if((userLocation||"").length > 0) {
            redirectUrl = redirectUrl + `?city=${userLocation}`
        }
        if(!!TAB_LABELS[activeTab].param){
            redirectUrl = redirectUrl + (redirectUrl.indexOf("?") > -1 ? "&":"?") + TAB_LABELS[activeTab].param;
        }
        router.push(redirectUrl);
    }

    return (<div className='search-bar body-txt'>
        <Tabs value={activeTab} onChange={handleChange} className="search-tabs" sx={muiTab.tab} TabIndicatorProps={{
            style: {
                backgroundColor: "#dc143c"
            }
        }}>
            {Object.keys(TAB_LABELS).map((label, index) => <Tab key={index} label={label} value={label}/>)}
        </Tabs>
        <div className='search-box-row d-flex'>
            <div className='search-box d-flex'>
                <div className='location-container align-items-center d-lg-flex d-none'>
                    <DropDown className={"sub-heading-3 search-location-dropdown"} label={"Location"} handleChange={handleLocation} value={userLocation} values={locations} />
                    <div className='vertical-line'></div>
                </div>
                <form onSubmit={handleSubmit} id="search-form">
                    <TextField
                        required={true}
                        name="trm"
                        className='search-input-container'
                        type="search"
                        label={shrink ? "" : "Search by Locality, Project, City, Builder"}
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        sx={{
                            width: "60vw",
                            maxWidth: "790px",
                            minWidth: "323px",
                            flex: 1,
                            '& .MuiFormLabel-root': {
                                fontSize: 'clamp(12px, 1.5vw, 1rem)',
                                top: "50%",
                                transform: "translateY(-50%)",
                                paddingLeft: "22px"
                            },
                            '& .MuiInputBase-root': {
                                paddingRight: "0px"
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
                                        <Button type="submit" form="search-form" text={""} onClick={(event) => !searchTerm ? event.preventDefault() : null} rounded={true} height={72} icon={<Image src={searchIcon} width={30} height={30} />} className={"search-bar-compact-btn"} />
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
            </div>

            <Button text={"Search"} type="submit" form="search-form" rounded={true} height={68} icon={<Image src={searchIcon} width={30} height={30} />} className={"search-bar-btn d-none d-lg-inline-flex"} />
        </div>
    </div>)
}

export default SearchBar;