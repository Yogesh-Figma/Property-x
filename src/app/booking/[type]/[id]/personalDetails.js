import React from 'react';
import Heading from "@/app/components/heading";
import Input from '@/app/components/input';
import PaymentSummary from './paymentSummary';
import DragDropFile, { SUPPORTED_FILE_TYPE } from '@/app/components/ui/dragDropFile';
import CheckBox from '@/app/components/checkbox';
import Button from "@/app/components/button";
import { useForm } from "react-hook-form";
import UserProfileForm from '@/app/profile/userProfileForm';
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
                <PaymentSummary variant="vertical" data={data} />
            </div>
            <div className="col-xl-7 col-12">
                <Heading label={"Add Your Details"} />
                {(personalData || []).map((formData, index) => {

                    const handleChangeWrapper = (event) => {
                        const { name, value } = event.target;
                        setValue((index || "") + name, value);
                        handlePersonalDetails(index, event)
                    }

                    return (
                        <div>
                            <div className='owner-checkbox-cnt d-flex'>
                                <CheckBox onChange={handleChangeWrapper} name="owner" checked={formData.owner} className='owner-checkbox' /><span>I am the Owner</span>
                            </div>
                            <UserProfileForm files={files} setFiles={setFiles} control={control} handleChange={handleChangeWrapper} formData={formData} index={index} />
                            <Heading label={"Photos and Signature"} />
                            <DragDropFile uploadText="Upload Photo" updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                            <DragDropFile uploadText="Add Signature" updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />

                        </div>
                    )
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