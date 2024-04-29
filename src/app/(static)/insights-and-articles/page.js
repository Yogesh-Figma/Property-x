import Image from 'next/image';
import '../styles.scss'
import './styles.scss'
import Heading from '@/app/components/heading';
import { getAllBlogs } from '@/clients/blogClient';
import PaginatedSection from './paginatedSection';

const InsightAndArticles = async () => {
    const blogs = await getAllBlogs(true, 10, 0);
    return (<div className='insight-articles static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>Insights and Articles</div>
                    <div className='sub-heading'>Lorem ipsum dolor sit amet consectetur. Morbi feugiat aliquam aenean mollis nunc feugiat. Purus neque nullam dictumst enim ut vivamus adipiscing dis.</div>
                </div>
                <Image alt="faqs" src={"/insightAndArticles2.png"} className='d-none d-md-block ml-auto' width={250} height={250} />
            </div>
        </div>
        <div className='content-cnt container-fluid'>
            <Heading label="Articles" className='heading' />
            <PaginatedSection />
        </div>
    </div>)
}


export default InsightAndArticles;