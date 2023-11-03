/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    experimental: {
        scrollRestoration: true,
      },
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"**",
            }
        ]
    }, 
    loaders: [{
        test: /\.html$/,
        loader: 'html-loader?attrs[]=video:src'
      }, {
        test: /\.mp4$/,
        loader: 'url?limit=10000&mimetype=video/mp4'
    }]
},nextConfig
