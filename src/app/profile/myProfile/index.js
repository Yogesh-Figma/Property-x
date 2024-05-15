"use client"
import Image from 'next/image'
import React from 'react'
import Button from '@/app/components/button';
import Input from '@/app/components/input';
import { SUPPORTED_FILE_TYPE } from '@/app/components/ui/dragDropFile';
import EditPencil from "@/app/icons/edit_pencil.svg"
import './styles.scss'
import UserProfileForm from '../userProfileForm';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react"
import { updateUserProfile } from '@/clients/profileClient'
import { updateUserData } from '@/clients/userClient';
import { useAppContext } from '@/lib/appContext';
import { getAllCountries, getCityByStateId, getLocalityByCityId, getStateByCountry } from '@/clients/addressClient';
import SnackbarAlert from '@/app/components/snackbarAlert';
import { authOptions } from "@/lib/auth"
const ADDRESS_TYPES = ["permanent", "present"];

export default ({ userProfileData, refetchProfile }) => {
    const [files, setFilesState] = React.useState({});
    const { enableLoader } = useAppContext() || {};
    const { data: { user, token } = {}, update: updateSession } = useSession();
    const [formData, setFormData] = React.useState({
        panPhoto: userProfileData.panPhoto,
        aadharPhoto: userProfileData.aadharPhoto,
        disableBasicDataEdit: true,
        firstName: userProfileData.firstName,
        lastName: userProfileData.lastName,
        email: userProfileData.email,
        phone: userProfileData.phone,
        aadharNo: userProfileData.aadharNo,
        panNo: userProfileData.panNo,
        photo: userProfileData.photo,
        kycVerified: !!userProfileData.kycVerified,
        permanentZipcode: userProfileData.permanentZipcode || "",
        presentZipcode: userProfileData.presentZipcode || "",
        presentAddressLine1: userProfileData.presentAddressLine1 || "",
        presentAddressLine2: userProfileData.presentAddressLine2 || "",
        permanentAddressLine1: userProfileData.permanentAddressLine1 || "",
        permanentAddressLine2: userProfileData.permanentAddressLine1 || "",
        permanentCityId: userProfileData?.permanentAddress?.city?.id,
        permanentLocalityId: userProfileData?.permanentAddress?.id,
        permanentStateId: userProfileData?.permanentAddress?.city?.states?.id,
        permanentCountryId: userProfileData?.permanentAddress?.city?.states?.country?.id,
        presentCityId: userProfileData?.presentAddress?.city?.id,
        presentLocalityId: userProfileData?.presentAddress?.id,
        presentStateId: userProfileData?.presentAddress?.city?.states?.id,
        presentCountryId: userProfileData?.presentAddress?.city?.states?.country?.id,
        accountHolderName: userProfileData.accountHolderName,
        bankName: userProfileData.bankName,
        branchName: userProfileData.branchName,
        accountNumber: userProfileData.accountNumber,
        ifsc: userProfileData.ifsc,
        permanentAddressSame: false,
        isError: false
    });

    const profilePicRef = React.useRef(null);

    let { data: countries = [], isLoading } = useQuery({ queryKey: ['getAllCountries'], queryFn: () => getAllCountries() });

    let { data: permanentStates = [] } = useQuery({ enabled: !!formData.permanentCountryId, queryKey: ['getStateByCountry', formData.permanentCountryId], queryFn: () => getStateByCountry(formData.permanentCountryId) });

    let { data: permanentCities = [] } = useQuery({ enabled: !!formData.permanentStateId, queryKey: ['getCityByStateId', formData.permanentStateId], queryFn: () => getCityByStateId(formData.permanentStateId) });

    let { data: permanentLocalities = [] } = useQuery({ enabled: !!formData.permanentCityId, queryKey: ['getLocalityByCityId', formData.permanentCityId], queryFn: () => getLocalityByCityId(formData.permanentCityId) });
    let { data: presentStates = [] } = useQuery({ enabled: !!formData.presentCountryId, queryKey: ['getStateByCountry', formData.presentCountryId], queryFn: () => getStateByCountry(formData.presentCountryId) });

    let { data: presentCities = [] } = useQuery({ enabled: !!formData.presentStateId, queryKey: ['getCityByStateId', formData.presentStateId], queryFn: () => getCityByStateId(formData.presentStateId), });

    let { data: presentLocalities = [] } = useQuery({ enabled: !!formData.presentCityId, queryKey: ['getLocalityByCityId', formData.presentCityId], queryFn: () => getLocalityByCityId(formData.presentCityId) });

    const handleChange = (event) => {
        const { name, value } = event.target;
        let addressObjCleanup = {};
        for (let type of ADDRESS_TYPES) {
            if (name == `${type}CountryId`) {
                addressObjCleanup[`${type}StateId`] = "";
                addressObjCleanup[`${type}CityId`] = "";
                addressObjCleanup[`${type}LocalityId`] = "";
            }
            if (name == `${type}StateId`) {
                addressObjCleanup[`${type}CityId`] = "";
                addressObjCleanup[`${type}LocalityId`] = "";
            }
            if (name == `${type}CityId`) {
                addressObjCleanup[`${type}LocalityId`] = "";
            }
        }
        setValue(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value, ...addressObjCleanup }));
    }

    const setFiles = (name, files) => {
        setFilesState((prevFormData) => ({ ...prevFormData, [name]: files }));
    }

    const handleSnackBar = (open, isSuccess, isError) => {
        setFormData((prevData) => ({ ...prevData, isOpen: open, isSuccess, isError }))
    }


    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => {
            return formData;
        }, [formData])
    });

    const uploadFile = async (files, customPath) => {
        const formData = new FormData();
        for (let file of files) {
            formData.append("files", file);
        }
        formData.append("userId", userProfileData.id);
        formData.append("customPath", customPath);
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        return response.json();
    }

    const handleNext = async () => {
        try {
            enableLoader(true);
            let { panPhoto, aadharPhoto, photo } = formData;
            if (files.aadharImage) {
                const res = await uploadFile(files.aadharImage, "aadharImage");
                aadharPhoto = res[0];
            }
            if (files.panImage) {
                const res = await uploadFile(files.panImage, "panImage");
                panPhoto = res[0];
            }
            if (files.photo) {
                const res = await uploadFile(files.photo, "profilePhoto");
                photo = res[0];
            }

            let requestJson = {
                "image": photo,
                "pan": formData.panNo,
                "aadhar": formData.aadharNo,
                "panPhoto": panPhoto,
                "aadharPhoto": aadharPhoto,
                "kycVerified": userProfileData.kycVerified,
                "presentZipcode": formData.presentZipcode,
                "permanentZipcode": formData.permanentAddressSame ? formData.presentZipcode : formData.permanentZipcode,
                "addressLine1": formData.presentAddressLine1,
                "addressLine2": formData.presentAddressLine2,
                "permanentAddressLine1": formData.permanentAddressSame ? formData.presentAddressLine1 : formData.permanentAddressLine1,
                "permanentAddressLine2": formData.permanentAddressSame ? formData.presentAddressLine2 : formData.permanentAddressLine2,
                "permanentLocalityId": formData.permanentAddressSame ? formData.presentLocalityId : formData.permanentLocalityId,
                "presentLocalityId": formData.presentLocalityId,
                "accountHolderName": formData.accountHolderName,
                "branchName": formData.branchName,
                "accountNumber": formData.accountNumber,
                "ifsc": formData.ifsc,

            }
            // if(!formData.disableBasicDataEdit) {
            //     await updateUserData({ data: userBasicData, accessToken: token, userId: user.id });
            // }
            await updateUserProfile(user.id, requestJson, token);
            handleSnackBar(true, true, false);
            refetchProfile();
            updateSession({ photo: photo });
        }
        catch (e) {
            console.log("error", e);
            handleSnackBar(true, false, true);
        }
        finally {
            enableLoader(false)
        }
    }

    const onError = (errors, e) => console.log(errors, e)

    const onProfileEditClick = () => {
        profilePicRef.current.click();
    };

    const handleProfileImageChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFiles("photo", e.target.files)
        }
    };

    return (<div className='my-profile'>
        <div className="profile-pic position-relative">
            <Image alt="profile pic" src={!!files.photo ? URL.createObjectURL(files.photo[0]) : userProfileData.photo || "/user.png"} width={120} height={120} />
            <EditPencil className='edit-pencil position-absolute cursor-pointer' onClick={onProfileEditClick} />
            <input className='d-none' ref={profilePicRef} type="file" id="profile-image-upload" multiple={false} onChange={handleProfileImageChange} accept={[SUPPORTED_FILE_TYPE.image]} />
        </div>
        <div className='form profile-form'>
            <UserProfileForm
                disableBasicDataEdit={formData.disableBasicDataEdit}
                files={files}
                setFiles={setFiles}
                control={control}
                handleChange={handleChange}
                formData={formData}
                countries={countries}
                handleSubmit={handleSubmit}
                addressData={{
                    "permanent": {
                        states: permanentStates,
                        cities: permanentCities,
                        localities: permanentLocalities
                    }, "present": {
                        states: presentStates,
                        cities: presentCities,
                        localities: presentLocalities
                    }
                }}

            />
            <div className='additional-form-details form-section post-form-input'>
                <div className='form-element-head'>Account Details</div>
                <div className="row form-row">
                    <div className='col-md-6 col-12'>
                        <Input
                            width={"100%"}
                            errorMessage={"Required"}
                            control={control}
                            rounded={true}
                            maxLength={20}
                            className='post-form-input'
                            label={"Account No."}
                            name="accountNumber"
                            isNumber={true}
                            value={formData.accountNumber}
                            onChange={handleChange}
                            height={50}
                        />
                    </div>
                    <div className='col-md-6 col-12 mt-md-0 mt-2'>
                        <Input
                            width={"100%"}
                            errorMessage={"Required"}
                            control={control}
                            rounded={true}
                            className='post-form-input'
                            label={"Account Holder Name"}
                            name="accountHolderName"
                            value={formData.accountHolderName}
                            onChange={handleChange}
                            height={50}
                        />
                    </div>
                </div>
                <div className="row form-row">
                    <div className='col-md-6 col-12'>
                        <Input
                            width={"100%"}
                            errorMessage={"Invalid"}
                            control={control}
                            rounded={true}
                            pattern={/^[A-Z]{4}0[A-Z0-9]{6}$/}
                            className='post-form-input'
                            label={"IFSC Code"}
                            name="ifsc"
                            value={formData.ifsc}
                            onChange={handleChange}
                            height={50}
                        />
                    </div>
                    <div className='col-md-6 col-12 mt-md-0 mt-2'>
                        <Input
                            width={"100%"}
                            errorMessage={"Required"}
                            control={control}
                            rounded={true}
                            className='post-form-input'
                            label={"Bank Name"}
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            height={50}
                        />
                    </div>
                </div>
                <div className='col-md-6 col-12 mt-md-0 mt-2'>
                        <Input
                            width={"100%"}
                            errorMessage={"Required"}
                            control={control}
                            rounded={true}
                            className='post-form-input'
                            label={"Branch Name"}
                            name="branchName"
                            value={formData.branchName}
                            onChange={handleChange}
                            height={50}
                        />
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-end'>
            <Button rounded={true} height={40} text={"Update Information"} onClick={handleSubmit(handleNext, onError)} />
        </div>
        <SnackbarAlert
            severity={formData.isError ? "error" : "success"}
            autohide={true}
            handleClose={() => handleSnackBar(false)}
            title={formData.isError ? "Error" : "Success"}
            message={formData.isError ? "Something went wrong. Please try again later." : "Profile updated successfully"}
            open={formData.isError || formData.isSuccess} />
    </div>)
}