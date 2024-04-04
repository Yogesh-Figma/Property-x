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
        handlePersonalDetails(index, event);
        // if(name == "permanentCityId") {
        //     let value = permanentCities.find(item => item.id == value);
        //     handlePersonalDetails(index, {name:"permanentCityName", value});
        // }
        // else if(name == "permanentLocalityId") {
        //     let value = permanentLocalities.find(item => item.id == value);
        //     handlePersonalDetails(index, {name:"permanentLocalityName", value});
        // }
        // else if(name == "presentCityId") {
        //     let value = presentCities.find(item => item.id == value);
        //     handlePersonalDetails(index, {name:"presentCityName", value});
        // }
        // else if(name == "presentLocalityId") {
        //     let value = presentLocalities.find(item => item.id == value);
        //     handlePersonalDetails(index, {name:"presentLocalityName", value});
        // }
    }

    return (
        <div>
            <div className='owner-checkbox-cnt d-flex'>
                <CheckBox onChange={handleChangeWrapper} name="owner" checked={formData.owner} className='owner-checkbox' /><span>I am the Owner</span>
            </div>
            <UserProfileForm
                setFiles={(name, value)=>handleChangeWrapper({target:{name, value:value[0]}})}
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
            <DragDropFile uploadText="Upload Photo" updateFilesCb={(files) => handleChangeWrapper({target:{name:"userPhoto", value:files[0]}})} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
            <DragDropFile uploadText="Add Signature" updateFilesCb={(files) => handleChangeWrapper({target:{name:"signature", value:files[0]}})} supportedFileTypes={[SUPPORTED_FILE_TYPE.image]} />
        </div>
    )


}