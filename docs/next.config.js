const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

module.exports = withNextra({
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
})
