import React from 'react';
import Heading from "@/app/components/heading";
import Input from '@/app/components/input';
import PaymentSummary from './paymentSummary';
import DragDropFile, { SUPPORTED_FILE_TYPE } from '@/app/components/ui/dragDropFile';
import CheckBox from '@/app/components/checkbox';
import Button from "@/app/components/button";

export default ({ formData, handleChange, changeStep }) => {

    const [files, setFiles] = React.useState({});

    const handleNext = () => {
        changeStep(2);
    }

    return (<div className="personal-details">
        <div className="row">
            <div className="col-5">
                <PaymentSummary variant="vertical" />
            </div>
            <div className="col-7">
                <Heading label={"Add Your Details"} />
                <div className="row form-row">
                    <div className="col-6">
                        <Input
                            rounded={true}
                            width={"100%"}
                            className='post-form-input'
                            label={"First Name"}
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            height={50}
                        />
                    </div>
                    <div className="col-6">
                        <Input
                            rounded={true}
                            width={"100%"}
                            className='post-form-input'
                            label={"Last Name"}
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            height={50}
                        />
                    </div>
                </div>
                <div className="row form-row">
                    <div className="col-6">
                        <Input
                            rounded={true}
                            width={"100%"}
                            className='post-form-input'
                            label={"Mobile No."}
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            height={50}
                        />
                    </div>
                    <div className="col-6"> <Input
                        rounded={true}
                        width={"100%"}
                        className='post-form-input'
                        label={"Email"}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        height={50}
                    /></div>
                </div>
                <div className='form-row'>
                    <Input
                        rounded={true}
                        width={"100%"}
                        className='post-form-input'
                        label={"Address"}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        height={50}
                    />
                </div>
                <div className="col-6 form-row">
                    <Input
                        rounded={true}
                        width={"100%"}
                        className='post-form-input'
                        label={"Aadhar No."}
                        name="aadhaarNo"
                        value={formData.aadhaarNo}
                        onChange={handleChange}
                        height={50}
                    />
                </div>
                <DragDropFile uploadText="Upload Aadhaar Card" files={files} updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                <div className="col-6 form-row">
                    <Input
                        rounded={true}
                        width={"100%"}
                        className='post-form-input'
                        label={"PAN No."}
                        name="panNo"
                        value={formData.panNo}
                        onChange={handleChange}
                        height={50}
                    />
                </div>
                <DragDropFile uploadText="Upload PAN Card" files={files} updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                <Heading label={"Photos and Signature"} />
                <DragDropFile uploadText="Upload Photo" files={files} updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                <DragDropFile uploadText="Add Signature" files={files} updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                <Heading label={"Nominee and Owner details"} />
                <div className="row  form-row">
                    <div className="col-6">
                        <Input
                            rounded={true}
                            width={"100%"}
                            className='post-form-input'
                            label={"Nominee"}
                            name="nomineeName"
                            value={formData.nomineeName}
                            onChange={handleChange}
                            height={50}
                        /></div>
                    <div className="col-6"> <Input
                        rounded={true}
                        width={"100%"}
                        className='post-form-input'
                        label={"Relation"}
                        name="nomineeRelation"
                        value={formData.nomineeRelation}
                        onChange={handleChange}
                        height={50}
                    /></div>
                </div>
                <div className='row form-row'>
                    <div className='col-5'>
                        <CheckBox className='owner-checkbox' /><span>I am the Owner</span>
                    </div>
                    <div className='col-2'>-OR-</div>
                    <div className='col-5'>+ Add Owner Details (Multiple)</div>
                </div>
            </div>

        </div>
        <Heading label={"Declaration"} />
        <div className='declaration d-flex align-items-start'>
            <CheckBox className='declaration' />
            <div className='declaration-txt'>"I, solemnly declare my understanding and agreement to the terms set forth in this Purchase Agreement for the property located at [Property Address]. I acknowledge that I have been provided with all necessary disclosures and information related to this transaction, and I am committed to fulfilling my obligations and responsibilities as outlined herein. This declaration represents my genuine intent to purchase the property, and I affirm that the information provided is accurate and complete to the best of my knowledge."</div>
        </div>
        <div className='d-flex justify-content-end'>
            <Button className="next-button" rounded={true} height={48} text={"Next"} onClick={handleNext} />
        </div>
    </div >)
}