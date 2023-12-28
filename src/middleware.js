import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
import postedProperties from './app/profile/postedProperties';


const SECRET = process.env.NEXTAUTH_SECRET;
const protectedRoutes = ['/post','/profile'];

export async function middleware(req) {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
        const token = await getToken({ req, SECRET })
        if (token == null) {
            const absoluteURL = new URL("?login=true", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString(), 302);
        }
    }
    // if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    //     const absoluteURL = new URL("?login=true", req.nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString());
    //   }
}

export const config = { matcher: protectedRoutes }