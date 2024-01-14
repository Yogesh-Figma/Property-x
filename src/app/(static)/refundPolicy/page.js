import Image from 'next/image';
import '../styles.scss'
import dayjs from 'dayjs';
import { getRefundPolicy } from '@/clients/staticContentClient'

const RefundPolicy = async () => {
    let serviceData = (await getRefundPolicy());
    serviceData = serviceData[0] || serviceData  // WHY THIS IS ANY ARRAY ???
    const updateDate = dayjs(serviceData.updatedOn || serviceData.createdOn);
    return (<div className='refund-policy static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>Refund Policy</div>
                    <div className='sub-heading'>Discover our transparent refund policy, ensuring your peace of mind when booking properties.</div>
                </div>
                <Image src={"/faqs.png"} className='d-none d-md-block' width={250} height={250} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='content'>
                <div className='last-updated sub-info body-txt'>Last updated on : {updateDate.format("DD-MM-YYYY")}</div>
                <div className='welcome-text'>At "Go Propify," we value your satisfaction and aim to provide a transparent refund policy to ensure that your property booking experience is as hassle-free as possible. Please carefully review our refund policy to understand your rights and responsibilities.</div>
                <div className='dynamic-data' dangerouslySetInnerHTML={{ __html: serviceData.refundPolicy }} />
            </div>
        </div>
    </div>)
}


export default RefundPolicy;