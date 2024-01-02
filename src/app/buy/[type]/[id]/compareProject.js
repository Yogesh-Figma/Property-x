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

export const CompareProjects = ({ projectdata }) => {
    const router = useRouter();
    const { addProjectForComparison, removeProjectFromComparison } = useAppContext();

    const compareProject = () => {
       //addProjectForComparison(projectdata)
       router.push("?compare=1", {scroll: false});
    }

    return (<div className='cursor-pointer compare position-absolute d-flex align-items-center justify-content-center' onClick={compareProject}><CompareIcon /><span>Compare</span></div>)
}

export const CompareProjectPopup = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const comparePopupEnabled = searchParams.get('compare') || false
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleClose = () => {
        router.back();
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const topProjects = [
        { label: 'Signature Global Signum 37D' },
        { label: 'Signature Global City 81' },
        { label: 'M3M Antalya Hills' },
        { label: 'Smart World Orchard' },
        { label: 'M3M Crown' },
        { label: "DLF The Arbour" },
    ];

    return (<div className={`comparison-popup position-fixed ${comparePopupEnabled ? 'visible':''}`}>
         <span className='close-icon position-absolute cursor-pointer' onClick={handleClose}>
                <CloseIcon width={30} height={30} className='close-icon' />
            </span>
        <div className='d-flex position-relative'>
            <div className="comparison-item d-flex flex-column align-items-center position-relative">
                <span className="remove-item position-absolute cursor-pointer" onClick={() => removeProjectFromComparison()}> <CrossIcon className="cross-icon" /></span>
                <div className='prop-image'>
                    <Image src={"/mahunDeveloperImg.png"} width={157} height={94} />
                </div>
                <div className='proj-title'>Nirala Estate</div>
                <div className="proj-location sub-info">Techzone 4, Greater Noida West</div>
            </div>
            <div className="comparison-item d-flex flex-column align-items-center position-relative">
                <span className="remove-item position-absolute cursor-pointer" onClick={() => removeProjectFromComparison()}> <CrossIcon /></span>
                <div className='prop-image'>
                    <Image src={"/mahunDeveloperImg.png"} width={157} height={94} />
                </div>
                <div className='proj-title'>Nirala Estate</div>
                <div className="proj-location sub-info">Techzone 4, Greater Noida West</div>
            </div>

            <div className="comparison-item d-flex flex-column align-items-center justify-content-center">
                <div className='add-proj'>+ Add a Project</div>
                <AutoCompleteSearch
                    autoCompleteOptions={topProjects}
                    rounded={true}
                    width={"100%"}
                    className='project-form-input'
                    label={"Enter Project"}
                    name="searchTerm"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    height={30}
                />
            </div>
            <div className="comparisons-btn d-flex flex-column align-items-center justify-content-center">
                <NextLinkButton className="compare-btn" rounded={true} height={30} text={"Compare"} href={"/projectcomparison"}/>
                <Button variant="outlined-noborder" className="overview-btn" text='Talk to Consultant' height={30} rounded={true} href="/" />
            </div>
        </div>
    </div>)
}