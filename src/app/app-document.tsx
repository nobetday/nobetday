import Document, { Head, Html, Main, NextScript } from 'next/document'

export class AppDocument extends Document {
  render() {
    return (
      <Html className='has-navbar-fixed-top'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
