import React from 'react';
import Heading from '@/app/components/heading';
import Card from '@/app/components/card';
import { getPaymentPlanByProjectId } from '@/clients/paymentClient';
import dayjs from 'dayjs';
import './styles.scss'

const PaymentPlan = async ({ projectId, token }) => {
    let data;
    try {
        data = (await getPaymentPlanByProjectId(projectId))[0];
    }
    catch (ex) {

    }

    return (
        !!data &&
        <div className='payment-plan'>
            <Heading label={"Payment Plan"} />
            <Card className='payment-plan-card'>
                <table style={{ width: "100%" }}>
                    <tr>
                        <th>Category</th>
                        <th>Percentage</th>
                        <th>Number of days after booking</th>
                        <th>Tentative due date</th>
                    </tr>
                    {(data.milestones || []).map((item, index) => <tr>
                        <td>{item.name}</td>
                        <td>{item.percentage}</td>
                        <td>{item.numberOfDaysAfterBooking}</td>
                        <td>{item.dueDate ? dayjs(item.dueDate).format("DD-MM-YYYY"):""}</td>
                    </tr>)}
                </table>
            </Card>
        </div>)


}

export default PaymentPlan;