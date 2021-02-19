const composePlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = composePlugins([
  withBundleAnalyzer({
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
  }),
])
