import Image from 'next/image';
import '@/app/(static)/styles.scss'
import dayjs from 'dayjs';
import { getBlogById, getBlogByUrlText } from '@/clients/blogClient'

const InsightsAndArticles = async ({ params: { urlText, type }}) => {
    let serviceData = (await getBlogByUrlText(urlText));

    const updateDate = dayjs(serviceData.updatedOn || serviceData.createdOn);
    return (<div className='terms-of-service static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>Insights and Articles</div>
                    <div className='sub-heading'></div>
                </div>
                <Image alt="insight" src={"/insightsAndArticles.png"} className='d-none d-md-block ml-auto' width={250} height={250} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <div className='heading'>{serviceData.headings}</div>
            <div className='content' dangerouslySetInnerHTML={{ __html: serviceData.content }} />
        </div>
    </div>)
}


export default InsightsAndArticles;