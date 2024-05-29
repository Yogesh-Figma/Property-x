import React from 'react';
import Card from "@/app/components/card";
import Heading from "@/app/components/heading";
import PaymentSummary from './paymentSummary';
import Image from "next/image";
import Button from "@/app/components/button";
import PaymentMethod from "./paymentMethod";



function getUserDetails({ firstName, lastName, phone, email, aadharNo, panNo,
    permanentZipcode,
    presentZipcode,
    presentAddressLine1,
    presentAddressLine2,
    permanentAddressLine1,
    permanentAddressLine2,
    permanentCityName,
    permanentLocalityName,
    presentCityName,
    presentLocalityName,
    permanentAddressSame }) {
    return (<div className="details">
        <div className="sub-info row">
            <span className="info col-6">Name</span>
            <span className="detail col-6">{firstName} {lastName}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">Mobile No.</span>
            <span className="detail col-6">{phone}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">Email</span>
            <span className="detail col-6">{email}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">Address</span>
            <span className="detail col-6">{presentAddressLine1 || permanentAddressLine1} {presentAddressLine2 || permanentAddressLine2} {presentZipcode || permanentZipcode}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">Aadhaar No.</span>
            <span className="detail col-6">{aadharNo}</span>
        </div>
        <div className="sub-info row">
            <span className="info col-6">PAN No.</span>
            <span className="detail col-6">{panNo}</span>
        </div>
    </div>)
}

export default ({ formData, handleChange, changeStep, selectedProperty, bookProperty, personalData, resetPaymentDetails, savePaymentDetails }) => {
    const [paymentModalEnabled, togglePaymentModal] = React.useState(false);

    const closePaymentModal = (isFormValid) => {
        if (!isFormValid) {
            resetPaymentDetails();
        }
        togglePaymentModal(false)
    }

    const savePayment = () => {
        togglePaymentModal(false);
        savePaymentDetails()
    }

    return (<div className="payment-and-book">
        <Heading label={"Details Overview"} />
        <PaymentMethod formData={formData} handleChange={handleChange}
            paymentModalEnabled={paymentModalEnabled} handleClose={closePaymentModal}
            save={savePayment} />
        <div className="row">
            <div className="col-xl-6 col-12">
                <PaymentSummary variant="vertical" data={selectedProperty} />
            </div>
            <div className="col-xl-6 col-12">
                <Card className="user-info">
                    <div className="">

                        {(personalData || []).map((item, index) => <div className="user-details-summary">
                            <Heading label={`${item.isOwner ? "Owner" : "User"} Details ${personalData.length > 1 ? (index + 1) : ""}`} />
                            <div className="d-md-flex justify-content-between">
                                {getUserDetails(item)}
                                <div className="photo-signature g-0 d-md-block d-flex align-items-center">
                                    <div className="col-md-12">
                                        {!!item.userPhoto && <Image alt="user photo" className="user-photo" src={URL.createObjectURL(item.userPhoto)} width={116} height={106} />}
                                    </div>
                                    <div className="signature-container position-relative col-md-12 ms-4 ms-md-0 mt-0 mt-md-3">
                                        {!!item.signature && <Image alt="signature" className="signature" src={URL.createObjectURL(item.signature)} fill={true} />}
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {/* <div className="owner-details-summary">
                            <Heading label={"Owner 1"} />
                            <div className="d-md-flex justify-content-between">
                                {getUserDetails({name:"Rahul Verma", mobileNo:"+91 98765 43210", email:"rahulverma@email.com", address:"456 Green Avenue, Mumbai, MH - 400001", aadhaarNo:"1234-5678-9876", panNo:"ABCDE1234F"})}
                                <div className="photo-signature d-md-block d-flex g-0 align-items-center">
                                    <div className="col-md-12">
                                        <Image className="user-photo" src={"/devSampleLogo.png"} width={116} height={106}/>
                                    </div>
                                    <div className="signature-container position-relative col-md-12 ms-4 ms-md-0 mt-0 mt-md-3">
                                        <Image className="signature" src={"/devSampleLogo.png"} fill={true}/>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="nominee">
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
                        </div> */}
                    </div>
                </Card>
                <Button className="d-block payment-details w-100 mt-4 mb-4" variant='outlined' rounded={true} height={48} text={"Payment Details"} onClick={() => togglePaymentModal(true)} />
                <Button className="ms-auto d-block" rounded={true} height={48} text={"Raise Booking Request"} onClick={bookProperty} />
            </div>
        </div>
        {/* <Heading label={"Select Payment Method"} /> */}

        {/* <FormTabs variant={"contained"} items={MODE_OF_PAYMENTS} name="selectedPaymentMethod" className="payment-methods" selectedTab={formData.selectedPaymentMethod} onClick={handleChange}/> */}
    </div>)
}