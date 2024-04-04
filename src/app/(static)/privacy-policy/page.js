import Image from 'next/image';
import '../styles.scss'
import dayjs from 'dayjs';
import { getPrivacyPolicy } from '@/clients/staticContentClient'

const PrivacyPolicy = async () => {
    let serviceData = (await getPrivacyPolicy());
    serviceData = serviceData[0] || serviceData  // WHY THIS IS ANY ARRAY ???
    const updateDate = dayjs(serviceData.updatedOn || serviceData.createdOn);
    return (<div className='terms-of-service static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>Privacy Policy</div>
                    <div className='sub-heading'>Your privacy is our priority. Learn how we protect your data in our Privacy Policy.</div>
                </div>
                <Image alt="faqs" src={"/faqs.png"} className='d-none d-md-block' width={250} height={250} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='content'>
                <div className='last-updated sub-info body-txt'>Last updated on : {updateDate.format("DD-MM-YYYY")}</div>
                <div className='welcome-text'>Welcome to "Go Propify," a property booking website. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, share, and protect your information. By using our website and services, you consent to the practices described in this policy.</div>
                <div className='dynamic-data' dangerouslySetInnerHTML={{ __html: serviceData.privacyPolicy }} />
            </div>
        </div>
    </div>)
}


export default PrivacyPolicy;