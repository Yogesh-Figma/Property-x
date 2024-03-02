'use client'
import React from 'react'
import Image from 'next/image';
import './styles.scss'
import Stepper from '@/app/components/stepper';
import SnackbarAlert from '@/app/components/snackbarAlert';
import Heading from '@/app/components/heading';
import InventorySelection from './inventorySelection';
import PaymentAndBook from './paymentAndBook';
import PersonalDetails from './personalDetails';
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react"
import { getPropertiesByProjectId } from '@/clients/propertyClient';
import { bookProperty } from '@/clients/bookingClient';
import { useMutation, useQueryClient } from 'react-query';
import Loading from '@/app/loading';
import BackdropLoader from '@/app/components/backdropLoader';
import Dialog from '@/app/components/dialog';

const STEPS = ["Personal Details", "Payment and Book"]

export default ({ data, type, configurations, projectTowers }) => {
    let isProperty = type.toLowerCase() == "property"
    const BOOKING_STEPS = isProperty ? STEPS : ["Inventory Selection", ...STEPS];
    const [activeStep, changeStep] = React.useState(isProperty ? 1 : 0);
    const { data: { user, token } } = useSession();
    const getPersonalDataFields = () => {
        return {
            firstName: "", lastName: "", phone: "", email: "", aadharNo: "", panNo: "",
            nomineeName: "", nomineeRelation: "",
            owner: false,
            permanentZipcode: "",
            presentZipcode: "",
            presentAddressLine1: "",
            presentAddressLine2: "",
            permanentAddressLine1: "",
            permanentAddressLine2: "",
            permanentCityId: "",
            permanentLocalityId: "",
            permanentStateId: "",
            permanentCountryId: "",
            presentCityId: "",
            presentLocalityId: "",
            presentStateId: "",
            presentCountryId: "",
            permanentAddressSame: false
        }
    }
    const [formData, setFormData] = React.useState({
        propertyId: "",
        declaration: false, tower: "", bhkType: "", floor: "",
        apartment: "",
        nomineeName: "", nomineeRelation: "",
        selectedPaymentMethod: ""
    });

    const [personalData, setPersonalData] = React.useState([getPersonalDataFields()]);
    let { towerId, floorId, configId } = formData;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handlePersonalDetails = (index, event) => {
        const { name, value } = event.target;
        let data = [...personalData];
        data[index][name] = value;
        setPersonalData(data);
    }

    const handleErrorAlert = (open) => () => {
        setFormData((prevData) => ({ ...prevData, isError: open }))
    }


    const addOwner = () => {
        if (personalData.length < 3) {
            setPersonalData([...personalData, getPersonalDataFields()]);
        }
    }

    let { data: properties = [], isLoading } = useQuery({
        enabled: !!towerId && !!floorId,
        queryKey: ['getPropertiesByProjectId', towerId, floorId, configId],
        queryFn: () => getPropertiesByProjectId(data.id, token, { towerId, floorId, configId } = formData)
    });


    const selectedProperty = React.useMemo(() => isProperty ? data : properties.find(item => item.id == formData.propertyId), [formData.propertyId]);

    const uploadFile = async (files, customPath) => {
        const formData = new FormData();
        for (let file of files) {
            formData.append("files", file);
        }
        formData.append("userId", user.id);
        formData.append("customPath", customPath);
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        return response.json();
    }

    const bookAProperty = async () => {
        let bookingData = {
            "propertyId": formData.propertyId,
            "amount": selectedProperty.totalPrice,
            "owners": []
        }
        await new Promise((resolve, reject) => personalData.forEach(async (item, index) => {
            if (!!item.signature) {
                const res = await uploadFile([item.signature], data.id + `signature${index}`);
                item.signatureUrl = res[0];
            }
            if (!!item.userPhoto) {
                const res = await uploadFile([item.userPhoto], data.id + `userPhoto${index}`);
                item.userPhotoUrl = res[0];
            }
            if (!!item.aadharImage) {
                const res = await uploadFile([item.aadharImage], data.id + `aadharImage${index}`);
                item.aadharUrl = res[0];
            }
            if (!!item.panImage) {
                const res = await uploadFile([item.panImage], data.id + `panImage${index}`);
                item.panImageUrl = res[0];
            }

            bookingData.owners.push({
                "firstName": item.firstName,
                "lastName": item.lastName,
                "email": item.email,
                "phone": item.phone,
                "panCard": item.panNo,
                "aadharCard": item.aadharNo,
                "cityId": item.presentCityId || item.permanentCityId,
                "address": item.presentAddressLine1 || item.permanentAddressLine1 + " " + item.presentAddressLine2 || item.permanentAddressLine2,
                "aadharImage": item.aadharUrl,
                "panImage": item.panImageUrl,
                "photo": item.userPhotoUrl,
                "signature": item.signatureUrl
            })
            resolve();
        }));
        await bookProperty(bookingData, token);
    }



    const { mutate, isLoading: submitting, isError, data: submitData, error, isSuccess } = useMutation(bookAProperty, {
        onSuccess: data => {
        },
        onError: (error) => {
            handleErrorAlert(true)();
        },
        onSettled: () => {
        }
    });


    const getStepForm = () => {
        switch (activeStep) {
            case 0: return <InventorySelection
                data={data}
                formData={formData}
                handleChange={handleChange}
                changeStep={changeStep}
                configurations={configurations}
                projectTowers={projectTowers}
                properties={properties}
                selectedProperty={selectedProperty}
            />;
            case 1: return <PersonalDetails addOwner={addOwner}
                data={data}
                personalData={personalData}
                handleFormChange={handleChange}
                declaration={formData.declaration}
                selectedProperty={selectedProperty}
                handlePersonalDetails={handlePersonalDetails}
                changeStep={changeStep} />;
            case 2: return <PaymentAndBook
                personalData={personalData}
                selectedProperty={selectedProperty}
                formData={formData}
                handleChange={handleChange}
                bookProperty={mutate} />
        }
    }


    return (<div className='book-property-form container-fluid'>
        <div className='heading text-center'>Booking Information</div>
        <div className='sub-info text-center'>Provide the required information to Book this property now</div>
        <div className='additional-page-padding steps'>
            <Stepper steps={BOOKING_STEPS} activeStep={activeStep} />
            <BackdropLoader open={submitting} />

            <Dialog
                open={isSuccess}
                severity="success"
                variant="filled"
                onClose={() => { }}
                title={"Thank You"}
                message1={"Your property was booked successfully"}
                message2={"Our expert consultants will reach out to you shortly"}
            />
            {getStepForm()}
        </div>
        <SnackbarAlert autohide={true}
            handleClose={handleErrorAlert(false)}
            title={"Error"}
            message={"Something went wrong. Please try again later."}
            open={formData.isError} />
    </div>)
}