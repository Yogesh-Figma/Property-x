import React from 'react'
import Profile from './profile';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getUserProfile } from '@/clients/profileClient'

export default async ({ }) => {
    const { user } = await getServerSession(authOptions)

    const userInfo = await getUserProfile(user.id);
    return (<Profile initialData={userInfo}/>)
}