import React from 'react';
import Input from '@/app/components/input';

const AddressForm = ({ type = "", formData, handleChange, control, controllerPrefix }) => {
    return (<>
        <div className='form-row'>
            <Input
                controllerPrefix={controllerPrefix}
                errorMessage={"Required"}
                control={control}
                required={true}
                rounded={true}
                width={"100%"}
                className='post-form-input'
                label={"Address line 1"}
                name={`${type}addressline1`}
                value={formData[`${type}addressline1`]}
                onChange={handleChange}
                height={50}
            />
        </div>
        <div className='form-row'>
            <Input
                controllerPrefix={controllerPrefix}
                errorMessage={"Required"}
                control={control}
                required={true}
                rounded={true}
                width={"100%"}
                className='post-form-input'
                label={"Address line 2"}
                name={`${type}addressline2`}
                value={formData[`${type}addressline2`]}
                onChange={handleChange}
                height={50}
            />
        </div>
        <div className="row form-row">
            <div className="col-md-6 col-12">
                <Input
                    controllerPrefix={controllerPrefix}
                    errorMessage={"Required"}
                    control={control}
                    required={true}
                    rounded={true}
                    width={"100%"}
                    className='post-form-input'
                    label={"Country"}
                    name={`${type}country`}
                    value={formData[`${type}country`]}
                    onChange={handleChange}
                    height={50}
                />
            </div>
            <div className="col-md-6 col-12 mt-md-0 mt-4">
                <Input
                    controllerPrefix={controllerPrefix}
                    errorMessage={"Required"}
                    control={control}
                    required={true}
                    rounded={true}
                    width={"100%"}
                    className='post-form-input'
                    label={"State"}
                    name={`${type}state`}
                    value={formData[`${type}state`]}
                    onChange={handleChange}
                    height={50}
                />
            </div>
        </div>
        <div className="row form-row">
            <div className="col-md-6 col-12">
                <Input
                    controllerPrefix={controllerPrefix}
                    errorMessage={"Required"}
                    control={control}
                    required={true}
                    rounded={true}
                    width={"100%"}
                    className='post-form-input'
                    label={"City"}
                    name={`${type}city`}
                    value={formData[`${type}city`]}
                    onChange={handleChange}
                    height={50}
                />
            </div>
            <div className="col-md-6 col-12 mt-md-0 mt-4"> <Input
                controllerPrefix={controllerPrefix}
                minLength={6}
                maxLength={6}
                isNumber={true}
                errorMessage={"Required"}
                control={control}
                required={true}
                rounded={true}
                width={"100%"}
                className='post-form-input'
                label={"Zip Code"}
                name={`${type}zipcode`}
                value={formData[`${type}zipcode`]}
                onChange={handleChange}
                height={50}
            /></div>
        </div></>)
}

export default AddressForm;