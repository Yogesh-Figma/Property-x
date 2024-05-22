"use client"
import "./styles.scss"
import React from 'react'
import SlantedTabs from "@/app/components/slantedTabs"
import NextLinkButton from "@/app/components/nextLinkButton";
import Image from 'next/image';
import UpdateIcon from '@/app/icons/update_icon.svg'
import { useQuery } from 'react-query';
import { useSession } from "next-auth/react"
import { getTransactionsByUserId } from "@/clients/transactionsClient";
import Helper from '@/common/helper';

export default ({ }) => {
    const { data: { user, token } = {} } = useSession();
    let { data: transactions = [], isLoading } = useQuery({ queryKey: ['getTransactionsByUserId'], queryFn: () => getTransactionsByUserId(token, user.id) });

    return (
        <div className='transactions'>
            <SlantedTabs className="tab-content">
                <div label="In-Progress">
                    {!!transactions && transactions.length > 0 ? <table class="table">
                        <thead class="table-header">
                            <tr>
                                <td className="heading">Project Name</td>
                                <td className="heading">Property Type</td>
                                <td className="heading">Booking Amount</td>
                                <td className="heading">Total Amount to be Paid</td>
                                <td className="heading">Growth Rate</td>
                                <td className="heading">Current Value</td>
                                <td className="heading text-center">Update Payment</td>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(item => <tr>
                                <td class="">{item.projectName}</td>
                                <td class="">{item.propertyType}</td>
                                <td class="">{Helper.indianCurrencyFormatter(item.bookingAmount)}</td>
                                <td class="">{Helper.indianCurrencyFormatter(item.totalAmountToBePaid)}</td>
                                <td class="">{Helper.indianCurrencyFormatter(item.growthRate)}</td>
                                <td class="">{Helper.indianCurrencyFormatter(item.currentValue)}</td>
                                <td class="text-center"><UpdateIcon /></td>    
                            </tr>)}
                        </tbody>
                    </table>:
                    <div className="no-result d-flex align-items-center justify-content-center flex-column">
                        <Image alt="wishlist no result" src={"/wishListNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                        <div className="message mb-3 heading-4d">No transactions done yet!</div>
                        <NextLinkButton rounded={true} height={40} text={"Start Booking Now"} href={"/"} />
                    </div>}
                </div>
                <div label="Booked Properties">
                    <div className="no-result d-flex align-items-center justify-content-center flex-column">
                        <Image alt="wishlist no result"  src={"/wishListNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                        <div className="message mb-3 heading-4d">No transactions done yet!</div>
                        <NextLinkButton rounded={true} height={40} text={"Start Booking Now"} href={"/"} />
                    </div>
                    {/* <table class="table">
                        <thead class="table-header">
                            <tr>
                                <td className="heading">Project Name</td>
                                <td className="heading">Property Type</td>
                                <td className="heading">Amount Paid</td>
                                <td className="heading">Current Value</td>
                                <td className="heading">Booking Date</td>
                                <td className="heading">Upcoming Payment</td>
                                <td className="heading">Upcoming Payment on</td>
                                <td className="heading amount-paid">Total Amount to be Paid</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="">Project Name</td>
                                <td class="">Residential</td>
                                <td class="">50,00,000</td>
                                <td class="">70,00,000</td>
                                <td class="">22-11-2022</td>
                                <td class="">70,00,000</td>
                                <td class="">22-11-2022</td>
                                <td class="amount-paid">70,00,000</td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
                {/* <div label="Sold Properties">
                    <div className="no-result d-flex align-items-center justify-content-center flex-column">
                        <Image alt="wishlist no result" src={"/wishListNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                        <div className="message mb-3 heading-4d">No transactions done yet!</div>
                        <NextLinkButton rounded={true} height={40} text={"Start Booking Now"} href={"/"} />
                    </div>
                </div> */}
            </SlantedTabs>
        </div>)
}