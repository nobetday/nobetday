import '@/common/firebase'

import { AppProps } from 'next/app'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'

import { PageHead } from '@/common/page-head'
import { uiConstants } from '@/common/ui-constants'
import { AuthContextProvider } from '@/user/auth-context'

const defaultSeoProps: DefaultSeoProps = {
  titleTemplate: `%s - ${uiConstants.appName}`,
  twitter: {
    handle: '@nobetday',
    cardType: 'summary',
  },
}

export const AppProvider = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthContextProvider>
      <PageHead />
      <DefaultSeo {...defaultSeoProps} />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
