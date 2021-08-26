import * as coreHelper from '@vue-storefront/core/helpers'
import config from 'config'

jest.mock('config', () => ({}))
jest.mock('@vue-storefront/core/helpers', () => ({
  get isServer () {
    return true
  }
}))

describe('Logger', () => {
  const isServerSpy = jest.spyOn((coreHelper as any).default, 'isServer', 'get')
  const consoleDebugSpy = jest.spyOn(console, 'debug')
  const consoleErrorSpy = jest.spyOn(console, 'error')
  const consoleInfoSpy = jest.spyOn(console, 'log')
  const consoleWarnSpy = jest.spyOn(console, 'warn')
  const env = process.env

  consoleDebugSpy.mockImplementation(() => {})
  consoleErrorSpy.mockImplementation(() => {})
  consoleInfoSpy.mockImplementation(() => {})
  consoleWarnSpy.mockImplementation(() => {})

  beforeEach(() => {
    jest.clearAllMocks()
    config.console = {
      verbosityLevel: 'display-everything',
      showErrorOnProduction: true
    }
    process.env = Object.assign({}, env)
  })

  it('can be initialized with default settings', () => {
    jest.isolateModules(() => {
      config.console = {}

      expect(require('../../logger').Logger).toBeTruthy()
    })
  })

  describe('convertToString', () => {
    it('serializes objects to string', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        expect(Logger.convertToString({ foo: 'bar' })).toBe('{"foo":"bar"}')
      })
    })

    it('extracts message from  complex objects (i.e. error)', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        expect(Logger.convertToString({ message: 'foo' })).toBe('foo')
      })
    })
    it('returns primitive payloads unchanged', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        expect(Logger.convertToString('foo')).toBe('foo')
        expect(Logger.convertToString(true)).toBe(true)
        expect(Logger.convertToString(1337)).toBe(1337)
      })
    })
  })

  describe('canPrint', () => {
    it('allows all types of logs when verbosity is set to display-everything in dev mode', () => {
      expect.assertions(4)

      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        for (let method of ['info', 'warn', 'error', 'debug']) {
          expect(Logger.canPrint(method)).toBeTruthy()
        }
      })
    })

    it('allows showing errors when verbosity is set to only-errors in dev mode', () => {
      jest.isolateModules(() => {
        config.console.verbosityLevel = 'only-errors'

        const Logger = require('../../logger').Logger

        expect(Logger.canPrint('error')).toBeTruthy()

        for (let method of ['info', 'warn', 'debug']) {
          expect(Logger.canPrint(method)).toBeFalsy()
        }
      })
    })

    it('allows showing errors when verbosity is set to only-errors in prod mode but showErrorOnProduction is set', () => {
      jest.isolateModules(() => {
        config.console.verbosityLevel = 'only-errors'
        process.env.NODE_ENV = 'production'

        const Logger = require('../../logger').Logger

        expect(Logger.canPrint('error')).toBeTruthy()

        for (let method of ['info', 'warn', 'debug']) {
          expect(Logger.canPrint(method)).toBeFalsy()
        }
      })
    })

    it('does not show any logs when verbosity is set to none', () => {
      jest.isolateModules(() => {
        config.console.verbosityLevel = 'none'

        const Logger = require('../../logger').Logger

        for (let method of ['info', 'warn', 'debug', 'error']) {
          expect(Logger.canPrint(method)).toBeFalsy()
        }
      })
    })
  })

  describe('debug', () => {
    it('doesn\'t display message if logger is configured not to log it', () => {
      jest.isolateModules(() => {
        config.console.verbosityLevel = 'none'

        const Logger = require('../../logger').Logger

        Logger.debug('test', null, null)()
        expect(consoleDebugSpy).not.toBeCalled()
      })
    })

    it('displays message without tag if none was given in SSR and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.debug('test')()
        expect(consoleDebugSpy).toBeCalledWith('test', null)
      })
    })

    it('displays message with tag if one was given in SSR and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.debug('test', 'tag')()
        expect(consoleDebugSpy).toBeCalledWith('[tag] test', null)
      })
    })

    it('displays message without tag given no tag and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.debug('test')()
        expect(consoleDebugSpy).toBeCalledWith(
          '%cVSF%c test',
          expect.anything(),
          expect.anything(),
          null
        )
      })
    })

    it('displays message with tag given a tag and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.debug('test', 'tag')()
        expect(consoleDebugSpy).toBeCalledWith(
          '%cVSF%c %ctag%c test',
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
          null
        )
      })
    })
  })

  describe('log', () => {
    it('works as an alias of info', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.log('test')()
        expect(consoleInfoSpy).toBeCalled()
      })
    })

    it('can be called with custom tag and context', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.log('test', 'tag', 'context')()
        expect(consoleInfoSpy).toBeCalledWith(
          '%cVSF%c %ctag%c test',
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
          'context'
        )
      })
    })
  })

  describe('info', () => {
    it('doesn\'t display message if logger is configured not to log it', () => {
      jest.isolateModules(() => {
        config.console.verbosityLevel = 'none'

        const Logger = require('../../logger').Logger

        Logger.info('test', null, null)()
        expect(consoleInfoSpy).not.toBeCalled()
      })
    })

    it('displays message without tag if none was given in SSR and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.info('test')()
        expect(consoleInfoSpy).toBeCalledWith('test', null)
      })
    })

    it('displays message with tag if one was given in SSR and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.info('test', 'tag')()
        expect(consoleInfoSpy).toBeCalledWith('[tag] test', null)
      })
    })

    it('displays message without tag given no tag and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.info('test')()
        expect(consoleInfoSpy).toBeCalledWith(
          '%cVSF%c test',
          expect.anything(),
          expect.anything(),
          null
        )
      })
    })

    it('displays message with tag given a tag and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.info('test', 'tag')()
        expect(consoleInfoSpy).toBeCalledWith(
          '%cVSF%c %ctag%c test',
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
          null
        )
      })
    })
  })

  describe('warn', () => {
    it('doesn\'t display message if logger is configured not to log it', () => {
      jest.isolateModules(() => {
        config.console.verbosityLevel = 'none'

        const Logger = require('../../logger').Logger

        Logger.warn('test', null, null)()
        expect(consoleWarnSpy).not.toBeCalled()
      })
    })

    it('displays message without tag if none was given in SSR and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.warn('test')()
        expect(consoleWarnSpy).toBeCalledWith('test', null)
      })
    })

    it('displays message with tag if one was given in SSR and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.warn('test', 'tag')()
        expect(consoleWarnSpy).toBeCalledWith('[tag] test', null)
      })
    })

    it('displays message without tag given no tag and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.warn('test')()
        expect(consoleWarnSpy).toBeCalledWith(
          '%cVSF%c test',
          expect.anything(),
          expect.anything(),
          null
        )
      })
    })

    it('displays message with tag given a tag and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.warn('test', 'tag')()
        expect(consoleWarnSpy).toBeCalledWith(
          '%cVSF%c %ctag%c test',
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
          null
        )
      })
    })
  })

  describe('error', () => {
    it('always displays messages in SSR', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.error('test')()
        expect(consoleErrorSpy).toBeCalled()
      })
    })

    it('displays message with tag if one was given in SSR and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        const Logger = require('../../logger').Logger

        Logger.error('test', 'tag')()
        expect(consoleErrorSpy).toBeCalledWith('[tag] test', null)
      })
    })

    it('doesn\'t display message if logger is configured not to log it and not in SSR mode', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        config.console.verbosityLevel = 'none'

        const Logger = require('../../logger').Logger

        Logger.error('test', null, null)()
        expect(consoleErrorSpy).not.toBeCalled()
      })
    })

    it('displays message without tag given no tag and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.error('test')()
        expect(consoleErrorSpy).toBeCalledWith(
          '%cVSF%c test',
          expect.anything(),
          expect.anything(),
          null
        )
      })
    })

    it('displays message with tag given a tag and logger is configured to log everything', () => {
      jest.isolateModules(() => {
        isServerSpy.mockReturnValueOnce(false)
        const Logger = require('../../logger').Logger

        Logger.error('test', 'tag')()
        expect(consoleErrorSpy).toBeCalledWith(
          '%cVSF%c %ctag%c test',
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
          null
        )
      })
    })
  })
})
