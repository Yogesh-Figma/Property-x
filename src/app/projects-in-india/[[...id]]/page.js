import React from 'react';
import Link from 'next/link'
import "./styles.scss"
import Helper from '@/common/helper';
import DeveloperDrawer from '@/app/projects-in-india/[[...id]]/allProjects';
import { getAllProjectsInIndia } from '@/clients/projectClient'

const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));
const alphabetChunks = Helper.chunkArray(alphabet, 5);
const data = ["test", "test1", "test2", "test3", "test4", "test5"];

export default async function Page({ params: { id }}) {
    const data = await getAllProjectsInIndia();
    const selectedData = !!id ? (data||[]).find(item => item.group == id).data||[] : [];
    return <div className='developer-in-india container-fluid'>
        <DeveloperDrawer id={id} data={selectedData}/>
        <div className='additional-page-padding'>
            <div className='heading'>Projects in India</div>
            <div className='sub-info'>
                The Real Estate Companies in India are serving the people by offering solutions to all their property needs. With rising demand for residential and commercial space, the property developers are leaving no stone unturned and coming up with new projects in every real estate segment. The real estate and construction sectors are an integral part of Indian economy’s growth graph and responsible for the development of India’s core infrastructure. And the real estate developers, across cities, are offering a variety of inventories to buyers with different reasons. Most of the cities of India have residential launches in budget as well as luxury segments. The housing market of India has varied requirements from diverse income groups and the Property builders in India have successfully catered. The commercial properties delivered by builders include state-of-the-art offices, retail and institutional spaces. Winning the trust of millions of Indians, the real estate companies have more to offer.
                Let’s explore the best real estate projects in India and know more about them.
            </div>
            <div className='list'>
                <div className='heading dev-link-heading mt-3'>
                    List of Projects across India
                </div>
                <div className='dev-links d-flex flex-wrap'>
                    {data.map(item => <Link href={`/projects-in-india/${item.group}`} className='me-1'>{item.group}</Link>)}
                </div>
                <table className='developers'>
                    {data.map(item => {
                    return (
                        <div className='dev-data'>
                            <div className='heading'><Link href={`/projects-in-india/${item.group}`}>{item.group}</Link></div>
                            {(item.data||[]).slice(0,10).map(proj => <Link href={`/project/${proj.url}`} className='dev d-block'>{proj.name}</Link>)}
                        </div>            
                    )
                })}

{/* return (
                            <span className='dev-data'>
                                <tr className='th-head text-start'>
                                    {chunk.map(alp => <th className='sub-heading'>{alp}</th>)}
                                </tr>
                                <tr>
                                    {chunk.map(alp => <td>
                                        <span>
                                            <ul className='list'>
                                            {data.map(dev => <div className='dev'>
                                                <Link href="/">{dev}</Link>
                                            </div>)}
                                            </ul>
                                        </span>
                                    </td>)}
                                </tr>
                            </span>
                        ) */}
                </table>
            </div>
        </div>

    </div>
}