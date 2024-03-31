"use client"
import "./styles.scss"
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from "@/app/components/button"
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react";
import Card from "@/app/components/card";
import ProfileRed from '@/app/icons/profile_red.svg'
import Image from 'next/image';
import { getUserContactDetailsByQueryId } from '@/clients/leadClient'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NextLinkButton from "@/app/components/nextLinkButton";

import { PostedPropertyCard } from '@/app/components/ui/propertyCard'

import Helper from "@/common/helper";
let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


const LeadsDetails = ({ leads, property }) => {
    const sessionData = useSession();
    const router = useRouter();
    const [state, setState] = React.useState({});

    if (sessionData == null) {
        return;
    }

    const goBack = () => {
        router.back();
    }

    const { data: { user, token } } = sessionData;

    const { data: contactDetails = {} } = useQuery({
        enabled: !!state.queryid, queryKey: ['getUserContactDetailsByQueryId', property.id],
        queryFn: () => getUserContactDetailsByQueryId(state.queryid, token)
    });



    const showContactDetails = (id) => {
        setState(data => ({ ...data, queryid: id }));
    }

    const separatedData = []
    if (property.name) { separatedData.push(property.name) }
    if (property.address) { separatedData.push(property.address) }
    if (property.configuration?.name) { separatedData.push(property.configuration?.name) }
    if (property.possessionStatus?.name) { separatedData.push(property.possessionStatus?.name) }
    if (property.superArea) { separatedData.push(Helper.sqftSizeFormatter(property.superArea)) }

    return (
        <div className="d-flex additional-page-padding position-relative">
            <div className="back-bnt d-flex align-items-center position-absolute cursor-pointer" onClick={goBack}> <KeyboardBackspaceIcon /> Back</div>
            <div className="leads-cnt pe-xl-5 ">

                <div className="heading-container position-relative">
                    <div className="heading">Check Leads - Property ID: {property.id}</div>
                    <div className="sub-head mb-4">Ensure a Successful Transaction with Go Propify</div>
                    <PostedPropertyCard
                        className={''}
                        id={property.id}
                        logo={property.logo || ""}
                        name={property.name}
                        address={property.address}
                        constructionStatus={property.constructionStatus?.name}
                        configuration={property.configuration?.name}
                        price={property.totalPrice}
                        listingType={property.listingType?.name}
                        createdOn={property.createdOn}
                        superArea={property.superArea}
                        ratePerUnitInsqft={property.ratePerUnitInsqft}
                    />
                </div>
                <div className="sub-head mt-4 mb-4">Please keep the lead information confidential and use it exclusively for property-related transactions.</div>
                <div className="lead-card-container">
                    {leads.length == 0 ? <div className="no-result d-flex">                    
                        <div className="message mb-3 heading-4d heading">Looks like you have no leads.</div>                  
                    </div> :
                        leads.map((item, index) => {
                            const createdTime = dayjs(item.createdTime);
                            return (<Card className="lead-card">
                                <div className="usr-detail d-flex position-relative" key={index}>
                                    <ProfileRed />
                                    <div className="usr-name-cnt">
                                        <div className="usr-txt d-flex justify-content-between">
                                            <div className="heading">{item.userFirstName} {item.userLastName}</div>
                                            <div className="date">{createdTime.format("DD-MM-YYYY")}</div>
                                        </div>
                                        <div className="sub-head mt-1">{item.query || "Interested in your inventory for purchase. Attempted to contact you."}</div>
                                    </div>
                                </div>
                                <div className="property-detail">
                                    <div className="">
                                        {separatedData.map((propData, index) => {
                                            return <>
                                                <span className="prop-sub-data">{propData}</span>
                                            </>
                                        })}
                                    </div>
                                </div>
                                <div className="d-flex btns justify-content-end">
                                    {state.queryid == item.id && !!contactDetails.userId ? <div className="contact-info text-end">
                                        <div className="mb-2">{contactDetails.email}</div>
                                        <div>{contactDetails.mobileNo}</div>
                                    </div> :
                                        <Button className="action-btn" text='View contact details' height={34} rounded={true} onClick={() => showContactDetails(item.id)} />
                                    }
                                </div>
                            </Card>)
                        })}
                </div>
            </div>
            <div className="img-cnt d-none d-xl-block">
                <Image alt="leads image" src={"/coupleTogether.png"} width={249} height={417} />
            </div>
        </div>
    );
}

export default LeadsDetails;