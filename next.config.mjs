/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'd2eebw31vcx88p.cloudfront.net' },
      { protocol: 'https', hostname: 'blaistenio.vtexassets.com' },
      { protocol: 'https', hostname: 'griferiapeirano.com' },
      { protocol: 'https', hostname: 'grupocanarias.com.ar' },
      { protocol: 'https', hostname: 'http2.mlstatic.com' },
      { protocol: 'https', hostname: 'mla-s2-p.mlstatic.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
}

export default nextConfig
