"use client"
import Image from 'next/image'
import React from 'react'
import Button from '@/app/components/button';
import Input from '@/app/components/input';
import EditPencil from "@/app/icons/edit_pencil.svg"
import './styles.scss'

export default ({ userProfileData }) => {
    const [formData, setFormData] = React.useState({
        fullName: userProfileData.fullName,
        email: userProfileData.email,
        mobileNo: userProfileData.mobileNo,
        aadharNo: userProfileData.aadharNo,
        panNo: userProfileData.panNo
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    return(<div className='my-profile'>
        <div className="profile-pic position-relative">
            <Image src={"/propertyStatsImg.jpeg"} width={120} height={120} />
            <EditPencil className='edit-pencil position-absolute cursor-pointer'/>
        </div>
        <div className='form'>
            <div className='d-flex form-row align-items-center'>
                <div className='sub-info'>Full Name</div>
                <div className='form-input'> <Input
                    rounded={true}
                    width={"100%"}
                    className='form-input'
                    label={""}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    height={40}
                /></div>
            </div>
            <div className='d-flex form-row align-items-center'>
                <div className='sub-info'>Email</div>
                <div className='form-input'> <Input
                    rounded={true}
                    width={"100%"}
                    className='form-input'
                    label={""}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    height={40}
                /></div>
            </div>
            <div className='d-flex form-row align-items-center'>
                <div className='sub-info'>Mobile No.</div>
                <div className='form-input'> <Input
                    rounded={true}
                    width={"100%"}
                    className='form-input'
                    label={""}
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    height={40}
                /></div>
            </div>
            <div className='d-flex form-row align-items-center'>
                <div className='sub-info'>Aadhaar No.</div>
                <div className='form-input'> <Input
                    rounded={true}
                    width={"100%"}
                    className='form-input'
                    label={"Aadhaar No."}
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                    height={40}
                /></div>
            </div>
            <div className='d-flex form-row align-items-center'>
                <div className='sub-info'>PAN No.</div>
                <div className='form-input'> <Input
                    rounded={true}
                    width={"100%"}
                    className='form-input'
                    label={"PAN No."}
                    name="panNo"
                    value={formData.panNo}
                    onChange={handleChange}
                    height={40}
                /></div>
            </div>
        </div>
        <div className='d-flex justify-content-end'>
            <Button rounded={true} height={40} text={"Update Information"}/>
        </div>
    </div>)
}