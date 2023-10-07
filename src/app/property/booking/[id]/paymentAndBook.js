import Card from "@/app/components/card";
import Heading from "@/app/components/heading";
import PaymentSummary from './paymentSummary';
import Image from "next/image";
import FormTabs from "@/app/components/formTabs";


const MODE_OF_PAYMENTS = [{value:"credit", label:"Credit Card"},{value:"cheque", label:"Cheque"},{value:"rtgs", label:"RTGS/NEFT"}]
function getUserDetails({ name, mobileNo, email, address, aadhaarNo, panNo }) {
    return (<div className="details">
        <div className="sub-info row">
            <span className="info col-6">Name</span>
            <span className="detail col-6">{name}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">Mobile No.</span>
            <span className="detail col-6">{mobileNo}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">Email</span>
            <span className="detail col-6">{email}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">Address</span>
            <span className="detail col-6">{address}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">Aadhaar No.</span>
            <span className="detail col-6">{aadhaarNo}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">PAN No.</span>
            <span className="detail col-6">{panNo}</span>
        </div>
    </div>)
}

export default ({ formData, handleChange, changeStep }) => {
    const handleNext = () => {
        changeStep(1);
    }
    return (<div className="payment-and-book">
        <Heading label={"Details Overview"} />
        <div className="row">
            <div className="col-6">
                <PaymentSummary variant="vertical" />
            </div>
            <div className="col-6">
                <Card className="user-info">
                    <div className="">
                        <div className="user-details-summary">
                            <Heading label={"User Details"} />
                            <div className="d-flex justify-content-between">
                                {getUserDetails({name:"Rahul Verma", mobileNo:"+91 98765 43210", email:"rahulverma@email.com", address:"456 Green Avenue, Mumbai, MH - 400001", aadhaarNo:"1234-5678-9876", panNo:"ABCDE1234F"})}
                                <div className="photo-signature">
                                    <Image className="user-photo" src={"/devSampleLogo.png"} width={116} height={106}/>
                                    <div className="signature-container position-relative">
                                        <Image className="signature" src={"/devSampleLogo.png"} fill={true}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="owner-details-summary">
                            <Heading label={"Owner 1"} />
                            <div className="d-flex justify-content-between">
                                {getUserDetails({name:"Rahul Verma", mobileNo:"+91 98765 43210", email:"rahulverma@email.com", address:"456 Green Avenue, Mumbai, MH - 400001", aadhaarNo:"1234-5678-9876", panNo:"ABCDE1234F"})}
                                <div className="photo-signature">
                                    <Image className="user-photo" src={"/devSampleLogo.png"} width={116} height={106}/>
                                    <div className="signature-container position-relative">
                                        <Image className="signature" src={"/devSampleLogo.png"} fill={true}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nominee">
                            <Heading label={"Nominee"} />
                            <div className="d-flex ">
                                <div className="details">
                                    <div className="sub-info row">
                                        <span className="info col-6">Name</span>
                                        <span className="detail col-6">{formData.nomineeName||"Priya Sharma"}</span>
                                    </div>
                                    <div className="sub-info row">
                                        <span className="info col-6">Relation</span>
                                        <span className="detail col-6">{formData.nomineeRelation||"Daughter"}</span>
                                    </div>
                                </div>
                                <div className="photo-signature"></div>
                            </div>
                        </div>
                    </div>                       
                </Card>
            </div>          
        </div>
        <Heading label={"Select Payment Method"} />
        <FormTabs variant={"contained"} items={MODE_OF_PAYMENTS} name="selectedPaymentMethod" className="payment-methods" selectedTab={formData.selectedPaymentMethod} onClick={handleChange}/>
    </div>)
}