import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { SeoHeader } from '@/components/seo-header'

export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <SeoHeader />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
