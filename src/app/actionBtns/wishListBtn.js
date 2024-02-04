"use client"
import React from 'react'
import HeartIcon from '@/app/icons/heart.svg'
import { postWishlist, getUserWishlist } from '@/clients/wishlistClient';
import { signIn, signOut, useSession } from "next-auth/react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from 'react-query';



const WishListBtn = ({ width = 22, height = 20, id, isProperty, isWished, className = "" }) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const getUserWishlistData = async () => {
        const wishlistIds = new Set();
        if (session != null) {
            const response = await getUserWishlist(session.user.id, session.token);
            (response || []).forEach(element => {
                wishlistIds.add((element.property || element.project)["id"]);
            });
        }
        return wishlistIds;
    };

    const { data: userWishListIds } = useQuery({ enabled: !!session && !isWished, queryKey: ['postWishlist'], queryFn: () => getUserWishlistData(), initialData: new Set() });

    const postAWishtList = async () => {
        if (userWishListIds.has(id) || isWished) {
            return;
        }

        if (!session) {
            return router.push('?login=true');
        }
        else {
            const reqObj = {
                "exclusive": true
            }
            reqObj[isProperty ? "propertyId" : "projectId"] = id;
            try {
                await postWishlist(session.user.id, reqObj, session.token);
            }
            catch (e) { }
        }
        queryClient.invalidateQueries('postWishlist');
        setOpen(true);
    }


    return (<><HeartIcon width={width} height={height} onClick={postAWishtList} className={className + " heart-icon " + (userWishListIds.has(id) || isWished ? "filled" : "cursor-pointer ")} />
        <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
            <Alert
                onClose={() => setOpen(false)}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}>
                <AlertTitle>Wishlist successfully updated</AlertTitle>
            </Alert>
        </Snackbar>
    </>)
}

export default WishListBtn;