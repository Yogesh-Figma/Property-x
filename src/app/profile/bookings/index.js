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
                <Image src={"/scheduleNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                <div className="message mb-3 heading-4d heading">Looks like you didn't book any property.</div>
                <NextLinkButton rounded={true} height={40} text={"Start Booking Now"} href={"/"} />
            </div> :
                bookings.map(item => <Card className='booking-card overflow-hidden row position-relative g-0 mb-3'>
                    <div className='row property-info'>
                        <div className='col-2 img-container position-relative'>
                            <Image src={"/samplePropertyImage.jpeg"} fill={true} />
                        </div>
                        <div className='info-container col-10 row g-0'>
                            <div className={`subinfo-container d-flex flex-column col-9`}>
                                <div className="title heading">{item.propertyName}</div>
                                <div className="sub-info">Wishtown, Sector - 128</div>
                                <div className='d-flex'>
                                    <div className='property-sub-info'>
                                        <div className="sub-info row g-0"><span className="info col-6">Unit Area</span><span className="detail col-6">1000 sq ft</span></div>
                                        <div className="sub-info row g-0"><span className="info col-6">Tower No.</span><span className="detail col-6">06</span></div>
                                        <div className="sub-info row g-0"><span className="info col-6">Floor No.</span><span className="detail col-6">07</span></div>
                                        <div className="sub-info row g-0"><span className="info col-6">Configuration</span><span className="detail col-6">3 BHK</span></div>
                                        <div className="sub-info row g-0"><span className="info col-6">Apartment No.</span><span className="detail col-6">102</span></div>
                                    </div>
                                    <div className='property-sub-info'>
                                        <div className="sub-info row g-0"><span className="info col-6">Booking Date</span><span className="detail col-6">{dayjs(item.bookingDateTime).format("DD-MM-YYYY")}</span></div>
                                        <div className="sub-info row g-0"><span className="info col-6">Total Amount</span><span className="detail col-6">{Helper.indianCurrencyFormatter(item.totalAmount)}</span></div>
                                        {/* <div className="sub-info row g-0"><span className="info col-6">Growth Rate</span><span className="detail col-6">04.12%</span></div> */}
                                        <div className="sub-info row g-0"><span className="info col-6">Current Value</span><span className="detail col-6">1,50,00,000</span></div>
                                        <div className="sub-info row g-0 booking-status"><span className="info col-6">Booking Status:</span><span className="detail col-6 confirm">{item.bookingStatus}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className='payment-details col-3 text-center'>
                                <div className='next-payment'>Your Next Payment</div>
                                <div className='date'>DD-MM-YYYY</div>
                                <div className='payment-amount'>11,43,985.5</div>
                                <div className='pay-within'>pay within 2 days</div>
                                <Button variant='standard' rounded={true} height={24} text={"Make Payment"} />
                            </div>
                        </div>
                    </div>
                </Card>)}
        </div>)
}