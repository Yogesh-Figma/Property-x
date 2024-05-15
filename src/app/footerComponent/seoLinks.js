import react from 'react';
import Helper from '@/common/helper';
import { getGenericKeywords } from '@/clients/seoClient';
import Link from 'next/link'



const SeoLinks = async () => {
    const keywords = await getGenericKeywords();
    const chunks = Helper.splitArrayIntoArrays(keywords, 4);
    return (
        <div className='col-xl-10 seo-links pt-5 pb-5'>
            <div className='row footerLinksColumns container-fluid'>
                {chunks.map((chunk, index) =>
                    <div className='col-lg-3' key={index}>
                        {chunk.map((item, index) => <Link key={index} href={'/search/' + item.path} className="text-reset text-start">{item.keywords}</Link>)}
                    </div>)}
            </div>
        </div>
    )
}

export default SeoLinks;