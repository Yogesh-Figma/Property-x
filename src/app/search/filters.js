'use client'
import React from 'react'
import "./filter.scss"
import ChipDropDown from '@/app/components/chipDropDown';
import Chip from '@/app/components/chip';
import Image from 'next/image';
import moreFilter from '@/app/icons/more_filter_icon.svg?url'


const AMENITIES = [{value:"Parking", label:"Parking"},{value:"park", label:"park"},{value:"Power Backup", label:"Power Backup"},{value:"Lift", label:"Lift"},{value:"Gymnasium", label:"Gymnasium"},{value:"Swimming Pool", label:"Swimming Pool"},{value:"Gas Pipeline", label:"Gas Pipeline"},{value:"Security Personnel", label:"Security Personnel"}]
const PROPERTY_TYPES = [{value:"Apartment", label:"Apartment"},{value:"Independent House", label:"Independent House"},{value:"", label:"Independent Floor"},{value:"Plot", label:"Plot"},{value:"Studio", label:"Studio"}]
const BUYING_TYPE = [{value:"Resale", label:"Resale"},{value:"New Booking", label:"New Booking"}]
const CONFIGURATION = [{value:"1 RK/1 BHK", label:"1 RK/1 BHK"},{value:"2 BHK", label:"2 BHK"},{value:"3 BHK", label:"3 BHK"},{value:"4 BHK", label:"4 BHK"},{value:"5 BHK", label:"5 BHK"}]
const CONSTRUCTION_STATUS = [{value:"New Launch", label:"New Launch"},{value:"Under Construction", label:"Under Construction"},{value:"ReadyToMove", label:"ReadyToMove"}]


function valueLabelFormat(value) {
    const units = ['L', 'CR'];
  
    let unitIndex = 0;
    let scaledValue = value;
  
    while (scaledValue >= 100 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 100;
    }
  
    return `${scaledValue} ${units[unitIndex]}`;
  }

const Filter = () => {
    const priceRangeDefaultValue = [100, 200];
    const [formData, setFormData] = React.useState({ amenities: new Set(), propertyTypes: new Set(), buyingTypes:new Set(), configuration: new Set(), constructionStatus:new Set(), priceRange:priceRangeDefaultValue});
    const [priceRangeChanged, setPriceRangeChanged] = React.useState(false);

    const handleChange = (name, value) => {
        setFormData((prevFormData) => {
            if(name == "priceRange") {     
                setPriceRangeChanged(true);           
                return { ...prevFormData, [name]:value}              
            }
            else {
                const newSet = new Set(prevFormData[name]);
                if(prevFormData[name].has(value)) {
                    newSet.delete(value)
                }
                else {
                    newSet.add(value)
                }
                return { ...prevFormData, [name]:newSet}
            }
        })
    };    
    const getActiveChipValues = (name, values) => {
        let activeChips;
        if(name =='priceRange') {
            if(priceRangeChanged) {
                let minvalue = valueLabelFormat(values[0]);
                let maxValue = valueLabelFormat(values[1]);
                activeChips = <Chip className="chip-drop-down-item selected" label={`${minvalue} - ${maxValue}`} handleCross={()=>{handleChange(name, priceRangeDefaultValue); setPriceRangeChanged(false);}} showCrossIcon={true}/>
            }
        }
        else {
            activeChips = Array.from(values).map(value => <Chip className="chip-drop-down-item selected" label={value} handleCross={()=>handleChange(name, value)} showCrossIcon={true}/>)
        }
        return activeChips;
    }

    return (<div className='filter-container overflow-container-fluid'>
        <div className='filters row g-0 d-flex align-items-center'>
        <div className='col-10'>
        <ChipDropDown className={"search-filter"} width={150} label="Price Range" handleChange={handleChange} value={formData.priceRange} name="priceRange" min={1} max={1000} showSlider={true} valueLabelFormat={valueLabelFormat}/>
        <ChipDropDown className={"search-filter"} width={150} label="Amenities" handleChange={handleChange} values={AMENITIES} value={formData.amenities} name="amenities"/>
        <ChipDropDown className={"search-filter"} width={150} label="Property Type" handleChange={handleChange} values={PROPERTY_TYPES} value={formData.propertyTypes} name="propertyTypes"/>
        <ChipDropDown className={"search-filter"} width={150} label="Buying Type" handleChange={handleChange} values={BUYING_TYPE} value={formData.buyingTypes} name="buyingTypes"/>
        <ChipDropDown className={"search-filter"} width={150} label="Configuration" handleChange={handleChange} values={CONFIGURATION} value={formData.configuration} name="configuration"/>
        <ChipDropDown className={"search-filter"} width={186} label="Construction Status" handleChange={handleChange} values={CONSTRUCTION_STATUS} value={formData.constructionStatus} name="constructionStatus"/>
        </div>
        <span className='additional-filter col-2 d-flex align-items-center'>
            <Image src={moreFilter} width={30} height={24}/>
            <span>More</span>
        </span>
         </div>
         <div className='applied-filters'>
            {getActiveChipValues("priceRange",formData.priceRange)}
            {getActiveChipValues("amenities",formData.amenities)}
            {getActiveChipValues("propertyTypes",formData.propertyTypes)}
            {getActiveChipValues("buyingTypes",formData.buyingTypes)}
            {getActiveChipValues("configuration",formData.configuration)}
            {getActiveChipValues("constructionStatus",formData.constructionStatus)}
         </div>
    </div>)
}

export default Filter;