module.exports = {
  images: {
    domains: ['dtszrqr6lxc1q.cloudfront.net'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/about',
        permanent: true,
      },
    ]
  },
}
