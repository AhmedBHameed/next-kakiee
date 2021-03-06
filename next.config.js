module.exports = {
  publicRuntimeConfig: {
    mapboxApiAccessToken:
      'pk.eyJ1IjoiYWhtZWRiaGFtZWVkIiwiYSI6ImNrNmNpd3M3ZzExZXMza21neGoxNHJoeDcifQ.07EbC691qPVJ86uLhJyfWA',
    domain: `${process.env.NODE_ENV === 'production' ? 'https://www.ahmedhameed.dev' : 'http://localhost:5000'}`,
    graphqlApi: '/nodeys/v1/graphql',
    uploadApi: '/nodeys/api/upload',
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string' ? process.env.LOCALE_SUBPATHS : 'none',
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: ['assets.vercel.com'],
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  webpack: config => {
    config.node = {
      fs: 'empty',
    };
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   include: [require('path').resolve(__dirname, 'statics')],
    //   use: ['@svgr/webpack'],
    // });

    return config;
  },
};
