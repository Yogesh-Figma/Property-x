"use client"
import React from 'react';
import Heading from "@/app/components/heading";
import Input from '@/app/components/input';
import DragDropFile, { SUPPORTED_FILE_TYPE } from '@/app/components/ui/dragDropFile';
import CheckBox from '@/app/components/checkbox';
import AddressForm from './addressForm';
import './styles.scss'
export default ({ files, disableBasicDataEdit, setFiles, handleChange, formData, index = "", control, countries,
    addressData }) => {
    return (<div className='profile-form'>
        <div className='form-section'>
            <div className='form-element-head'>Personal Details</div>
            <div className="row form-row">
                <div className="col-md-6 col-12">
                    <Input
                        disabled={disableBasicDataEdit}
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
                        onChange={handleChange}
                        height={50}
                    />
                </div>
                <div className="col-md-6 col-12 mt-md-0 mt-4">
                    <Input
                        disabled={disableBasicDataEdit}
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
                        onChange={handleChange}
                        height={50}
                    />
                </div>
            </div>
            <div className="row form-row">
                <div className="col-md-6 col-12">
                    <Input
                        disabled={disableBasicDataEdit}
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
                        onChange={handleChange}
                        height={50}
                    />
                </div>
                <div className="col-md-6 col-12 mt-md-0 mt-4"> <Input
                    disabled={disableBasicDataEdit}
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
                    onChange={handleChange}
                    height={50}
                /></div>
            </div>
        </div>

        <div className='form-section'>
            <div className='form-element-head'>Correspondence Address</div>
            <AddressForm
                control={control}
                controllerPrefix={index}
                type="present"
                formData={formData}
                handleChange={handleChange}
                countries={countries}
                addressData={addressData}
            />
        </div>

        <div className='form-section'>
            <div className='form-element-head'>Permanent Address</div>
            <div className='owner-checkbox-cnt d-flex'>
                <CheckBox controllerPrefix={index} className='owner-checkbox' onChange={handleChange} name="permanentAddressSame" checked={formData.permanentAddressSame} /><span>Same as correspondence address</span>
            </div>
            {!formData.permanentAddressSame && <AddressForm
                controllerPrefix={index}
                control={control}
                type="permanent"
                formData={formData}
                handleChange={handleChange}
                countries={countries}
                addressData={addressData}
            />}
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
                label={"Aadhaar No."}
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                height={50}
            />
        </div>
        <DragDropFile uploadText="Upload Aadhaar Card" updateFilesCb={(files) => setFiles("aadharImage", files)} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
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
                onChange={handleChange}
                height={50}
            />
        </div>
        <DragDropFile uploadText="Upload PAN Card" updateFilesCb={(files) => setFiles("panImage", files)} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
    </div>)
}