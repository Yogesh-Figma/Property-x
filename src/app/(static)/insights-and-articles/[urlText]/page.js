import Image from 'next/image';
import '@/app/(static)/styles.scss'
import './styles.scss';
import dayjs from 'dayjs';
import { getBlogById, getBlogByUrlText } from '@/clients/blogClient'
import Heading from '@/app/components/heading';
import AuthorIcon from '@/app/icons/author.svg'
import { getAllBlogs } from '@/clients/blogClient';
import Link from 'next/link'

const ArticleCard = ({ imgUrl, heading, subHeading, className, href="" }) => {
    return (
        <Link href={href} className={`article-card d-flex ${className}`} passHref>
            <Image src={imgUrl || ""} width={155} height={155} className='me-3' />
            <div className='info'>
                <div className='head'>{heading}</div>
                <div className='sub-info mt-2'>{subHeading}</div>
            </div>
        </Link>
    )
}

const InsightsAndArticles = async ({ params: { urlText, type } }) => {

    const { serviceData = {}, featuredArticles = {} } = await Promise.allKeys({
        serviceData: await getBlogByUrlText(urlText),
        featuredArticles: await getAllBlogs(true, 4, 0)
    });

    const createdOn = dayjs(serviceData.createdDate || "");
    return (<div className='insight-article-detail static-page'>
        <div className='info-container position-relative'>
            <Image alt="article img" src={serviceData.urls[0]?.imageUrl || ""} className='position-absolute bg-img' fill={true} />
        </div>
        <div className=' content-cnt container-fluid'>
            <div className='heading mb-4'>{serviceData.headings}</div>
            <div className='author-cnt d-flex justify-content-between'>
                <div className='author-details d-flex'>
                    <AuthorIcon width={40} height={40} />
                    <div className='author-info ms-2'>
                        <div className='author-name heading'>{serviceData.author}</div>
                        <div className='author-specialist'>Property Specialist</div>
                    </div>
                </div>
                <div className='created-on'>
                    <div className='date'>{createdOn.format("MMMM DD, YYYY")}</div>
                </div>
            </div>
            {serviceData.urls.length > 1 && <div className='info-container position-relative mt-3 mb-3'>
                <Image alt="article img" src={serviceData.urls[1]?.imageUrl || ""} className='position-absolute bg-img' fill={true} />
            </div>}
            <div className='content' dangerouslySetInnerHTML={{ __html: serviceData.content }} />
            <Heading label="Featured Articles" className='heading' />
            <div className='featured-article-cnt row mt-3'>
                {(featuredArticles?.content || []).map((item, index) => <ArticleCard
                    href={`/insights-and-articles/${item.url}`}
                    key={index}
                    imgUrl={item.urls[0]?.imageUrl || ""}
                    heading={item.headings}
                    subHeading={item.subHeading}
                    className={"col-md-6 col-12 mt-3"}
                />)}
            </div>
        </div>
    </div>)
}


export default InsightsAndArticles;