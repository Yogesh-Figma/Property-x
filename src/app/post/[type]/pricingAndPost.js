import React from 'react'
import Heading from '@/app/components/heading';
import Input from '@/app/components/input';
import Image from 'next/image';
import Button from "@/app/components/button";
import { useForm } from "react-hook-form";

export default ({ formData, handleChange, postProperty }) => {

    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({
        reValidateMode: "onBlur"
    });


    const handleChangeWrapper = (event) => {
        const { name, value } = event.target;
        setValue(name, value);
        handleChange(event);
    }

    return <div className="pricing-and-post">
        <Heading label={"Add Price Details"} />
        <div className='d-block d-lg-flex'>
            <div className='property-cost-cnt'>
                <div className="form-element-heading">Cost</div>
                <Input
                    control={control}
                    errorMessage={"Required"}
                    required={true}
                    isNumber={true}
                    rounded={true}
                    width={"367px"}
                    className='form-input'
                    label={""}
                    name="price"
                    value={formData.price}
                    onChange={handleChangeWrapper}
                    height={40}
                    startAdornment={
                        <span className="rupee-icon">
                            ₹
                        </span>
                    }
                />
            </div>
            <div className='undraw-sale d-none d-lg-inline-block'>
                <Image src={"/undrawSale.svg"} width={480} height={239} />
            </div>
        </div>
        <div className='d-flex justify-lg-content-center justify-content-end post-property-cnt'>
                <Button className="post-property-btn" rounded={true} height={48} text={"Post Property"} onClick={handleSubmit(postProperty, ()=>{})} />
        </div>
    </div>
}