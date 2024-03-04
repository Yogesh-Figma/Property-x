"use client"
import React from 'react';
import Input from '@/app/components/input';
import { useQuery } from 'react-query';
import DropDown from '@/app/components/dropDown';


const AddressForm = ({ type = "", formData, handleChange, control, controllerPrefix, countries = [],
    addressData={} }) => {


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
                name={`${type}AddressLine1`}
                value={formData[`${type}AddressLine1`]}
                onChange={handleChange}
                height={50}
            />
        </div>
        <div className='form-row'>
            <Input
                controllerPrefix={controllerPrefix}
                errorMessage={"Required"}
                control={control}
                required={false}
                rounded={true}
                width={"100%"}
                className='post-form-input'
                label={"Address line 2"}
                name={`${type}AddressLine2`}
                value={formData[`${type}AddressLine2`]}
                onChange={handleChange}
                height={50}
            />
        </div>
        <div className="row form-row">
            <div className="col-md-6 col-12">
                <DropDown
                    name={`${type}CountryId`}
                    value={formData[`${type}CountryId`]}
                    controllerPrefix={controllerPrefix}
                    errorMessage={"Required"}
                    className={"post-form-input selection-dropdown fill-dropdown"}
                    label={"Country"}
                    height={50}
                    handleChange={(event) => handleChange({ target: { name: `${type}CountryId`, value: event.target.value } })}
                    values={countries || []}
                />
            </div>
            <div className="col-md-6 col-12 mt-md-0 mt-4">
                <DropDown
                    name={`${type}StateId`}
                    value={formData[`${type}StateId`]}
                    controllerPrefix={controllerPrefix}
                    errorMessage={"Required"}
                    className={"post-form-input selection-dropdown fill-dropdown"}
                    label={"State"}
                    height={50}
                    handleChange={(event) => handleChange({ target: { name: `${type}StateId`, value: event.target.value } })}
                    values={addressData[type]?.states || []}
                />
            </div>
        </div>
        <div className="row form-row">
            <div className="col-md-6 col-12">
                <DropDown
                    name={`${type}CityId`}
                    value={formData[`${type}CityId`]}
                    controllerPrefix={controllerPrefix}
                    errorMessage={"Required"}
                    className={"post-form-input selection-dropdown fill-dropdown"}
                    label={"City"}
                    height={50}
                    handleChange={(event) => handleChange({ target: { name: `${type}CityId`, value: event.target.value } })}
                    values={addressData[type]?.cities || []}
                />
            </div>
            {addressData[type]?.localities && <div className="col-md-6 col-12 mt-md-0 mt-4">
                <DropDown
                    name={`${type}LocalityId`}
                    value={formData[`${type}LocalityId`]}
                    controllerPrefix={controllerPrefix}
                    errorMessage={"Required"}
                    className={"post-form-input selection-dropdown fill-dropdown"}
                    label={"Locality"}
                    height={50}
                    handleChange={(event) => handleChange({ target: { name: `${type}LocalityId`, value: event.target.value } })}
                    values={addressData[type]?.localities || []}
                />
            </div>}
            <div className={`col-md-6 col-12 ${!!addressData[type]?.localities? "mt-4":""}`}> <Input
                controllerPrefix={controllerPrefix}
                minLength={6}
                maxLength={6}
                isNumber={true}
                errorMessage={"Invalid zipcode"}
                control={control}
                required={true}
                rounded={true}
                width={"100%"}
                className='post-form-input'
                label={"Zip Code"}
                name={`${type}Zipcode`}
                value={formData[`${type}Zipcode`]}
                onChange={handleChange}
                height={50}
            /></div>
        </div>
    </>)
}

export default AddressForm;