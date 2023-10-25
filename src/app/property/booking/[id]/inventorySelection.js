
import Card from "@/app/components/card";
import FormTabs from "@/app/components/formTabs";
import Image from "next/image";
import DropDown from '@/app/components/dropDown';
import Heading from '@/app/components/heading';
import PaymentSummary from './paymentSummary';
import { PropertyCard4 } from "@/app/components/ui/propertyCard";
import Button from "@/app/components/button";

export default ({ formData, handleChange, changeStep }) => {
    const floors = Array.from({ length: 28 }, (v, i) => { return { label: i + 1, value: i + 1 } });
    const apartments = [{ label: "101", value: "101" }, { label: "102", value: "102" }, { label: "103", value: "103" }, { label: "104", value: "104" }]
    const towers = [{ label: "01", value: "01" }, { label: "02", value: "02" }, { label: "03", value: "03" }]
    const bhkTypes = [{ label: "1RK", value: "1RK" }, { label: "1BHK", value: "1BHK" }, { label: "2BHK", value: "2BHK" }, { label: "3BHK", value: "3BHK" }, { label: "4BHK", value: "4BHK" }]

    const handleNext = () => {
        changeStep(1);
    }

    const handleTowerChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (<div className="inventory-selection">
        <div className="d-flex site-plan-cnt g-0">
            <div className="property-card">
            <PropertyCard4 title={"Gaur Krishn Villas"}
            verticalView={true}
                bhk={"2, 3, 4 BHK"}
                address={"Sector 10, Greater Noida West, Greater Noida"}
                priceRange={"₹40L-85L"}
                imgsrc={"/samplePropertyImage.jpeg"}
                devImage={"/devSampleImage.jpeg"}
                by={"XYZ Builders"}
                possessionInfo={"Dec, 2023"}
                avgPrice={"14.00/sq.ft"}
                id={"123"}
                subInfo={"Manorialle is a sound investment on all counts. You experience premium luxury when you live in it, and you yield premium returns when you don&rsquo;t. 40 levels of unique architecture create an imposing structure that blends seamlessly into the illustrious neighborhood. The stunning views from your Condominium on your independent floor will set your pulse racing, while the extraordinary service will soothe your senses, and two elevators, only at your service. This breathtaking community will be home to some of the most unseen marvels inspired by nature, with the utmost optimum utilization"}
            />
            </div>
            <div className="site-plan position-relative">              
                <Image className="site-plan-image" src={"/sampleSitePlan.png"} fill={true}/>
            </div>
        </div>
        <Heading label={"Select the Inventory"} />
        <div className="tower-bhk-cnt d-flex section align-items-center">
            <div className="tower-cnt d-flex align-items-center">
                <span className="sub-heading-space sub-heading-2">Tower</span>
                <DropDown className={"selection-dropdown"} label={"Tower"} handleChange={(event) => handleChange({target:{name:"tower", value:event.target.value}})} value={formData.tower} values={towers} />
            </div>
            <div className="bhk-cnt d-flex align-items-center">
                <span className="sub-heading-space sub-heading-2">BHK Type</span>
                <DropDown className={"selection-dropdown"} label={"BHK"} handleChange={(event) =>  handleChange({target:{name:"bhkType", value:event.target.value}})} value={formData.bhkType} values={bhkTypes} />
            </div>
        </div>
        <div className="floor-cnt section">
            <div className="d-flex floor-tabs">
                <span className="sub-heading-space sub-heading-2">Floor</span>
                <FormTabs variant={"contained"} name="floor" height={30} width={30} items={floors} selectedTab={formData.floor} onClick={handleChange} />
            </div>
            <Card className="floor-plan">
                <div>Floor Plan</div>
                <div className="floor-plan-img-cnt position-relative">
                    <Image src={"/floorPlanSample.jpeg"} fill={true} />
                </div>
            </Card>
        </div>
        <div className="apartment d-flex section align-items-center">
            <span className="sub-heading-2">Apartment</span>
            <FormTabs variant={"contained"} width={124} height={50} name="apartment" items={apartments} selectedTab={formData.apartment} onClick={handleChange} />
        </div>
        <div className="take-tour d-flex align-items-center justify-content-center sub-heading-2">Take a Tour from the Selected Property</div>
        <Heading label={"Payment Summary"} />
        <PaymentSummary />
        <div className='d-flex justify-content-end'>
            <Button className="next-button" rounded={true} height={48} text={"Next"} onClick={handleNext} />
        </div>
    </div>)
}