// eslint-disable-next-line unicorn/prefer-node-protocol
import path from 'path'
import {Hook} from '@oclif/core'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import getLocale from 'os-locale'

const init: Hook<'init'> = async (): Promise<void> => {
  await i18next.use(Backend).init({
    backend: {
      // eslint-disable-next-line unicorn/prefer-module
      loadPath: path.resolve(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
    },
    fallbackLng: 'en-US',
    interpolation: {
      // Escaping is only required to prevent XSS attacks in the front-end.
      escapeValue: false,
    },
    lng: await getLocale(),
  })

  console.log('init was calld')
}

export default init
