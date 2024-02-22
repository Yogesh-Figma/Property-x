"use client"
import "./styles.scss"
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from "@/app/components/button";
import Input from '@/app/components/input';
import DropDown from '@/app/components/dropDown'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { Modal } from "@mui/material";
import CloseIcon from '@/app/icons/icon_close-small.svg'
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react";
import Card from "@/app/components/card";
import ProfileRed from '@/app/icons/profile_red.svg'
import { getLeadsByProjectId, getLeadsByPropertyId, getAllLeads, getUserContactDetailsByQueryId } from '@/clients/leadClient'
import { getPropertyById } from '@/clients/propertyClient';

import Helper from "@/common/helper";
let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


export default function CheckLeads({ id, type, enabled, onClose, data }) {
    const sessionData = useSession();
    const [state, setState] = React.useState({});

    if (sessionData == null) {
        return;
    }

    const { data: { user, token } } = sessionData;
    const { data: propProjData = {} } = useQuery({
        enabled: !!id, queryKey: ['getPropertyById', id],
        queryFn: () => "property" ? getPropertyById(id) : getProjectById(id)
    });

    const { data: leads = [] } = useQuery({
        enabled: !!id, queryKey: ['getAllLeads', id],
        queryFn: () => getAllLeads(id, token)
    });

    const { data: contactDetails = {}} = useQuery({
        enabled: !!state.queryid, queryKey: ['getUserContactDetailsByQueryId', id],
        queryFn: () => getUserContactDetailsByQueryId(state.queryid, token)
    });


    console.log("leads", leads);
    console.log("contactDetails", contactDetails);

    const showContactDetails = (id) => {
        setState(data => ({ ...data, queryid: id }));
    }

    return (
        <Modal
            open={enabled}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            className='checklead-modal'
        >
            <div className='check-leads'>
                <div className="heading-container position-relative">
                    <div className="heading">Check Leads - Property ID: {id}</div>
                    <div className="sub-head">Ensure a Successful Transaction with Go Propify</div>
                    <CloseIcon width={30} height={30} className='position-absolute close-icon' role="button" onClick={onClose} />
                </div>
                <div className="sub-head mb-3">Please keep the lead information confidential and use it exclusively for property-related transactions.</div>
                <div className="lead-card-container">
                    {leads.map((item, index) => {
                        const createdTime = dayjs(item.createdTime);
                        return (<Card className="lead-card">
                            <div className="usr-detail d-flex position-relative" key={index}>
                                <ProfileRed />
                                <div className="usr-name-cnt">
                                    <div className="usr-txt d-flex justify-content-between">
                                        <div className="heading">{item.userFirstName} {item.userLastName}</div>
                                        <div className="date">{createdTime.format("DD-MM-YYYY")}</div>
                                    </div>
                                    <div className="sub-head mt-1">{item.query}</div>
                                </div>
                            </div>
                            <div className="property-detail">
                                <div className="">
                                    {propProjData.name}| {propProjData.address} | {propProjData.configuration?.name} | {propProjData.possessionStatus?.name} | {Helper.sqftSizeFormatter(propProjData.ratePerAreaUnit)}
                                </div>
                            </div>
                            <div className="d-flex btns justify-content-between">
                                <Button className="action-btn" text='Report' height={34} rounded={true} variant='outlined' />
                                {state.queryid == item.id && !!contactDetails.userId ? <div className="contact-info text-end">
                                <div className="mb-2">{contactDetails.email}</div>
                                <div>{contactDetails.mobileNo}</div>
                                </div>:
                                <Button className="action-btn" text='View contact details' height={34} rounded={true} onClick={() => showContactDetails(item.id)} />
                                }
                            </div>
                        </Card>)
                    })}
                </div>
            </div>
        </Modal>
    );
}