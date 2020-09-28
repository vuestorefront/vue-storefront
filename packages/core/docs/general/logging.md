# Logging

A logging error, debugging information, and warnings are a very common case during development and future monitoring of the application. In the Vue Storefront core, you can catch everything you need to screen what is happening inside of your app.


## Logger interface and configuring

Our default implementation uses simple `console` calls, but you are not forced to use it permanently, there is a way to override it or even provide your logger that fit your needs.

To configure and register logger, you need to call `registerLogger` function and pass all of the required functions you need to override.

```ts
import { registerLogger } from '@vue-storefront/core'

const myLogger = {
  debug: (message: any, ...args) => console.debug('[VSF][debug]', message, ...args),
  info: (message: any, ...args) => console.info('[VSF][info]', message, ...args),
  warn: (message: any, ...args) => console.warn('[VSF][warn]', message, ...args),
  error: (message: any, ...args) => console.error('[VSF][error]', message, ...args),
}

const verbosity = 'error'

registerLogger(myLogger, verbosity);
```

Additionally, you can also set the `verbosity` level which tells the app, what you want to log and what communications you want to ignore. By default we have the following verbosity levels:

- `debug` - log everything, including debug calls, information, warnings, and errors (all of the logger functions can be called)
- `info` - log information, warnings, and errors (debug function calling is skipped)
- `warn` - log warnings and errors (debug and info functions are skipped)
- `error` - log only errors (debug, warn and info functions are skipped)
- `none` - don't log anything

If for some reason you need to write your completely custom logger, with your own verbosity reaction as well, you can pass a function to the `registerLogger` instead. This function returns the logger object and as an argument, you have access to the `verbosity` level.

```ts
const logger = (verbosity) => {
 // current verbosity available here

 return {
   debug: (message: any, ...args) => console.debug('[VSF][debug]', message, ...args),
   info: (message: any, ...args) => console.info('[VSF][info]', message, ...args),
   warn: (message: any, ...args) => console.warn('[VSF][warn]', message, ...args),
   error: (message: any, ...args) => console.error('[VSF][error]', message, ...args),
 }
}

const verbosity = 'error'


registerLogger(logger, verbosity);
```

## Configuring with nuxt

If you are using our nuxt module, setting up the logger is much simpler. All you have to do is just provide the configuration to the module:

```
['@vue-storefront/nuxt', {
  coreDevelopment: true,
  logger: { // new section here
    verbosity: 'error' // verbosity
    customLogger: logger // your own implementation as function

    // Overriding single functions:
    // debug
    // info
    // warn
    // error
  },
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
}]
```

There is a dedicated section called `logger` that's responsible for logger configuration, with possible options:

- `verbosity` - sets the verbosity level
- `debug`, `info`, `warn`, `error` - you are able to provide each of these functions or even all of them, with keeping default verbosity implementation.
- `customLogger` - if you provide this property, you are overriding the original logger with your custom one.

## Usage in the code

To use logger you need to only import Logger from the core package and call the corresponding to the message function you need.

```js
import { Logger } from '@vue-storefront/core'

Logger.error('error message')
Logger.info('info message')
Logger.warn('warn message')
Logger.debug('debug message')
```
