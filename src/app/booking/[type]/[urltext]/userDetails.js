import React from 'react';
import Heading from "@/app/components/heading";
import DragDropFile, { SUPPORTED_FILE_TYPE } from '@/app/components/ui/dragDropFile';
import CheckBox from '@/app/components/checkbox';
import UserProfileForm from '@/app/profile/userProfileForm';
import { useQuery } from 'react-query';
import { getCityByStateId, getLocalityByCityId, getStateByCountry } from '@/clients/addressClient';

export default ({  handlePersonalDetails, formData, index, setFiles, control, countries, setValue }) => {


    let { data: permanentStates = [] } = useQuery({ enabled: !!formData.permanentCountryId, queryKey: ['getStateByCountry', formData.permanentCountryId], queryFn: () => getStateByCountry(formData.permanentCountryId) });

    let { data: permanentCities = [] } = useQuery({ enabled: !!formData.permanentStateId, queryKey: ['getCityByStateId', formData.permanentStateId], queryFn: () => getCityByStateId(formData.permanentStateId) });

    let { data: permanentLocalities = [] } = useQuery({ enabled: !!formData.permanentCityId, queryKey: ['getLocalityByCityId', formData.permanentCityId], queryFn: () => getLocalityByCityId(formData.permanentCityId) });
    let { data: presentStates = [] } = useQuery({ enabled: !!formData.presentCountryId, queryKey: ['getStateByCountry', formData.presentCountryId], queryFn: () => getStateByCountry(formData.presentCountryId) });

    let { data: presentCities = [] } = useQuery({ enabled: !!formData.presentStateId, queryKey: ['getCityByStateId', formData.presentStateId], queryFn: () => getCityByStateId(formData.presentStateId), });

    let { data: presentLocalities = [] } = useQuery({ enabled: !!formData.presentCityId, queryKey: ['getLocalityByCityId', formData.presentCityId], queryFn: () => getLocalityByCityId(formData.presentCityId) });


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
            <UserProfileForm
                setFiles={setFiles}
                control={control}
                handleChange={handleChangeWrapper}
                formData={formData}
                index={index}
                countries={countries}
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
            <Heading label={"Photos and Signature"} />
            <DragDropFile uploadText="Upload Photo" updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
            <DragDropFile uploadText="Add Signature" updateFilesCb={setFiles} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />

        </div>
    )


}