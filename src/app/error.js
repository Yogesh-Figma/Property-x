"use client"
import Button from '@/app/components/button';
import Image from 'next/image';

export default function Error() {
    return <div className="not-found d-flex align-items-center justify-content-center container-fluid">
        <div>
            <div className='heading-4d not-found-head'></div>
            <div className='heading sub-text mb-3'>Oops! Something went wrong!</div>
            <div className='sub-text mb-3'>We are looking into it.</div>
            <Button rounded={true} height={47} text={"Go To Home"} onClick={() => (window.location.href = '/')} />
        </div>
        <div className='image-container position-relative d-none d-md-block'>
            <Image alt="notfound" src="/notfound.png" fill={true}/>
        </div>
    </div>
}