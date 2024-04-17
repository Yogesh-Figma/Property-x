import React from 'react'
import Image from 'next/image'
import Card from '@/app/components/card'
import EllipseIcon from '@/app/icons/ellipse.svg'

const HighLights = ({ data }) => {
    return (
        <div id="highlights">
            <Card className='highlights'>
                <div className='d-flex justify-content-between align-items-start'>
                    <div>
                        <div className='title heading'>What's best in it?</div>
                        <div className='bullet-points'>
                            {data.map((item, index) => <div className='points'>
                                <EllipseIcon />
                                <span className='point'>{item}</span>
                            </div>
                            )}
                        </div>
                    </div>
                    <div className='img-cnt d-none d-md-block'>
                        <Image alt="highlight" src={"/highlight.png"} height={367} width={367} />
                    </div>
                </div>
            </Card>
        </div>)
}

export default HighLights;