# Logging

In Vue Storefront we're providing all the debugging information, warnings, and errors from composables out of the box so you won't miss anything that happens inside your application.  In this document you will learn how to use our logger in your app and how to connect it with external services.

## Using logger in your app

To make use of Vue Storefront logger simply import it from the core and use one of 4 available types of messages

```js
import { Logger } from '@vue-storefront/core'

Logger.error('error message')
Logger.info('info message')
Logger.warn('warn message')
Logger.debug('debug message')
```

## Changing verbosity

Configuration of logger happens through `logger` property of `@vue-storefront/nuxt` module. 

You can set the `verbosity` level which tells the app, what you want to log and what communications you want to ignore. By default we have the following verbosity levels:

- `debug` - log everything, including debug calls, information, warnings, and errors (all of the logger functions can be called),
- `info` - log information, warnings, and errors (debug function calling is skipped),
- `warn` - log warnings and errors (debug and info functions are skipped),
- `error` - log only errors (debug, warn and info functions are skipped),
- `none` - don't log anything.

```js
['@vue-storefront/nuxt', {
  logger: {
    verbosity: 'error'
  }
}]
```

If not explicitly changed, logging level depends on current environment variable `NODE_ENV`:

- `development` or `dev` defaults to `warn`,
- `production` or `prod` defaults to `error`,
- `test` defaults to `none`,
- any other defaults to `warn`

## Writing custom loggers

By default we're printing all the events happening in the app in the console  but you can easily write a new logger and use a third-party library (like `consola`) or pass the logs to external service like `Sentry.io`

To override the default logger simply pass a function to the `logger.customLogger` property of `@vue-storefront/nuxt` module. This function returns the logger object and as an argument, you have access to the `verbosity` level.

If you are using our nuxt module, setting up the logger is much simpler. All you have to do is just provide the configuration to the module:


```js
['@vue-storefront/nuxt', {
  logger: { 
    verbosity: 'error',
    customLogger: (verbosity) => {
      console.log('Current verbosity level is:', verbosity)
      return {
        debug: (message: any, ...args) => console.debug('[VSF][debug]', message, ...args),
        info: (message: any, ...args) => console.info('[VSF][info]', message, ...args),
        warn: (message: any, ...args) => console.warn('[VSF][warn]', message, ...args),
        error: (message: any, ...args) => console.error('[VSF][error]', message, ...args),
      }
    }
  }
}]
```
::: details Configuring logger outside Vue Storefront Nuxt module
If for some reason you can't configure logger through `@vue-storefront/nuxt` module you can explicitly use `registerLogger` function:

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
:::
