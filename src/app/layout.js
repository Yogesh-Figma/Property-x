import './globals.css'
import localFont from 'next/font/local'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from './footer';
import Header from './header'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { AppProvider } from "@/lib/appContext";

const helveticaBold = localFont({ src: './fonts/Helvetica-Bold-Font.ttf', variable: '--helvetica-bold-font' })
const helveticaRegular = localFont({ src: './fonts/Helvetica_Regular.otf', variable: '--helvetica-regular-font' })
const microsoftSans = localFont({ src: './fonts/micross.ttf', variable: '--microsoft-sans-font' })

export const metadata = {
  title: 'Go Propify',
  description: 'Prime Property Deals at Your Fingertips. The Ultimate Property Booking Destination',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body style={{
        '--bs-body-color': '#4D5156',
        '--bs-body-font-family': microsoftSans.style.fontFamily,
        '--helvetica-bold-font': helveticaBold.style.fontFamily,
        '--helvetica-regular-font': helveticaRegular.style.fontFamily,
        '--microsoft-sans-font': microsoftSans.style.fontFamily,
        '--text-color-crimson': '#DC143C',
        '--text-color-shark': '#202124',
        '--text-color-abbey': '#4D5156',
        '--bs-body-font-size': 'clamp(12px, 1.5vw, 1rem)',
        display: "unset"
      }}>
        <AppProvider session={session}>
          <>
            <Header />
            {children}
          </>
        </AppProvider>
        <Footer />
      </body>
    </html>
  )
}
