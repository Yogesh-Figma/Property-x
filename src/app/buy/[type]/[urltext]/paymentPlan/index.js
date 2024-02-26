import React from 'react';
import Heading from '@/app/components/heading';
import Card from '@/app/components/card';
import './styles.scss'

const PaymentPlan = () => {
    return (
        <div className='payment-plan'>
            <Heading label={"Payment Plan"} />
            <Card className='payment-plan-card'>
                <table style={{width:"100%"}}>
                    <tr>
                        <th>Category</th>
                        <th>Area (sq.ft.)</th>
                        <th>Total Amount</th>
                        <th>Booking Amount</th>
                        <th>Amount on offer of possession</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1021</td>
                        <td>30,99,000</td>
                        <td>10%</td>
                        <td>80%</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1021</td>
                        <td>30,99,000</td>
                        <td>10%</td>
                        <td>80%</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1021</td>
                        <td>30,99,000</td>
                        <td>10%</td>
                        <td>80%</td>
                    </tr>
                </table>
            </Card>
        </div>
    )
}

export default PaymentPlan;