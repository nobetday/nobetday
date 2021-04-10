import '@/common/firebase'

import { AppProps } from 'next/app'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'

import { PageHead } from '@/common/page-head'
import { uiConstants } from '@/common/ui-constants'
import { AuthContextProvider } from '@/user/auth-context'

const defaultSeoProps: DefaultSeoProps = {
  titleTemplate: `%s - ${uiConstants.appName}`,
  openGraph: {
    url: 'https://nobetday-git-fix-correct-image-in-preview-link-nodelead.vercel.app/'
  },
  twitter: {
    handle: '@nobetday',
    cardType: 'summary_large_image',
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
