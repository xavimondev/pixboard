import Head from 'next/head'

export function SeoHeader() {
  return (
    <Head>
      <title>Pixboard.io - A realtime collaboration tool for editing images</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content='A realtime collaboration tool for editing images' />
      <meta name='theme-color' content='#0d1117' />
      <link rel='icon' href='/icon/favicon.ico' />
      <meta property='og:url' content='https://pixboard.netlify.app/' />
      <meta property='og:type' content='website' />
      <meta
        property='og:title'
        content='Pixboard.io - A realtime collaboration tool for editing images'
      />
      <meta property='og:description' content='A realtime collaboration tool for editing images' />
      <meta property='og:image' content='https://pixboard.netlify.app/ogimage.jpg' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@xavimonp' />
      <meta name='twitter:creator' content='@xavimonp' />
      <meta
        name='twitter:title'
        content='pixboard.io - A realtime collaboration tool for editing images'
      />
      <meta name='twitter:description' content='A realtime collaboration tool for editing images' />
    </Head>
  )
}
