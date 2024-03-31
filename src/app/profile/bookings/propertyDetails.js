"use client"
import React from 'react'
import Button from '../../components/button'
import Card from '@/app/components/card'
import Image from 'next/image'
import { useQuery } from 'react-query';
import Helper from '@/common/helper'
import dayjs, { Dayjs } from 'dayjs';
import { getPropertyById } from '@/clients/propertyClient';
import Loading from '@/app/loading'


export default ({ item }) => {

    const { data = {}, isLoading } = useQuery({
        queryKey: ['getPropertyById', item.propertyId],
        queryFn: () => getPropertyById(item.propertyId)
    });

    return (
        <Card className='booking-card overflow-hidden row position-relative g-0 mb-3'>
            {isLoading ? <Loading /> : <div className='row property-info'>
                <div className='col-2 img-container position-relative'>
                    <Image alt="property image" src={data.logo} fill={true} />
                </div>
                <div className='info-container col-10 row g-0'>
                    <div className={`subinfo-container d-flex flex-column col-12`}>
                        <div className="title heading">{data.name}</div>
                        <div className="sub-info">{data.address}</div>
                        <div className='d-flex'>
                            <div className='property-sub-info'>
                            <div className="sub-info row g-0"><span className="info col-6">Unit Area</span><span className="detail col-6">{Helper.sqftSizeFormatter(data.coveredArea)}</span></div>
                            <div className="sub-info row g-0"><span className="info col-6">Tower No.</span><span className="detail col-6">{data.floor?.tower?.name}</span></div>
                            <div className="sub-info row g-0"><span className="info col-6">Floor No.</span><span className="detail col-6">{data.floor?.number}</span></div>
                            <div className="sub-info row g-0"><span className="info col-6">Configuration</span><span className="detail col-6">{data.configuration?.name || data.configurations}</span></div>
                            <div className="sub-info row g-0"><span className="info col-6">Unit No.</span><span className="detail col-6">{data.unitId}</span></div>
                         
                            </div>
                            <div className='property-sub-info'>
                                <div className="sub-info row g-0"><span className="info col-6">Booking Date</span><span className="detail col-6">{dayjs(item.bookingDateTime).format("DD-MM-YYYY")}</span></div>
                                <div className="sub-info row g-0"><span className="info col-6">Total Amount</span><span className="detail col-6">{Helper.indianCurrencyFormatter(item.totalAmount)}</span></div>
                                {/* <div className="sub-info row g-0"><span className="info col-6">Growth Rate</span><span className="detail col-6">04.12%</span></div> */}
                                <div className="sub-info row g-0"><span className="info col-6">Current Value</span><span className="detail col-6">{Helper.indianCurrencyFormatter(data.totalPrice)}</span></div>
                                <div className="sub-info row g-0 booking-status"><span className="info col-6">Booking Status:</span><span className="detail col-6 confirm">{item.bookingStatus}</span></div>
                            </div>
                        </div>
                    </div>
                      {/*<div className='payment-details col-3 text-center'>
                       <div className='next-payment'>Your Next Payment</div>
                        <div className='date'>DD-MM-YYYY</div>
                        <div className='payment-amount'>11,43,985.5</div>
                        <div className='pay-within'>pay within 2 days</div>
                        <Button variant='standard' rounded={true} height={24} text={"Make Payment"} /> 
                    </div>*/}
                </div>
            </div>}
        </Card>)
}