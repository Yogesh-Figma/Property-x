import Image from 'next/image';
import '@/app/(static)/styles.scss'
import dayjs from 'dayjs';
import { getTermsAndConditions } from '@/clients/staticContentClient'

const InsightsAndArticles = async ({ params: { id, type }}) => {
    let serviceData = (await getTermsAndConditions(id));
    serviceData = serviceData[0] || serviceData  // WHY THIS IS ANY ARRAY ???
    const updateDate = dayjs(serviceData.updatedOn || serviceData.createdOn);
    return (<div className='terms-of-service static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>Insights and Articles</div>
                    <div className='sub-heading'>Lorem ipsum dolor sit amet consectetur. Morbi feugiat aliquam aenean mollis nunc feugiat. Purus neque nullam dictumst enim ut vivamus adipiscing dis...</div>
                </div>
                <Image src={"/insightsAndArticles.png"} className='d-none d-md-block' width={250} height={250} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='content'>
             
            </div>
        </div>
    </div>)
}


export default InsightsAndArticles;