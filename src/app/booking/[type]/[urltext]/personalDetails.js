import React from 'react';
import Heading from "@/app/components/heading";
import Input from '@/app/components/input';
import PaymentSummary from './paymentSummary';
import DragDropFile, { SUPPORTED_FILE_TYPE } from '@/app/components/ui/dragDropFile';
import CheckBox from '@/app/components/checkbox';
import Button from "@/app/components/button";
import { useForm } from "react-hook-form";
import UserProfileForm from '@/app/profile/userProfileForm';
import { useQuery } from 'react-query';
import UserDetails from './userDetails';
import { getAllCountries } from '@/clients/addressClient';
import SnackbarAlert from '@/app/components/snackbarAlert';

export default ({ data, personalData, changeStep, handlePersonalDetails, addOwner, declaration, handleFormChange, selectedProperty }) => {

    const [error, hasError] = React.useState(false);

    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur"
    });

    const handleNext = () => {
        changeStep(2);
    }

    const onError = (errors, e) => hasError(true);

    let { data: countries = [], isLoading } = useQuery({ queryKey: ['getAllCountries'], queryFn: () => getAllCountries() });
    

    return (<div className="personal-details">
        <div className="row">
            <div className="col-xl-5 col-12">
                <PaymentSummary variant="vertical" data={selectedProperty||data} />
            </div>
            <div className="col-xl-7 col-12">
                <Heading label={"Add Your Details"} />
                {(personalData || []).map((formData, index) => {
                    return (<UserDetails handlePersonalDetails={handlePersonalDetails} formData={formData} index={index} control={control} countries={countries} setValue={setValue} />)})}
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
        <SnackbarAlert autohide={true}
            handleClose={()=>hasError(false)}
            title={"Error"}
            message={"Fill all required info."}
            open={error} />
    </div >)
}