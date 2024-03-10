"use client"
import Button from '@/app/components/button';
import Image from 'next/image';

export default function NotFound() {
    return <div className="not-found d-flex align-items-center justify-content-center container-fluid">
        <div>
            <div className='heading-4d not-found-head'>404</div>
            <div className='heading sub-text mb-3'>Oops! Something went wrong!</div>
            <div className='sub-text mb-3'>The page you are looking for not available</div>
            <Button rounded={true} height={47} text={"Go To Home"} onClick={() => (window.location.href = '/')} />
        </div>
        <div className='image-container position-relative d-none d-md-block'>
            <Image src="/notfound.png" fill={true}/>
        </div>
    </div>
}