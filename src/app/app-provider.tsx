import { AppProps } from 'next/app'

export const AppProvider = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}
