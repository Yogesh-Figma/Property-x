import React from 'react';
import Link from 'next/link'
import "./styles.scss"
import Helper from '@/common/helper';
import DeveloperDrawer from '@/app/projects-in-india/[[...id]]/allProjects';
import { getAllProjectsInIndia } from '@/clients/projectClient'

const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));
const alphabetChunks = Helper.chunkArray(alphabet, 5);
const data = ["test", "test1", "test2", "test3", "test4", "test5"];

export default async function Page({ params: { id } }) {
    const data = await getAllProjectsInIndia();
    const selectedData = !!id ? (data || []).find(item => item.group == id).data || [] : [];
    return <div className='developer-in-india container-fluid'>
        <DeveloperDrawer id={id} data={selectedData} />
        <div className='additional-page-padding'>
            <div className='heading'>Projects in India</div>
            <div className='sub-info'>
                Let’s explore the top projects in India by the top real-estate developers. All the residential and
                commercial projects listed below are verified by the GoPropify team and are built by renowned
                builders in India who have years of experience. The top developers in India make sure to provide
                your dream house in premium locations in India. The locations of the commercial projects are also
                chosen strategically to get maximum footfall.
                All the listed projects are well-connected with medical essentials, top marts &amp; malls, the best schools
                &amp; colleges, entertainment facilities, and more. Not only that but every apartment by renowned
                developers in the best projects in India is designed with diligence to offer comfort, luxury, and
                convenience. The commercial projects by renowned developers incorporate sustainable design,
                contemporary technology, and functional layouts.
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
                                {(item.data || []).slice(0, 10).map(proj => <Link href={`/project/${proj.url}`} className='dev d-block'>{proj.name}</Link>)}
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