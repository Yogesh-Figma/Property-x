"use client"
import Login from "./login"
import AccountMenu from '@/app/accountMenu'
import Notification from '@/app/icons/notification.svg';
import NotificationMenu from '@/app/notificationMenu';
import NextLinkButton from '@/app/components/nextLinkButton';
import { signIn, signOut, useSession } from "next-auth/react";
import BuildProfile from "./buildProfile";

const UserAuthHeader = () => {
    const { data: session } = useSession();
    return (
        <>
            {session ?
                <><NotificationMenu /> <AccountMenu /></> :
                <><NextLinkButton rounded={true} height={26} text={"Login"} href={"?login=true"} />
                    <Login />
                </>}
            <BuildProfile />
        </>)
}

export default UserAuthHeader;