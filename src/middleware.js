import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"


const SECRET = process.env.NEXTAUTH_SECRET;
const protectedRoutes = ['/post-a-property','/profile','/book'];
const matchers = [...protectedRoutes, '/buy']
const protectedQueryParams = ["?schedule="]
const regexMatches = [/\/post-a-property\/.*/, /\/profile\/.*/, /\/book\/.*/]

export async function middleware(req) {
    const searchParams = req.nextUrl.search || ""
    if (protectedRoutes.includes(req.nextUrl.pathname) || protectedQueryParams.some(x=> searchParams.indexOf(x) > -1) || regexMatches.some(x=> x.test(req.nextUrl.pathname))) {
        const token = await getToken({ req, SECRET })
        console.log("token", token);
        if (token == null) {
            const absoluteURL = new URL(`?login=true&nxtUrl=${encodeURIComponent(req.nextUrl.pathname)}`, req.nextUrl.origin);
            const response =  NextResponse.redirect(absoluteURL.toString());
            response.headers.set('x-middleware-cache', 'no-cache');
            response.headers.set('cache-control', 'no-store');
            return response;
        }
    }
    // if (!session && protectedRoutes.includes(req.nextUrl.pathname)) {
    //     const absoluteURL = new URL("?login=true", req.nextUrl.origin);
    //     return NextResponse.redirect(absoluteURL.toString());
    //   }
}

export const config = { matcher: matchers}