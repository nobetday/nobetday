import { config as fontawesomeConfig, dom as fontawesomeDom } from '@fortawesome/fontawesome-svg-core'
import NextHead from 'next/head'
import { FunctionComponent, memo } from 'react'

// Fix huge icon flash https://github.com/FortAwesome/react-fontawesome/issues/284
fontawesomeConfig.autoAddCss = true

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export const PageHead: FunctionComponent = memo(() => {
  return (
    <NextHead>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <style type='text/css'>{fontawesomeDom.css()}</style>
      {!!plausibleDomain && (
        <script async defer data-domain={plausibleDomain} src='https://plausible.io/js/plausible.js'></script>
      )}
    </NextHead>
  )
})
