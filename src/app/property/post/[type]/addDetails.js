import Button from "@/app/components/button";
import FormTabs from "@/app/components/formTabs";
import Heading from "@/app/components/heading"
import Input from '@/app/components/input';
import Image from 'next/image';
import SearchIcon from '@/app/icons/iconamoon_search.svg';

const PROPERTY_TYPE = [{ label: "Apartment", value: "apartment" }, { label: "Independent Floor", value: "independent_floor" }, { label: "Independent House", value: "independent_house" }, { label: "Villa", value: "villa" }, { label: "Agricultural Land", value: "agriculatural_land" }];
const LOOKING_TO = [{ label: "Rent", value: "rent" }, { label: "Sell", value: "sell" }];
const BHK_TYPE = [{ label: "1 RK", value: "1rk" }, { label: "1 BHK", value: "1bhk" }, { label: "2 BHK", value: "2bhk" }, { label: "3 BHK", value: "3bhk" }, { label: "4 BHK", value: "4bhk" }];
const CONSTRUCTION_STATUS = [{ label: "Ready Move", value: "ready" }, { label: "Under Construction", value: "under_construction" }];
const FURNISH_TYPE = [{ label: "Fully Furnished", value: "fully_furnished" }, { label: "Semi Furnished", value: "semi_furnished" }, { label: "Unfurnished", value: "unfurnished" }];

export default ({ formData, handleChange, changeStep }) => {
    const handleNext = () => {
        changeStep(1);
    }
    return (<div className="add-details">
        <Heading label={"Add Details"} />
        <div className="form-element-heading">Property Type</div>
        <FormTabs items={PROPERTY_TYPE} name="propertyType" selectedTab={formData.propertyType} onClick={handleChange} />
        <div className="image-relative-container position-relative">
            <div className="form-element-heading">Building/Project/Society (Optional)</div>
            <Input
                rounded={true}
                width={"42%"}
                className='form-input'
                label={""}
                name="society"
                value={formData.society}
                onChange={handleChange}
                height={40}
                startAdornment={
                    <span className="search-icon">
                        <SearchIcon />
                    </span>
                }
            />
            <div className="form-element-heading">Locality</div>
            <Input
                rounded={true}
                width={"54%"}
                className='form-input'
                label={""}
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                height={40}
            />
            <div className="form-element-heading">Looking to</div>
            <FormTabs name="rentOrSale" items={LOOKING_TO} selectedTab={formData.rentOrSale} onClick={handleChange} />
            <div className="form-element-heading">Search City</div>
            <Input
                rounded={true}
                width={"54%"}
                className='form-input'
                label={""}
                name="city"
                value={formData.city}
                onChange={handleChange}
                height={40}
                startAdornment={
                    <span className="search-icon">
                        <SearchIcon />
                    </span>
                }
            />
            <Image src={"/location_review.png"} width={342} height={329} className="review-location position-absolute" />
        </div>
        <div className="form-element-heading">BHK Type</div>
        <FormTabs name="bhkType" items={BHK_TYPE} selectedTab={formData.bhkType} onClick={handleChange} />
        <div className="form-element-heading">Built Up Area</div>
        <Input
            rounded={true}
            width={"100%"}
            className='form-input'
            label={""}
            name="builtUpArea"
            value={formData.builtUpArea}
            onChange={handleChange}
            height={40}
            endAdornment={<span className="sq-ft">Sq. ft.</span>}
        />
        <div className="form-element-heading">Construction Status</div>
        <FormTabs name="constructionStatus" items={CONSTRUCTION_STATUS} selectedTab={formData.constructionStatus} onClick={handleChange} />
        <div className="form-element-heading">Furnish Type</div>
        <FormTabs name="furnishType" items={FURNISH_TYPE} selectedTab={formData.furnishType} onClick={handleChange} />
        <Button className="next-button d-block ml-auto" rounded={true} height={48} text={"Next"} onClick={handleNext} />
    </div>)
}