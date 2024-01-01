import React from 'react';
import Heading from "@/app/components/heading";
import Input from '@/app/components/input';
import PaymentSummary from './paymentSummary';
import DragDropFile, { SUPPORTED_FILE_TYPE } from '@/app/components/ui/dragDropFile';
import CheckBox from '@/app/components/checkbox';
import Button from "@/app/components/button";
import AddressForm from './addressForm';
import { useForm } from "react-hook-form";
export default ({ data, personalData, changeStep, handlePersonalDetails, addOwner, declaration, handleFormChange }) => {

    const [files, setFiles] = React.useState({});

    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur"
    });

    const handleNext = () => {
        changeStep(2);
    }

    const onError = (errors, e) => console.log(errors, e)

    return (<div className="personal-details">
        <div className="row">
            <div className="col-xl-5 col-12">
                <PaymentSummary variant="vertical" data={data}/>
            </div>
            <div className="col-xl-7 col-12">
                <Heading label={"Add Your Details"} />
                {(personalData || []).map((formData, index) => {

                    const handleChangeWrapper = (event) => {
                        const { name, value } = event.target;
                        setValue((index||"") + name, value);
                        handlePersonalDetails(index, event)
                    }

                    return (<div>
                        <div className='owner-checkbox-cnt d-flex'>
                            <CheckBox onChange={handleChangeWrapper} name="owner" checked={formData.owner} className='owner-checkbox' /><span>I am the Owner</span>
                        </div>
                        <div className='form-section'>
                            <div className='form-element-head'>Personal Details</div>
                            <div className="row form-row">
                                <div className="col-md-6 col-12">
                                    <Input
                                        controllerPrefix={index}
                                        errorMessage={"Required"}
                                        control={control}
                                        required={true}
                                        rounded={true}
                                        width={"100%"}
                                        className='post-form-input'
                                        label={"First Name"}
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChangeWrapper}
                                        height={50}
                                    />
                                </div>
                                <div className="col-md-6 col-12 mt-md-0 mt-4">
                                    <Input
                                        controllerPrefix={index}
                                        errorMessage={"Required"}
                                        control={control}
                                        required={true}
                                        rounded={true}
                                        width={"100%"}
                                        className='post-form-input'
                                        label={"Last Name"}
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChangeWrapper}
                                        height={50}
                                    />
                                </div>
                            </div>
                            <div className="row form-row">
                                <div className="col-md-6 col-12">
                                    <Input
                                        controllerPrefix={index}
                                        errorMessage={"Required"}
                                        control={control}
                                        required={true}
                                        rounded={true}
                                        width={"100%"}
                                        minLength={10}
                                        maxLength={10}
                                        isNumber={true}
                                        className='post-form-input'
                                        label={"Mobile No."}
                                        name="mobileNo"
                                        value={formData.mobileNo}
                                        onChange={handleChangeWrapper}
                                        height={50}
                                    />
                                </div>
                                <div className="col-md-6 col-12 mt-md-0 mt-4"> <Input
                                    controllerPrefix={index}
                                    errorMessage={"Required"}
                                    control={control}
                                    required={true}
                                    rounded={true}
                                    width={"100%"}
                                    className='post-form-input'
                                    label={"Email"}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChangeWrapper}
                                    height={50}
                                /></div>
                            </div>
                        </div>

                        <div className='form-section'>
                            <div className='form-element-head'>Correspondence Address</div>
                            <AddressForm control={control} controllerPrefix={index} type="cor" formData={formData} handleChange={handleChangeWrapper} />
                        </div>

                        <div className='form-section'>
                            <div className='form-element-head'>Permanent Address</div>
                            <div className='owner-checkbox-cnt d-flex'>
                                <CheckBox controllerPrefix={index} className='owner-checkbox' onChange={handleChangeWrapper} name="permanentAddressSame" checked={formData.permanentAddressSame} /><span>Same as correspondence address</span>
                            </div>
                            {!formData.permanentAddressSame && <AddressForm
                                controllerPrefix={index}
                                control={control}
                                type="per"
                                formData={formData}
                                handleChange={handleChangeWrapper} />}
                        </div>

                        <div className='form-element-head'>KYC Details</div>
                        <div className="col-12 form-row">
                            <Input
                                controllerPrefix={index}
                                errorMessage={"Required"}
                                control={control}
                                required={true}
                                rounded={true}
                                width={"100%"}
                                minLength={12}
                                maxLength={12}
                                className='post-form-input'
                                label={"Aadhar No."}
                                name="aadhaarNo"
                                value={formData.aadhaarNo}
                                onChange={handleChangeWrapper}
                                height={50}
                            />
                        </div>
                        <DragDropFile uploadText="Upload Aadhaar Card" files={files} updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                        <div className="col-12 form-row">
                            <Input
                                controllerPrefix={index}
                                errorMessage={"Required"}
                                control={control}
                                required={true}
                                rounded={true}
                                width={"100%"}
                                minLength={10}
                                maxLength={10}
                                className='post-form-input'
                                label={"PAN No."}
                                name="panNo"
                                value={formData.panNo}
                                onChange={handleChangeWrapper}
                                height={50}
                            />
                        </div>
                        <DragDropFile uploadText="Upload PAN Card" files={files} updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                        <Heading label={"Photos and Signature"} />
                        <DragDropFile uploadText="Upload Photo" files={files} updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                        <DragDropFile uploadText="Add Signature" files={files} updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                        {/* <Heading label={"Nominee and Owner details"} />
                        <div className="row  form-row">
                            <div className="col-md-6 col-12">
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
                            <div className="col-md-6 col-12 mt-md-0 mt-4"> <Input
                                rounded={true}
                                width={"100%"}
                                className='post-form-input'
                                label={"Relation"}
                                name="nomineeRelation"
                                value={formData.nomineeRelation}
                                onChange={handleChange}
                                height={50}
                            /></div>
                        </div> */}
                    </div>)
                })}
            </div>
            <div className='form-row d-flex'>
                <span className='cursor-pointer ml-auto' onClick={addOwner}>+ Add Owner Details (maximum 3)</span>
            </div>

        </div>
        <Heading label={"Declaration"} />
        <div className='declaration-cnt d-flex align-items-start'>
            <CheckBox className='declaration' checked={declaration} onChange={handleFormChange} name="declaration" />
            <div className='declaration-txt'>"I, solemnly declare my understanding and agreement to the terms set forth in this Purchase Agreement for the property located at [Property Address]. I acknowledge that I have been provided with all necessary disclosures and information related to this transaction, and I am committed to fulfilling my obligations and responsibilities as outlined herein. This declaration represents my genuine intent to purchase the property, and I affirm that the information provided is accurate and complete to the best of my knowledge."</div>
        </div>
        <div className='d-flex justify-content-end'>
            <Button className="next-button" rounded={true} height={48} text={"Next"} onClick={handleSubmit(handleNext, onError)} />
        </div>
    </div >)
}