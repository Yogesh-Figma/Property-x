"use client"
import "./styles.scss"
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from "@/app/components/button";
import Input from '@/app/components/input';
import { useForm } from "react-hook-form";
import DropDown from '@/app/components/dropDown'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { Modal } from "@mui/material";
import CloseIcon from '@/app/icons/icon_close-small.svg'
import { scheduleVisit } from '@/clients/visitClient'
import { useMutation, useQueryClient } from 'react-query';
import { useSession } from "next-auth/react";
import Loading from "../loading";

const AMPM = [{ label: "AM", value: "AM" }, { label: "PM", value: "PM" }];
const HOURS = [...Array(12).keys()].map(i => {
    let value = ('0' + (i + 1)).slice(-2);
    return { label: value, value };
});

const MINUTES = [...Array(60).keys()].map((i, index) => {
    let value = ('0' + (i)).slice(-2);
    return { label: value, value };
});


export default function ScheduleCalendar({ id, isProperty, renderFromClient, onClose }) {
    const initialScheduleState = { hours: "06", minutes: "00", ampm: "AM", scheduled: false, isAlreadyScheduled:false };
    const maxDateAllowed = dayjs().add(240, 'day');
    const [date, setDate] = React.useState(dayjs().add(3, 'day'));
    const [formData, setFormData] = React.useState(initialScheduleState);
    const sessionData  = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const idFromQueryParam = searchParams.get('schedule');
    const scheduleModalEnabled = !!idFromQueryParam || (renderFromClient && !!id);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const onError = (errors, e) => console.log(errors, e)

    const { control, handleSubmit, setValue } = useForm({
        reValidateMode: "onBlur"
    });

    const handleClose = () => {
        if(renderFromClient) {
            onClose()
        }
        else {
            router.back();
        }
        setFormData(initialScheduleState)
    }
    

    const { mutate, isLoading, isError, data, error } = useMutation(scheduleVisit, {
        onSuccess: data => {
            setFormData((prevFormData) => ({ ...prevFormData, "scheduled": true }));
        },
        onError: (error) => {
            setFormData((prevFormData) => ({ ...prevFormData, "isAlreadyScheduled": true }));
        },
        onSettled: () => {
        }
    });

    if( sessionData == null || sessionData.data == null) {
        return;
    }
    
    const { data: { user, token } } = sessionData;  

    const submitForm = () => {
        let time = date.hour(Number(formData.hours) + formData.ampm == "PM" ? 12 : 0).minute(formData.minutes).valueOf();
        const dataId = id || idFromQueryParam;
        const data = {
            "scheduledDateTime": time,
            "exclusive": true,
            "status": "PLANNED",
            "type": "E_VISIT"
        }
        if (isProperty) {
            data.propertyId = dataId;
        }
        else {
            data.projectId = dataId;
        }
        mutate({ userId: user.id, data, accessToken:token });
    }


    return (
        <Modal
            open={scheduleModalEnabled}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            className='schedule-modal'
        >
            <div className='schedule-calendar'>
                <CloseIcon width={30} height={30} className='position-absolute close-icon' role="button" onClick={handleClose} />
                <div className="heading schedule-visit-txt">Schedule a Visit</div>
                <div className="sub-headig schedule-visit-subtxt">Explore with Go Propify's Experienced Guides</div>
                {isLoading ? <Loading isFullScreen={false}/> :
                    formData.scheduled ? <div className="scheduled-message d-flex align-items-center justify-content-center">Scheduled sucessfully</div> :
                    formData.isAlreadyScheduled ? <div className="scheduled-message d-flex align-items-center justify-content-center">Visit already scheduled</div> :
                        <div>
                            <div className="heading">Pick a date that suits your schedule</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar value={date} onChange={(newValue) => setDate(newValue)} minDate={dayjs()} maxDate={maxDateAllowed}/>
                            </LocalizationProvider>
                            <div className="heading">Pick a time that suits your schedule</div>
                            <div className='time-selector d-flex align-items-center'>
                                <DropDown className={"selection-dropdown"} label={""} handleChange={(event) => handleChange({ target: { name: "hours", value: event.target.value } })} value={formData.hours} values={HOURS} />
                                <span className="time-dot">:</span>
                                <DropDown className={"selection-dropdown"} label={""} handleChange={(event) => handleChange({ target: { name: "minutes", value: event.target.value } })} value={formData.minutes} values={MINUTES} />
                                <DropDown className={"selection-dropdown ampm"} label={""} handleChange={(event) => handleChange({ target: { name: "ampm", value: event.target.value } })} value={formData.ampm} values={AMPM} />
                            </div>
                            <div className="heading">Mobile No.</div>
                            <div className='d-flex'>
                                <Input
                                    name={"mobileno"}
                                    control={control}
                                    rounded={true}
                                    className='mobile-input-container'
                                    label={""}
                                    value={formData.mobileno}
                                    onChange={handleChange}
                                    height={40}
                                    minLength={10}
                                    maxLength={10}
                                    isNumber={true}
                                    required={true}
                                    inputLabelClassName={"body-txt input-label-no-shrink"}
                                    inputLabelShrinkClassName={"body-txt"}
                                    inputPropClassName={"login-input"}
                                    errorMessage={"Please enter valid phone number"}
                                    startAdornment={
                                        <div className='d-flex align-items-center'>
                                            <div className='country-code'> +91 </div>
                                            <div className='vertical-line'></div>
                                        </div>
                                    }
                                />
                                <Button type="submit" className="next-button d-block ml-auto" rounded={true} height={40} text={"Submit"} onClick={handleSubmit(submitForm, onError)} />
                            </div>
                        </div>}
            </div>
        </Modal>
    );
}