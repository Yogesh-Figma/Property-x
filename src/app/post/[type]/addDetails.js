import React from "react";
import Button from "@/app/components/button";
import FormTabs from "@/app/components/formTabs";
import Heading from "@/app/components/heading"
import Input from '@/app/components/input';
import Image from 'next/image';
import SearchIcon from '@/app/icons/iconamoon_search.svg';
import { useForm } from "react-hook-form";
import AutoCompleteSearch from '@/app/components/autoCompleteSearch';
import DropDown from "@/app/components/dropDown";
import Chip from '@/app/components/chip';
import CheckBox from "@/app/components/checkbox";

export default ({ formData, handleChange, changeStep, specifications = [],
    specificationsCount = [], propertyListingTypes, lookingTo, propertyType,
    propertyConfigTypes, constructionStatus, propertyFurnishingStatuses,
    localities, addSpecification, amenities = [], counts = [],
    zones = [], ownerships = [],
    selectedSpecifications, selectedAmenities, addAmenity, cities,
    projectConfigurationsData,
    removeAmenity, removeSpecification, projects, propertyFacings, isResidential }) => {
    const handleNext = () => {
        changeStep(1);
    }

    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur"
    });


    const handleChangeWrapper = (event) => {
        const { name, value } = event.target;
        setValue(name, value);
        handleChange(event);
    }

    const onError = (errors, e) => console.log(errors, e)

    return (<div className="add-details">
        <form onSubmit={handleSubmit(handleNext, onError)}>
            <div className="image-relative-container position-relative">
                <Heading label={"Add Basic Details"} />
                <div className="form-element-heading">Looking to</div>
                <FormTabs errorMessage={"Required"} name="propertyListingTypeId" items={propertyListingTypes} selectedTab={formData.propertyListingTypeId} onClick={handleChangeWrapper} errors={errors} register={register} />
                <div className="form-element-heading">Search City</div>
                <AutoCompleteSearch
                    errorMessage={"Required"}
                    control={control}
                    required={true}
                    autoCompleteOptions={cities}
                    rounded={true}
                    width={"54%"}
                    className='form-input'
                    label={""}
                    name="cityId"
                    clearOnEscape={true}
                    value={formData.cityId}
                    onChange={handleChangeWrapper}
                    height={40}
                />
                <Image src={"/location_review.png"} width={342} height={329} className="review-location position-absolute d-none d-lg-block" />
            </div>
            <div className="form-element-heading">Property Type</div>
            <FormTabs items={propertyType}
                name="propertyTypeId"
                selectedTab={formData.propertyTypeId}
                onClick={handleChangeWrapper}
                errorMessage={"Required"}
                errors={errors}
                register={register} />

            {!!zones && zones.length > 0 && <>
                <div className="form-element-heading">Zone Type</div>
                <FormTabs items={zones}
                    name="zoneTypeId"
                    selectedTab={formData.zoneTypeId}
                    onClick={handleChangeWrapper}
                    errorMessage={"Required"}
                    errors={errors}
                    register={register} />
            </>}
            <Heading label={"Add Property Details"} />
            <div className="form-element-heading">Locality</div>
            <AutoCompleteSearch
                errorMessage={"Required"}
                control={control}
                required={true}
                autoCompleteOptions={localities}
                rounded={true}
                width={"54%"}
                className='form-input'
                label={""}
                name="localityId"
                clearOnEscape={true}
                value={formData.localityId}
                onChange={handleChangeWrapper}
                height={40}
            />

            <div className="form-element-heading">{isResidential ? "Building/Project/Society (Optional)" : "IT Park/ Business park (Optional)"} </div>
            <AutoCompleteSearch
                errorMessage={"Required"}
                control={control}
                required={false}
                autoCompleteOptions={projects}
                rounded={true}
                width={"54%"}
                className='form-input'
                label={""}
                name="propertyProjectId"
                clearOnEscape={true}
                value={formData.propertyProjectId}
                onChange={handleChangeWrapper}
                height={40}
            />


            {!!propertyConfigTypes && propertyConfigTypes.length > 0 && <>
                <div className="form-element-heading">BHK Type</div>
                <FormTabs errorMessage={"Required"}
                        name="propertyConfigType"
                        items={propertyConfigTypes}
                        selectedTab={formData.propertyConfigType}
                        onClick={handleChangeWrapper}
                        errors={errors} register={register} />
                    {!!projectConfigurationsData && !!projectConfigurationsData.length &&
                        <>
                        <div className="form-element-heading">Select available Floor Plan</div>
                            <FormTabs errorMessage={"Required"}
                                name="propertyConfigurationId"
                                items={projectConfigurationsData}
                                selectedTab={formData.propertyConfigurationId}
                                onClick={handleChangeWrapper}
                                errors={errors} register={register} />
                        </> 
                                    
                    }
            </>}

            {!!specifications && specifications.length > 0 &&
                <div className="specifications-cnt">
                    <div className="form-element-heading">Add Specifications</div>
                    <div className="applied">
                        {(formData.specifications || []).map(item =>
                            <Chip className="chip-drop-down-item selected" label={item.count + " " + item.name} handleCross={() => removeSpecification(item.specification)} showCrossIcon={true} />)
                        }
                    </div>
                    <div className="apply d-flex flex-wrap">
                        <div className="select col-sm-5 col-12 pe-3">
                            <div className="">
                                Select Specification
                            </div>
                            <DropDown
                                control={control}
                                name={`specificationId`}
                                value={formData.specificationId}
                                errorMessage={"Required"}
                                className={"post-form-input fill-dropdown"}
                                label={""}
                                height={40}
                                handleChange={(event) => handleChange({ target: { name: `specificationId`, value: event.target.value } })}
                                values={specifications}
                            />
                        </div>
                        <div className="count col-sm-5 col-8 pe-3 mt-sm-0 mt-3">
                            <div className="">
                                Select Specification Count
                            </div>
                            <DropDown
                                control={control}
                                name={`specificationCount`}
                                value={formData.specificationCount}
                                errorMessage={"Required"}
                                className={"post-form-input fill-dropdown"}
                                label={""}
                                height={40}
                                handleChange={(event) => handleChange({ target: { name: `specificationCount`, value: event.target.value } })}
                                values={counts}
                            />
                        </div>
                        <Button className={"mt-auto"} rounded={true} height={40} text={"Add"} onClick={addSpecification} />
                    </div>
                </div>
            }
            <div className="form-element-heading">Age of Property (in years)</div>
            <Input
                control={control}
                required={true}
                errorMessage={"Required"}
                rounded={true}
                width={"100%"}
                className='form-input'
                label={""}
                name="age"
                value={formData.age}
                onChange={handleChangeWrapper}
                height={40}
                isNumber={true}
            />
            <div className="form-element-heading">Built Up Area</div>
            <Input
                control={control}
                required={true}
                errorMessage={"Required"}
                rounded={true}
                width={"100%"}
                className='form-input'
                label={""}
                name="builtUpArea"
                value={formData.builtUpArea}
                onChange={handleChangeWrapper}
                height={40}
                isNumber={true}
                endAdornment={<span className="sq-ft">Sq. ft.</span>}
            />
            <div className="form-element-heading">Select Facing</div>
            <FormTabs errorMessage={"Required"}
                name="facing"
                items={propertyFacings}
                selectedTab={formData.facing}
                onClick={handleChangeWrapper}
                errors={errors} register={register} />

            <div className="form-element-heading">Construction Status</div>
            <FormTabs errorMessage={"Required"} name="constructionStatus" items={constructionStatus} selectedTab={formData.constructionStatus} onClick={handleChangeWrapper} errors={errors} register={register} />

            {!!propertyFurnishingStatuses && propertyFurnishingStatuses.length > 0 && <>
                <div className="form-element-heading">Furnish Type</div>
                <FormTabs errorMessage={"Required"} name="propertyFurnishingStatusId" items={propertyFurnishingStatuses} selectedTab={formData.propertyFurnishingStatusId} onClick={handleChangeWrapper} errors={errors} register={register} />
            </>}

            {!!ownerships && ownerships.length > 0 && <>
                <div className="form-element-heading">Ownership</div>
                <FormTabs errorMessage={"Required"} name="ownership" items={ownerships} selectedTab={formData.ownership} onClick={handleChangeWrapper} errors={errors} register={register} />
            </>}

            <div className="amenities-cnt col-md-7 col-12">
                <div className="form-element-heading">Add Amenities</div>
                <div className="applied">
                    {(formData.amenities || []).map(item =>
                        <Chip className="chip-drop-down-item selected" label={item.count + " " + item.name} handleCross={() => removeAmenity(item.amenity)} showCrossIcon={true} />)
                    }
                </div>
                <div className="apply d-flex flex-wrap">
                    <div className="select col-sm-5 col-12 pe-3">
                        <div className="">
                            Select Amenities
                        </div>
                        <DropDown
                            control={control}
                            name={`amenityId`}
                            value={formData.amenityId}
                            errorMessage={"Required"}
                            className={"post-form-input fill-dropdown"}
                            label={""}
                            height={40}
                            handleChange={(event) => handleChange({ target: { name: `amenityId`, value: event.target.value } })}
                            values={amenities}
                        />
                    </div>
                    <div className="count col-sm-5 col-8 pe-3 mt-sm-0 mt-3">
                        <div className="">
                            Select Amenities Count
                        </div>
                        <DropDown
                            control={control}
                            name={`amenitiesCount`}
                            value={formData.amenitiesCount}
                            errorMessage={"Required"}
                            className={"post-form-input fill-dropdown"}
                            label={""}
                            height={40}
                            handleChange={(event) => handleChange({ target: { name: `amenitiesCount`, value: event.target.value } })}
                            values={counts}
                        />
                    </div>
                    <Button className={"mt-auto"} rounded={true} height={40} text={"Add"} onClick={addAmenity} />
                </div>
            </div>

            <Button type="submit" className="next-button d-block ml-auto" rounded={true} height={48} text={"Next"} />
        </form>
    </div>)
}