const isProd = process.env.NODE_ENV === 'production'

export const serverModules = [
  'src/modules/robots'
  // ['src/modules/compress', { enabled: isProd }]
]

export const configProvider = require('icmaa-config/configProvider')
