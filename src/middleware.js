import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
import postedProperties from './app/profile/postedProperties';


const SECRET = process.env.NEXTAUTH_SECRET;
const protectedRoutes = ['/post','/profile','/booking'];
const matchers = [...protectedRoutes, '/buy']
const protectedQueryParams = ["?schedule="]

export async function middleware(req) {
    const searchParams = req.nextUrl.search || ""
    if (protectedRoutes.includes(req.nextUrl.pathname) || protectedQueryParams.some(x=> searchParams.indexOf(x) > -1)) {
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

export const config = { matcher: matchers }