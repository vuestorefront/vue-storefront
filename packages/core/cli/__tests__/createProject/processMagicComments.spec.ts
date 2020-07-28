import processMagicComments from '../../src/scripts/createProject/processMagicComments';

const magicCommentsFile = `
import webpack from 'webpack';
import { config } from './plugins/commercetools-config.js';

const localeNames = config.locales.map(l => ({ code: l.name, file: 'abc.js', iso: l.name }));

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport',
        content: 'width=device-width, initial-scale=1' },
      { hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    './plugins/commercetools.js'
  ],
  router: {
    middleware: ['commercetools', 'checkout']
  },
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      apiClient: '@vue-storefront/commercetools-api',
      composables: '@vue-storefront/commercetools'
    }]
    // @core-development-only-end
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt'
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },
  i18n: {
    locales: localeNames,
    defaultLocale: localeNames[0].code,
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: localeNames[0].code
    },
    detectBrowserLanguage: {
      cookieKey: config.cookies.localeCookieName,
      alwaysRedirect: true
    }
  }
};

`;

const projectOnlyCommmentsFile = `
/* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */`;

import { writeFileSync, readFileSync } from 'fs';

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => magicCommentsFile),
  writeFileSync: jest.fn()
}));

describe('[vsf-next-cli] processMagicComments', () => {
  it('removes magic comments from the file', async () => {

    const absoluteFilePath = 'nuxt.config.js';

    // I removed magic comments in the const below
    const expectedFileContent = `
import webpack from 'webpack';
import { config } from './plugins/commercetools-config.js';

const localeNames = config.locales.map(l => ({ code: l.name, file: 'abc.js', iso: l.name }));

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport',
        content: 'width=device-width, initial-scale=1' },
      { hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    './plugins/commercetools.js'
  ],
  router: {
    middleware: ['commercetools', 'checkout']
  },
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    ['@vue-storefront/nuxt', {
      useRawSource: {
        dev: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ]
      }
    }],
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt'
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },
  i18n: {
    locales: localeNames,
    defaultLocale: localeNames[0].code,
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: localeNames[0].code
    },
    detectBrowserLanguage: {
      cookieKey: config.cookies.localeCookieName,
      alwaysRedirect: true
    }
  }
};

`;
    await processMagicComments(absoluteFilePath);
    expect(writeFileSync).toHaveBeenCalledWith(absoluteFilePath, expectedFileContent);

  });

  it('uncomments parts inside "project only" comments', async () => {

    const absoluteFilePath = 'nuxt.config.js';
    (readFileSync as jest.Mock).mockClear();
    (readFileSync as jest.Mock).mockImplementation(() => projectOnlyCommmentsFile);

    // I removed magic comments in the const below
    const expectedFileContent = `
    ['@vue-storefront/nuxt-theme'],`;

    await processMagicComments(absoluteFilePath);

    expect(writeFileSync).toHaveBeenCalledWith(absoluteFilePath, expectedFileContent);

  });
});
