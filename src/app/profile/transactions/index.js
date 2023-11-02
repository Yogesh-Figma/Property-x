import "./styles.scss"
import React from 'react'
import SlantedTabs from "@/app/components/slantedTabs"

export default ({ }) => {
    return (
        <div className='transactions'>
            <SlantedTabs className="tab-content">
                <div label="Booked Properties">
                    <table class="table">
                        <thead class="table-header">
                            <tr>
                                <td className="heading">Project Name</td>
                                <td className="heading">Property Type</td>
                                <td className="heading">Amount Paid</td>
                                <td className="heading">Current Value</td>
                                <td className="heading">Growth Rate</td>
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
                                <td class="growth-rate">4.00%</td>
                                <td class="">22-11-2022</td>
                                <td class="">70,00,000</td>
                                <td class="">22-11-2022</td>
                                <td class="amount-paid">70,00,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div label="Sold Properties">

                </div>
                <div label="Rented Properties">

                </div>
            </SlantedTabs>
        </div>)
}