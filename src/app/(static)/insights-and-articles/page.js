import Image from 'next/image';
import '../styles.scss'
import './styles.scss'
import Heading from '@/app/components/heading';
import { getAllBlogs } from '@/clients/blogClient';
import PaginatedSection from './paginatedSection';

const InsightAndArticles = async () => {
    return (<div className='insight-articles static-page'>
        <div className='info-container position-relative'>
            <div className='info d-flex container-fluid'>
                <div className=''>
                    <div className='heading'>Insights and Articles</div>
                    <div className='sub-heading'>Want to get the insights of the ever-evolving real-estate market? Well, our up-to-date blogs will
                        keep you updated with all the industry-related trends, the latest information, and insights.</div>
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