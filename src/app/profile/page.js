import React from 'react'
import Profile from './profile';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getUserProfile } from '@/clients/profileClient'

export default async ({ }) => {
    const { user } = await getServerSession(authOptions)

    const userInfo = (await getUserProfile(user.id))[0] || {}

    const userProfileData = {
        ...userInfo,
        firstName: userInfo.user?.firstName,
        lastName:userInfo.user?.lastName,
        fullName: userInfo.user?.firstName + " "+ userInfo.user?.lastName,
        email: userInfo.user?.email,
        phone: userInfo.user?.phone,
        aadharNo: userInfo.aadhar,
        panNo: userInfo.pan,
        photo:userInfo.user?.photo,
    }
    
    return (<Profile userProfileData={userProfileData}/>)
}