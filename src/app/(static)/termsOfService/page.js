import Image from 'next/image';
import '../styles.scss'
import dayjs from 'dayjs';
import { getTermsAndConditions } from '@/clients/staticContentClient'

const TermsOfService = async () => {
    let serviceData = (await getTermsAndConditions());
    serviceData = serviceData[0] || serviceData  // WHY THIS IS ANY ARRAY ???
    const updateDate = dayjs(serviceData.updatedOn || serviceData.createdOn);
    return (<div className='terms-of-service static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>Terms Of Service</div>
                    <div className='sub-heading'>Understand the rules and guidelines for using our platform in our Terms of Service.</div>
                </div>
                <Image src={"/termsConditions.png"} className='d-none d-md-block' width={369} height={291} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='content'>
                <div className='last-updated sub-info body-txt'>Last updated on : {updateDate.format("DD-MM-YYYY")}</div>
                <div className='welcome-text'>Welcome to "Go Propify," a property booking website. These Terms of Service ("Terms") govern your use of our website and services. By using our platform, you agree to these Terms. Please read them carefully.</div>
                <div className='dynamic-data' dangerouslySetInnerHTML={{ __html: serviceData.termOfServices }} />
            </div>
        </div>
    </div>)
}


export default TermsOfService;