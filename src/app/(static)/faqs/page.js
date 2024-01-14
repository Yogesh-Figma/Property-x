import Image from 'next/image';
import '../styles.scss'
import dayjs from 'dayjs';
import { getTermsAndConditions } from '@/clients/staticContentClient'

const FAQs = async () => {
    let serviceData = (await getTermsAndConditions());
    serviceData = serviceData[0] || serviceData  // WHY THIS IS ANY ARRAY ???
    const updateDate = dayjs(serviceData.updatedOn || serviceData.createdOn);
    return (<div className='terms-of-service static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>FAQs</div>
                    <div className='sub-heading'>Explore our FAQs to navigate through the seamless world of property booking on Go Propify..</div>
                </div>
                <Image src={"/faqs.png"} className='d-none d-md-block' width={250} height={250} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='content'>
                <div className='last-updated sub-info body-txt'>Last updated on : {updateDate.format("DD-MM-YYYY")}</div>
                <div className='welcome-text'>Explore our FAQs to navigate through the seamless world of property booking on Go Propify.</div>
                <div className='dynamic-data' dangerouslySetInnerHTML={{ __html: "" }} />
            </div>
        </div>
    </div>)
}


export default FAQs;