import React from 'react'
import Heading from '@/app/components/heading';
import Input from '@/app/components/input';
import Image from 'next/image';
import Button from "@/app/components/button";
import { useForm } from "react-hook-form";

export default ({ formData, handleChange, postProperty }) => {

    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });
    
    return <div className="pricing-and-post">
        <Heading label={"Add Price Details"} />
        <div className='d-flex'>
            <div className='property-cost-cnt'>
                <div className="form-element-heading">Cost</div>
                <Input
                    type={"number"}
                    rounded={true}
                    width={"367px"}
                    className='form-input'
                    label={""}
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    height={40}
                    startAdornment={
                        <span className="rupee-icon">
                            ₹
                        </span>
                    }
                />
            </div>
            <div className='undraw-sale'>
                <Image src={"/undrawSale.svg"} width={480} height={239} />
            </div>
        </div>
        <div className='d-flex justify-content-center post-property-cnt'>
                <Button className="post-property-btn" rounded={true} height={48} text={"Post Property"} onClick={postProperty} />
            </div>
    </div>
}