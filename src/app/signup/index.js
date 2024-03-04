"use client"
import './styles.scss'
import React from 'react'
import { Modal } from "@mui/material";
import { useQuery } from 'react-query';
import CloseIcon from '@/app/icons/icon_close-small.svg'
import Button from "@/app/components/button";
import Input from '@/app/components/input';
import AddressForm from '@/app/profile/userProfileForm/addressForm';
import { useForm } from "react-hook-form";
import { getCityByStateId, getLocalityByCityId, getStateByCountry } from '@/clients/addressClient';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { InputAdornment } from "@mui/material";

export default ({ }) => {
    const searchParams = useSearchParams();
    const signupModalEnabled = !!searchParams.get('signup');
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        presentZipcode: "",
        presentAddressLine1: "",
        presentAddressLine2: "",
        presentCityId: "",
        presentLocalityId: "",
        presentStateId: "",
        presentCountryId: ""
    });

    let { data: countries = [], isLoading } = useQuery({ queryKey: ['getAllCountries'], queryFn: () => getAllCountries() });

    let { data: presentStates = [] } = useQuery({ enabled: !!formData.presentCountryId, queryKey: ['getStateByCountry', formData.presentCountryId], queryFn: () => getStateByCountry(formData.permanentCountryId) });

    let { data: presentCities = [] } = useQuery({ enabled: !!formData.presentStateId, queryKey: ['getCityByStateId', formData.presentStateId], queryFn: () => getCityByStateId(formData.permanentStateId) });


    const handleClose = () => {
        router.back();
    }

    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    return (<Modal
        open={signupModalEnabled}
        onClose={handleClose}
        className='signup-modal'
    >
        <div className='signup-form'>
            <CloseIcon width={30} height={30} className='position-absolute close-icon' role="button" onClick={handleClose} />
            <div className='heading text-center'>Build your profile</div>
            <div className='sub-heading text-center mt-1'>Complete all mandatory details before proceeding.</div>
            <div className='form mt-4'>
                <div className="form-section">
                    <div className="sub-info">First Name</div>
                    <Input
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

                <div className="form-section">
                    <div className="sub-info">Last Name</div>
                    <Input
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
                <div className="form-section">
                    <div className="sub-info">Email</div>
                    <Input
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
                        endAdornment={<InputAdornment position="end">
                            <div className='verify-txt text-decoration-underline'>Verify</div>
                        </InputAdornment>}

                    />
                    <div className="form-row">
                        <Input
                            errorMessage={"Required"}
                            control={control}
                            required={true}
                            rounded={true}
                            width={"100%"}
                            className='post-form-input mt-2'
                            label={"Enter Verification Code"}
                            name="verificationCode"
                            value={formData.email}
                            onChange={handleChange}
                            height={50}

                        />
                    </div>
                </div>

                <div className='form-section'>
                    <div className="sub-info">Current Address</div>
                    <AddressForm
                        control={control}
                        type=""
                        formData={formData}
                        handleChange={handleChange}
                        countries={countries}
                        addressData={{
                            "": {
                                states: presentStates,
                                cities: presentCities
                            }
                        }}
                    />
                </div>
            </div>
            <Button className="next-button d-block ml-auto" rounded={true} height={40} text={"Save"} onClick={() => { }} />
        </div>
    </Modal>)
}