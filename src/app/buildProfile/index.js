"use client"
import './styles.scss'
import React from 'react'
import { Modal } from "@mui/material";
import { useQuery, useMutation } from 'react-query';
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
import { updateUserData } from '@/clients/userClient';
import { useSession } from "next-auth/react";
import { getCurrentUser } from '@/clients/authenticationAndLoginClient'
import BackdropLoader from '@/app/components/backdropLoader';
import SnackbarAlert from '@/app/components/snackbarAlert';

const regexMatches = [/\/search\/.*/, /\/buy\/project\/.*/, /\/buy\/property\/.*/]

export default ({ }) => {
    const searchParams = useSearchParams();
    const buildProfileModalEnabled = !!searchParams.get('buildProfile');
    const [modalEnabled, enableModal] = React.useState(buildProfileModalEnabled);
    const [timerDisabled, disableTimer] = React.useState(false);

    const router = useRouter();
    const { data: session, update } = useSession();
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
        presentStateId: "",
        presentCountryId: "",
        verificationCode:"",
        presentLocalityId:""
    });

    let { data: countries = [], isLoading } = useQuery({ enabled: !!session, queryKey: ['getAllCountries'], queryFn: () => getAllCountries() });

    let { data: presentStates = [] } = useQuery({ enabled: !!formData.presentCountryId && !!session, queryKey: ['getStateByCountry', formData.presentCountryId], queryFn: () => getStateByCountry(formData.presentCountryId) });

    let { data: presentCities = [] } = useQuery({ enabled: !!formData.presentStateId && !!session, queryKey: ['getCityByStateId', formData.presentStateId], queryFn: () => getCityByStateId(formData.presentStateId) });
    let { data: presentLocalities = [] } = useQuery({ enabled: !!formData.presentCityId, queryKey: ['getLocalityByCityId', formData.presentCityId], queryFn: () => getLocalityByCityId(formData.presentCityId) });

    let { data: userData = {}, isLoading: userDataLoading } = useQuery({
        enabled: !!session && !!session.token,
        queryKey: ['getCurrentUser', session],
        queryFn: () => getCurrentUser(session.token)
    });

    const { mutate, isLoading: sendingOtp, isError, isSuccess:otpSent } = useMutation(sendEmailVerificationOtp, {
        onError: (error) => {     
            if(typeof(error) == "string" && error.toLowerCase().indexOf("email") > -1) {
                setError("email", {
                    type: "manual",
                    message: error,
                })
            }
            else {
                handleErrorAlert(true)();
            }
        }    
    });

    const { mutate:updateUser, isLoading: updatingUser, error:updateUserError, isError:updateUserFailed, isSuccess:userUpdated } = useMutation(updateUserData, {
        onSuccess: data => {
            stopTimer();
            disableTimer(true);
            handleClose();
            update({firstName:formData.firstName, lastName:formData.lastName, email:formData.email});
        },
        onError: (error) => {            
            if(typeof(error) == "string" && error.toLowerCase().indexOf("otp") > -1) {
                setError("verificationCode", {
                    type: "manual",
                    message: error,
                })
            }
            else {
                handleErrorAlert(true)();
            }
        }    
    });


    const removeQueryParam = (param) => {
        let query = searchParams.entries();
        const params = new URLSearchParams(query);
        params.delete(param);
        router.replace(
            pathName
        );
    };


    const handleClose = () => {
        stopTimer();
        enableModal(false);
        removeQueryParam('buildProfile');
    }

    React.useEffect(() => {
        if (timerDisabled) {
            stopTimer();
        }
        else {
            startTimer();
        }
        return () => {
            stopTimer();
        };
    }, [session, timerDisabled, pathName]);



    const { control, handleSubmit, register, setValue, formState: { errors }, setError, reset } = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => {
            return formData;
        }, [formData])
    });

    React.useEffect(() => {
        if(!!userData && !!userData.id) {
            let data = {
                ...formData,
                ...userData
            }
            setFormData(data);
            reset(data);
        }
    }, [userData]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const sendOtp = async () => {
        if (!formData.email) {
            setError("email", {
                type: "manual",
                message: "Please enter the email",
            })
        }
        else {
            mutate({userId:userData.id,  email:formData.email});
        }
    }

    const submitUserDetails = () => {
        if(!otpSent && !formData.isEmailVerified){
            setError("email", {
                type: "manual",
                message: "Please verify your email"
            })
        }
        else {
            let requestData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: userData.phone,
                emailOTP: formData.verificationCode,               
                presentZipcode: formData.presentZipcode,
                addressLine1: formData.presentAddressLine1,
                addressLine2: formData.presentAddressLine2,
                presentLocalityId: formData.presentLocalityId
              }

            updateUser({data:requestData, accessToken:session?.token, userId:userData.id});            
        }
    }

    const startTimer = () => {
        if (!modalEnabled && !!session && !timerId && (!formData.isEmailVerified) && regexMatches.some(x => x.test(pathName))) {
            timerId = setTimeout(async () => {
                if (!modalEnabled) {
                    const userInfo = await getCurrentUser(session.token);
                    if (userInfo.firstName == "" || !userInfo.isEmailVerified) {
                        enableModal(true);
                    }
                    else {
                        stopTimer();
                    }
                }
            }, 10000);
        }
    }

    const handleErrorAlert = (open) => () => {
        setFormData((prevData) => ({ ...prevData, isError: open }))
    }


    const stopTimer = () => {
        if (!!timerId) {
            clearTimeout(timerId);
        }
    }



    return (<Modal
        open={modalEnabled || buildProfileModalEnabled}
        onClose={handleClose}
        className='build-profile-modal'
    >
        <div className='build-profile-form'>
            <BackdropLoader open={sendingOtp||updatingUser} />
            <CloseIcon width={30} height={30} className='position-absolute close-icon' role="button" onClick={handleClose} />
            <div className='heading text-center'>Build your profile</div>
            <div className='sub-heading text-center mt-1'>Complete all mandatory details before proceeding.</div>
            <div className='form mt-4 overflow-cnt'>
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
                        errorMessage={errors?.email?.message || "Required"}
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
                   {otpSent && <div className="form-row">
                        <Input
                            errorMessage={errors?.verificationCode?.message||"Required"}
                            control={control}
                            required={true}
                            rounded={true}
                            width={"100%"}
                            minLength={6}
                            maxLength={6}
                            isNumber={true}
                            className={`post-form-input mt-2`}
                            label={"Enter Verification Code"}
                            name="verificationCode"
                            value={formData.verificationCode}
                            onChange={handleChange}
                            height={50}

                        />
                    </div>}
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
                                cities: presentCities,
                                localities:presentLocalities
                            }
                        }}
                    />
                </div>
            </div>
            <Button className="next-button d-block ml-auto" rounded={true} height={40} text={"Save"} onClick={handleSubmit(submitUserDetails)} />
            <SnackbarAlert 
            autohide={true}
            handleClose={handleErrorAlert(false)}
            title={"Error"}
            message={"Something went wrong. Please try again later."}
            open={formData.isError} />
        </div>
    </Modal>)
}