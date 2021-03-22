import { AppProps } from 'next/app'

import { AuthContextProvider } from '@/user/auth-context'

export const AppProvider = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
