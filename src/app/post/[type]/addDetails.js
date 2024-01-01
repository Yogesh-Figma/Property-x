import Button from "@/app/components/button";
import FormTabs from "@/app/components/formTabs";
import Heading from "@/app/components/heading"
import Input from '@/app/components/input';
import Image from 'next/image';
import SearchIcon from '@/app/icons/iconamoon_search.svg';
import { useForm } from "react-hook-form";
import AutoCompleteSearch from '@/app/components/autoCompleteSearch';

const PROPERTY_TYPE = [{ label: "Apartment", value: "apartment" }, { label: "Independent Floor", value: "independent_floor" }, { label: "Independent House", value: "independent_house" }, { label: "Villa", value: "villa" }, { label: "Agricultural Land", value: "agriculatural_land" }];
const LOOKING_TO = [{ label: "Sell", value: "sell" }];
const BHK_TYPE = [{ label: "1 RK", value: "1rk" }, { label: "1 BHK", value: "1bhk" }, { label: "2 BHK", value: "2bhk" }, { label: "3 BHK", value: "3bhk" }, { label: "4 BHK", value: "4bhk" }];
const CONSTRUCTION_STATUS = [{ label: "Ready Move", value: "ready" }, { label: "Under Construction", value: "under_construction" }];
const FURNISH_TYPE = [{ label: "Fully Furnished", value: "fully_furnished" }, { label: "Semi Furnished", value: "semi_furnished" }, { label: "Unfurnished", value: "unfurnished" }];
const topProjects = [
    { label: 'Signature Global Signum 37D', value: "test" },
    { label: 'Signature Global City 81' },
    { label: 'M3M Antalya Hills' },
    { label: 'Smart World Orchard' },
    { label: 'M3M Crown' },
    { label: "DLF The Arbour" },
];

export default ({ formData, handleChange, changeStep, propertyListingTypes, lookingTo, propertyConfigurations, constructionStatus, propertyFurnishingStatuses, localities }) => {
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
            <Heading label={"Add Details"} />
            <div className="form-element-heading">Property Type</div>
            <FormTabs items={propertyListingTypes}
                name="propertyListingTypeId"
                selectedTab={formData.propertyListingTypeId}
                onClick={handleChangeWrapper}
                errorMessage={"Required"}
                errors={errors}
                register={register} />
            <div className="image-relative-container position-relative">
                <div className="form-element-heading">Building/Project/Society (Optional)</div>
                <Input
                    rounded={true}
                    width={"62%"}
                    className='form-input'
                    label={""}
                    name="society"
                    value={formData.society}
                    onChange={handleChangeWrapper}
                    height={40}
                    startAdornment={
                        <span className="search-icon">
                            <SearchIcon />
                        </span>
                    }
                />
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
                <div className="form-element-heading">Looking to</div>
                <FormTabs errorMessage={"Required"} name="rentOrSale" items={LOOKING_TO} selectedTab={formData.rentOrSale} onClick={handleChangeWrapper} errors={errors} register={register} />
                <div className="form-element-heading">Search City</div>
                <Input
                    control={control}
                    errorMessage={"Required"}
                    rounded={true}
                    width={"54%"}
                    className='form-input'
                    label={""}
                    name="city"
                    value={formData.city}
                    onChange={handleChangeWrapper}
                    height={40}
                    required={true}
                    startAdornment={
                        <span className="search-icon">
                            <SearchIcon />
                        </span>
                    }
                />
                <Image src={"/location_review.png"} width={342} height={329} className="review-location position-absolute d-none d-lg-block" />
            </div>
            <div className="form-element-heading">BHK Type</div>
            <FormTabs errorMessage={"Required"}
                name="propertyConfigurationId"
                items={propertyConfigurations}
                selectedTab={formData.propertyConfigurationId}
                onClick={handleChangeWrapper}
                errors={errors} register={register} />
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
            <div className="form-element-heading">Construction Status</div>
            <FormTabs errorMessage={"Required"} name="constructionStatus" items={constructionStatus} selectedTab={formData.constructionStatus} onClick={handleChangeWrapper} errors={errors} register={register} />
            <div className="form-element-heading">Furnish Type</div>
            <FormTabs errorMessage={"Required"} name="propertyFurnishingStatusId" items={propertyFurnishingStatuses} selectedTab={formData.propertyFurnishingStatusId} onClick={handleChangeWrapper} errors={errors} register={register} />
            <Button type="submit" className="next-button d-block ml-auto" rounded={true} height={48} text={"Next"} />
        </form>
    </div>)
}