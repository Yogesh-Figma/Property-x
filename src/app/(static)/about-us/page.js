import Image from 'next/image';
import '../styles.scss'
import dayjs from 'dayjs';
import { getTermsAndConditions } from '@/clients/staticContentClient'

const AboutUs = async () => {
    const updateDate = dayjs();
    return (<div className='terms-of-service static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>About Us</div>
                    <div className='sub-heading'></div>
                </div>
                <Image alt="terms and condition" src={"/termsConditions.png"} className='d-none d-md-block ml-auto' width={369} height={291} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='content'>
                <div className='last-updated sub-info body-txt'>Last updated on : {updateDate.format("DD-MM-YYYY")}</div>
                <div className='welcome-text'>Welcome to "Go Propify," a property booking website.</div>
                <div className='dynamic-data'  />
            </div>
        </div>
    </div>)
}


export default AboutUs;