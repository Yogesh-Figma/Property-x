"use client"
import Image from 'next/image'
import React from 'react'
import Button from '@/app/components/button';
import Input from '@/app/components/input';
import EditPencil from "@/app/icons/edit_pencil.svg"
import './styles.scss'
import UserProfileForm from '../userProfileForm';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react"
import { updateUserProfile } from '@/clients/profileClient'
import { useAppContext } from '@/lib/appContext';
import { getAllCountries, getCityByStateId, getLocalityByCityId, getStateByCountry } from '@/clients/addressClient';
const ADDRESS_TYPES = ["permanent", "present"];

export default ({ userProfileData }) => {
    const [files, setFilesState] = React.useState({});
    const { enableLoader } = useAppContext() || {};
    const { data: { user, token } } = useSession();
    const [formData, setFormData] = React.useState({
        firstName: userProfileData.firstName,
        lastName: userProfileData.lastName,
        email: userProfileData.email,
        mobileNo: userProfileData.mobileNo,
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
        permanentAddressSame: false
    });

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


    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => {
            return formData;
        }, [formData])
    });

    const uploadFile = async (files) => {
        const formData = new FormData();
        for (let file of files) {
            formData.append("files", file);
        }
        formData.append("userId", userProfileData.id);
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        return response.json();
    }

    const handleNext = async () => {
        try {
            enableLoader(true);
            let panPhoto, aadharPhoto;
            if (files.aadharImage) {
                const res = await uploadFile(files.aadharImage);
                aadharPhoto = res[0];
            }
            if (files.panImage) {
                const res = await uploadFile(files.panImage);
                panPhoto = res[0];
            }
            let requestJson = {
                "pan": formData.panNo,
                "aadhar": formData.aadharNo,
                "panPhoto": panPhoto,
                "aadharPhoto": aadharPhoto,
                "kycVerified": userProfileData.kycVerified,
                "presentZipcode": formData.presentZipcode,
                "permanentZipcode": formData.permanentAddressSame? formData.presentZipcode: formData.permanentZipcode,
                "addressLine1": formData.presentAddressLine1,
                "addressLine2": formData.presentAddressLine2,
                "permanentAddressLine1": formData.permanentAddressSame? formData.presentAddressLine1:formData.permanentAddressLine1,
                "permanentAddressLine2": formData.permanentAddressSame? formData.presentAddressLine2:formData.permanentAddressLine2,
                "permanentLocalityId": formData.permanentAddressSame ? formData.presentLocalityId : formData.permanentLocalityId,
                "presentLocalityId": formData.presentLocalityId
            }
            await updateUserProfile(user.id, requestJson, token);
        }
        catch (e) { }
        finally {
            enableLoader(false)
        }
    }

    const onError = (errors, e) => console.log(errors, e)


    return (<div className='my-profile'>
        <div className="profile-pic position-relative">
            <Image src={"/propertyStatsImg.jpeg"} width={120} height={120} />
            <EditPencil className='edit-pencil position-absolute cursor-pointer' />
        </div>
        <div className='form'>
            <UserProfileForm
                disableBasicDataEdit={true}
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
        </div>
        <div className='d-flex justify-content-end'>
            <Button rounded={true} height={40} text={"Update Information"} onClick={handleSubmit(handleNext, onError)} />
        </div>
    </div>)
}