import React from 'react';
import { Modal } from "@mui/material";
import Radio from '@mui/material/Radio';
import DragDropFile, { SUPPORTED_FILE_TYPE } from '@/app/components/ui/dragDropFile';
import Input from '@/app/components/input';
import { useForm } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Heading from "@/app/components/heading";
import Button from "@/app/components/button";
import CloseIcon from '@/app/icons/icon_close-small.svg'
import './paymentMethod.scss'

export default ({ paymentModalEnabled, handleClose, handleChange, formData, save }) => {
    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur"
    });

    const handleInputChange = (event) => {
        const { name, value, originalName } = event.target;
        setValue(originalName||name, value);
        handleChange(event);
    };

    return (<Modal
        open={paymentModalEnabled}
        onClose={handleClose}
        className='payment-modal'
    >
        <div className='payment-cnt position-relative'>
        <CloseIcon width={30} height={30} className='position-absolute close-icon' role="button" onClick={handleClose} />
            <div className='mb-5 d-flex align-items-center flex-column'>
                <div className="heading">Select Payment Method</div>
                <div className="sub-heading">Choose the method to raise payment request</div>
            </div>
            <div className="payment-options mb-4">
                <RadioGroup
                    name="selectedPaymentMethod"
                    className='d-flex flex-row'
                    value={formData.selectedPaymentMethod}
                    onChange={handleInputChange}
                >
                    <FormControlLabel value="cheque" control={<Radio />} label="Cheque" />
                    <FormControlLabel value="rtgs" control={<Radio />} label="RTGS/NEFT" />
                </RadioGroup>
            </div>
            {formData.selectedPaymentMethod == 'cheque' && <div className="cheque-detail-cnt">
                <Heading label="Cheque Details" className="" />
                <div className='mt-4 mb-1'>Upload Cheque</div>
                <DragDropFile uploadText=" "
                    errors={errors}
                    register={register}
                    errorMessage={"Required"}
                    name="chequeImg"
                    updateFilesCb={(files) => handleInputChange({ target:{name: "paymentDetails.chequeImg", originalName:"chequeImg", value: files[0]} })}
                    supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
                <div className="form-element-heading mt-4 mb-1">Cheque No.</div>
                <Input
                    control={control}
                    rounded={true}
                    width={"100%"}
                    required={true}
                    errorMessage={"Required"}
                    className='post-form-input'
                    label={"Enter cheque no."}
                    name="paymentDetails.chequeNo"
                    value={formData.paymentDetails.chequeNo}
                    onChange={handleInputChange}
                    height={50}
                    isNumber={true}
                />
            </div>}
            {formData.selectedPaymentMethod == 'rtgs' &&
                <div className="rtgs-detail">
                    <Heading label="Developer Account Details" className="" />
                    <div className="row mt-3"><div className="col-6">Account No.:</div><div className="col-6">12345674123345</div></div>
                    <div className="row mt-3"><div className="col-6">Account Holder Name:</div><div className="col-6">TEST TEST</div></div>
                    <div className="row mt-3"><div className="col-6">IFSC Code:</div><div className="col-6">ABCD0123456</div></div>
                    <div className="row mt-3 mb-4"><div className="col-6">Branch Address:</div><div className="col-6">Connaught Place, New Delhi</div></div>
                    <Heading label="RTGS/NEFT Details" className="" />
                    <div className="form-element-heading mt-4 mb-1">UTR Number</div>
                    <Input
                        control={control}
                        rounded={true}
                        width={"100%"}
                        required={true}
                        errorMessage={"Required"}
                        className='post-form-input'
                        label={"Enter UTR Number"}
                        name="paymentDetails.utrNo"
                        value={formData.paymentDetails.utrNo}
                        onChange={handleInputChange}
                        height={50}
                        isNumber={true}
                    />
                </div>}
            <div className="d-flex align-item-center justify-content-end mt-3">
                <Button variant="outlined-noborder" className="overview-btn me-2" rounded={true} height={40} text={"Skip"} onClick={handleClose} />
                <Button className="save-button" rounded={true} height={40} text={"Save"} onClick={handleSubmit(save, ()=>{})} />
            </div>
        </div>

    </Modal>)
}