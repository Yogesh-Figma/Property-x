"use client"
import './styles.scss'
import React from 'react'
import Button from '../../components/button'
import Card from '@/app/components/card'
import Image from 'next/image'
import { getBookingByUserId } from '@/clients/bookingClient';
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react";
import Helper from '@/common/helper'
import dayjs, { Dayjs } from 'dayjs';
import NextLinkButton from "@/app/components/nextLinkButton";
import { getPropertyById } from '@/clients/propertyClient';
import PropertyDetails from './propertyDetails'

export default ({ }) => {
    const sessionData = useSession();
    if (sessionData == null) {
        return;
    }

    const { data: { user, token } } = sessionData;
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['getBookingByUserId', user.id],
        queryFn: () => getBookingByUserId(user.id, token)
    });



    return (
        <div className='bookings'>
            {!isLoading && bookings.length == 0 ? <div className="no-result d-flex align-items-center justify-content-center flex-column">
                <Image alt="schedule no result" src={"/scheduleNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                <div className="message mb-3 heading-4d heading">Looks like you didn't book any property.</div>
                <NextLinkButton rounded={true} height={40} text={"Start Booking Now"} href={"/"} />
            </div> :
                bookings.map(item => <PropertyDetails item={item} />)}
        </div>)
}