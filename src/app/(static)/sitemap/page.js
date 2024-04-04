import React from 'react';
import Link from 'next/link'
import "./styles.scss"

const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));
const data = ["test", "test1", "test2", "test3", "test4", "test5"];

export default async function Page({ params: { id }}) {
    return <div className='developer-in-india container-fluid'>
        <div className='additional-page-padding'>
            <div className='heading'>Sitemap</div>
            <div className='sub-info'>               
            </div>
            <div className='list'>
                <div className='heading dev-link-heading mt-3'>                 
                </div>
                <div className='dev-links d-flex justify-content-between'>
                    {alphabet.map(item => <Link href={`sitemap/${item}`}>{item}</Link>)}
                </div>
                <table className='developers'>
                {alphabet.map(item => {
                    return (
                        <div className='dev-data'>
                            <div className='heading'><Link href={`sitemap/${item}`}>{item}</Link></div>
                            {data.map(dev => <div className='dev'>
                                <Link href="/">{dev}</Link>
                            </div>)}
                        </div>            
                    )
                })}

                </table>
            </div>
        </div>

    </div>
}