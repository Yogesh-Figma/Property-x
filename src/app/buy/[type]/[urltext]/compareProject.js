"use client"
import React from 'react';
import CompareIcon from '@/app/icons/compare.svg'
import { useAppContext } from '@/lib/appContext';
import Image from 'next/image';
import Button from '@/app/components/button';
import CrossIcon from '@/app/icons/cross_icon_filled.svg'
import AutoCompleteSearch from '@/app/components/autoCompleteSearch';
import CloseIcon from '@/app/icons/icon_close-small.svg'
import { useSearchParams, useRouter } from 'next/navigation'
import NextLinkButton from '@/app/components/nextLinkButton';
import TalkToConsulantBtn from '@/app/actionBtns/talkToConsultantBtn';
import { getSearchData, searchProjects , searchProperties  } from '@/clients/searchClient';
import { useQuery } from 'react-query';
import CheckBox from '@/app/components/checkbox';

export const CompareProjects = ({ data, isProperty }) => {
    const router = useRouter();
    const { addProjectForComparison, removeProjectFromComparison } = useAppContext();

    const compareProject = () => {
       addProjectForComparison(data, isProperty)
       router.push("?compare=1", {scroll: false});
    }

    return (<div className='cursor-pointer compare position-absolute d-flex align-items-center justify-content-center' onClick={compareProject}><CompareIcon /><span>Compare</span></div>)
}

export const CompareProjectPopup = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const comparePopupEnabled = searchParams.get('compare') || false
    const [searchTerm, setSearchTerm] = React.useState("");
    const { comparisonProjects, removeProjectFromComparison, addProjectForComparison, isPropertyComparison } = useAppContext();
    
    const handleClose = () => {
        router.back();
    }



    const handleSearchTermChange = (term) => {
        setSearchTerm(term)
    }

    const populateSearchData = async () => {
        const result = isPropertyComparison ? await searchProperties(searchTerm): await searchProjects(searchTerm);
        let test = result.map(item => { return {id:item.id, label: item.name, value: item.id, name:item.name, logo:item.logo, address:item.address || ""} });
        return test;
    }

    const { data: searchData = [], isLoading, isError, error } = useQuery({
        enabled:!!searchTerm,
        queryKey: ['getSearchData', searchTerm],
        queryFn: () => populateSearchData(searchTerm),
    });

    const selectProject = (event) => {
        const data = searchData.find(item => item.id == event.target.value);
        if(!!data) {
            addProjectForComparison(data, isPropertyComparison);
        }
    };

    return (<div className={`comparison-popup position-fixed ${comparePopupEnabled ? 'visible':''}`}>
         <span className='close-icon position-absolute cursor-pointer' onClick={handleClose}>
                <CloseIcon width={30} height={30} className='close-icon' />
            </span>
        <div className='d-flex position-relative'>
            {comparisonProjects.map(item => <div className="comparison-item d-flex flex-column align-items-center position-relative">
                <span className="remove-item position-absolute cursor-pointer" onClick={() => removeProjectFromComparison(item.id)}> <CrossIcon className="cross-icon" /></span>
                <div className='prop-image'>
                    <Image src={item.logo} width={157} height={94} />
                </div>
                <div className='proj-title'>{item.name}</div>
                <div className="proj-location sub-info">{item.address}</div>
            </div>)}
            {/* <div className="comparison-item d-flex flex-column align-items-center position-relative">
                <span className="remove-item position-absolute cursor-pointer" onClick={() => removeProjectFromComparison()}> <CrossIcon /></span>
                <div className='prop-image'>
                    <Image src={"/mahunDeveloperImg.png"} width={157} height={94} />
                </div>
                <div className='proj-title'>Nirala Estate</div>
                <div className="proj-location sub-info">Techzone 4, Greater Noida West</div>
            </div> */}

            <div className="comparison-item d-flex flex-column align-items-center justify-content-center">
                <div className='add-proj'>+ Add a {isPropertyComparison ? "Property":"Project"}</div>
                <AutoCompleteSearch
                    autoCompleteOptions={searchData}
                    rounded={true}
                    width={"100%"}
                    className='project-form-input'
                    label={`Enter ${isPropertyComparison ? "Property":"Project"}`}
                    name="searchTerm"
                    clearOnEscape={true}
                    value={searchTerm}
                    onChange={selectProject}
                    onInputChange={handleSearchTermChange}
                    height={32}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <CheckBox
                            style={{ marginRight: 8 }}
                            checked={selected}
                            onChange={()=>{}}
                          />
                          {option.label}
                        </li>
                      )}
                />
            </div>
            <div className="comparisons-btn d-flex flex-column align-items-center justify-content-center">
                <NextLinkButton className="compare-btn" rounded={true} height={30} text={"Compare"} href={"/projectcomparison"}/>
                <TalkToConsulantBtn height={30} />
            </div>
        </div>
    </div>)
}