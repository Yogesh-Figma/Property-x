import React from 'react'
import Heading from '@/app/components/heading';
import Input from '@/app/components/input';
import Image from 'next/image';
import Button from "@/app/components/button";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from 'next/navigation'

export default ({  }) => {

    const router = useRouter();
    return <div className="pricing-and-post">
        <div className='d-block d-lg-flex align-items-center justify-content-center mt-5'>
            <div className='property-cost-cnt'>
                <div className="form-element-heading">Property posted successfully</div>
                <div>We will contact you soon!</div>
            </div>
            <div className='undraw-sale d-none d-lg-inline-block'>
                <Image src={"/undrawSale.svg"} width={480} height={239} />
            </div>
        </div>
        <div className='d-flex justify-lg-content-center justify-content-center post-property-cnt'>
            <Button className="post-property-btn" rounded={true} height={48} text={"Home"} onClick={()=> router.push("/")} />
        </div>
    </div>
}