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
import { useSearchParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { InputAdornment } from "@mui/material";
import { getAllCountries } from '@/clients/addressClient';
import { sendEmailVerificationOtp, verifyEmailOtp } from '@/clients/verificationClient';
import { useSession } from "next-auth/react";
import { getCurrentUser } from '@/clients/authenticationAndLoginClient' 

const regexMatches = [/\/search\/.*/, /\/buy\/project\/.*/, /\/buy\/property\/.*/]

export default ({ }) => {
    const searchParams = useSearchParams();
    const buildProfileModalEnabled = !!searchParams.get('buildProfile');
    const [ modalEnabled, enableModal] = React.useState(buildProfileModalEnabled);
    const router = useRouter();
    const { data: session } = useSession();
    const pathName = usePathname();
    let timerId;
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",      
        presentZipcode: "",
        presentAddressLine1: "",
        presentAddressLine2: "",
        presentCityId: "",
        presentLocalityId: "",
        presentStateId: "",
        presentCountryId: ""
    });

    let { data: countries = [], isLoading } = useQuery({ queryKey: ['getAllCountries'], queryFn: () => getAllCountries() });

    let { data: presentStates = [] } = useQuery({ enabled: !!formData.presentCountryId, queryKey: ['getStateByCountry', formData.presentCountryId], queryFn: () => getStateByCountry(formData.presentCountryId) });

    let { data: presentCities = [] } = useQuery({ enabled: !!formData.presentStateId, queryKey: ['getCityByStateId', formData.presentStateId], queryFn: () => getCityByStateId(formData.presentStateId) });

    let { data: userData = {}, isLoading:userDataLoading } = useQuery({
        enabled: !!session && !!session.token,
         queryKey: ['getCurrentUser', session], 
         queryFn: () => getCurrentUser(session.token) });

    React.useEffect(() => {
        let data = {
            firstName: userData.firstName||"",
            lastName: userData.lastName||"",
            email: userData.email||"",
            isEmailVerified:userData.isEmailVerified||""
        }
        setFormData({...formData, ...data});
      }, [userData]);


    const handleClose = () => {
        if(!formData.isEmailVerified) {
        }
        else {
            stopTimer();
        }
        enableModal(false);
        router.back();
    }

    React.useEffect(() => {
        startTimer();
        return () => {
            stopTimer();
        };
      }, [session]);



    const { control, handleSubmit, register, setValue, formState: { errors }, setError } = useForm({
        reValidateMode: "onBlur"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const sendOtp = () => {
        if (!formData.email) {
            setError("email", {
                type: "manual",
                message: "Please enter the email",
            })
        }
        else {
            sendEmailVerificationOtp(formData.email);
        }
    }

    const submitUserDetails = () => {
        setFormData((prevFormData) => ({ ...prevFormData, isVerified: true }));
    }

    const startTimer = () => {
        if (!modalEnabled && !!session && !timerId && regexMatches.some(x=> x.test(pathName))) {
            console.log("setting timer");
            timerId = setInterval(async () => {
                if(!modalEnabled) {
                    const userInfo = await getCurrentUser(session.token);
                    console.log("userInfo", userInfo)
                    if(userInfo.firstName == "" || !userInfo.isEmailVerified){
                        enableModal(true);        
                    }
                    else {
                        stopTimer();
                    }
                }
            }, 10000);
        }
    }

    const stopTimer = () => {
        if(!!timerId) {
            clearInterval(timerId);
        }
    }



    return (<Modal
        open={modalEnabled || buildProfileModalEnabled}
        onClose={handleClose}
        className='build-profile-modal'
    >
        <div className='build-profile-form'>
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
                            <div className='verify-txt text-decoration-underline cursor-pointer' onClick={sendOtp}>Verify</div>
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
                            value={formData.verificationCode}
                            onChange={handleChange}
                            height={50}

                        />
                    </div>
                </div>

                <div className='form-section'>
                    <div className="sub-info">Current Address</div>
                    <AddressForm
                        register={register}
                        control={control}
                        type="present"
                        formData={formData}
                        handleChange={handleChange}
                        countries={countries}
                        addressData={{
                            "present": {
                                states: presentStates,
                                cities: presentCities
                            }
                        }}
                    />
                </div>
            </div>
            <Button className="next-button d-block ml-auto" rounded={true} height={40} text={"Save"} onClick={handleSubmit(submitUserDetails)} />
        </div>
    </Modal>)
}