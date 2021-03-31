import '@/common/firebase'

import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import { AuthContextProvider } from '@/user/auth-context'

export const AppProvider = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthContextProvider>
      <DefaultSeo
        openGraph={{
          type: 'website',
          site_name: 'No Bet Day',
        }}
        twitter={{
          handle: '@nobetday',
          site: '@nobetday',
          cardType: 'summary',
        }}
      />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
