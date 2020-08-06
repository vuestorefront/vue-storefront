import Cookie from 'cookie'
import JsCookie from 'js-cookie'

/**
 * Parses locales provided from browser through `accept-language` header.
 * @param {string} input
 * @return {string[]} An array of locale codes. Priority determined by order in array.
 */
export const parseAcceptLanguage = input => {
  // Example input: en-US,en;q=0.9,nb;q=0.8,no;q=0.7
  // Contains tags separated by comma.
  // Each tag consists of locale code (2-3 letter language code) and optionally country code
  // after dash. Tag can also contain score after semicolon, that is assumed to match order
  // so it's not explicitly used.
  return input.split(',').map(tag => tag.split(';')[0])
}

/**
 * Find locale code that best matches provided list of browser locales.
 * @param {string[]} appLocales The user-configured locale codes that are to be matched.
 * @param {string[]} browserLocales The locales to match against configured.
 * @return {string?}
 */
export const matchBrowserLocale = (appLocales, browserLocales) => {
  /** @type {{ code: string, score: number }[]} */
  const matchedLocales = []

  // First pass: match exact locale.
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedCode = appLocales.find(appCode => appCode.toLowerCase() === browserCode.toLowerCase())
    if (matchedCode) {
      matchedLocales.push({ code: matchedCode, score: 1 - index / browserLocales.length })
      break
    }
  }

  // Second pass: match only locale code part of the browser locale (not including country).
  for (const [index, browserCode] of browserLocales.entries()) {
    if (browserCode.includes('-')) {
      // For backwards-compatibility, this is lower-cased before comparing.
      const languageCode = browserCode.split('-')[0].toLowerCase()

      if (appLocales.includes(languageCode)) {
        // Deduct a thousandth for being non-exact match.
        matchedLocales.push({ code: languageCode, score: 0.999 - index / browserLocales.length })
        break
      }
    }
  }

  // Sort the list by score (0 - lowest, 1 - highest).
  if (matchedLocales.length > 1) {
    matchedLocales.sort((localeA, localeB) => {
      if (localeA.score === localeB.score) {
        // If scores are equal then pick more specific (longer) code.
        return localeB.code.length - localeA.code.length
      }

      return localeB.score - localeA.score
    })
  }

  return matchedLocales.length ? matchedLocales[0].code : null
}

/**
 * Resolves base URL value if provided as function. Otherwise just returns verbatim.
 * @param {string | function} baseUrl
 * @param {import('@nuxt/types').Context} context
 * @return {string}
 */
export const resolveBaseUrl = (baseUrl, context) => {
  if (typeof baseUrl === 'function') {
    return baseUrl(context)
  }

  return baseUrl
}

/**
 * Get locale code that corresponds to current hostname
 * @param  {object} locales
 * @param  {object} [req] Request object
 * @param  {{ localDomainKey: string, localeCodeKey: string }} options
 * @return {string | null} Locade code found if any
 */
export const getLocaleDomain = (locales, req, { localDomainKey, localeCodeKey }) => {
  const hostname = process.client ? window.location.hostname : (req.headers['x-forwarded-host'] || req.headers.host)

  if (hostname) {
    const localeDomain = locales.find(l => l[localDomainKey] === hostname)
    if (localeDomain) {
      return localeDomain[localeCodeKey]
    }
  }

  return null
}

/**
 * Creates getter for getLocaleFromRoute
 * @param  {string[]} localeCodes
 * @param  {{ routesNameSeparator: string, defaultLocaleRouteNameSuffix: string }} options
 * @return {(route) => string| null}
 */
export const createLocaleFromRouteGetter = (localeCodes, { routesNameSeparator, defaultLocaleRouteNameSuffix }) => {
  const localesPattern = `(${localeCodes.join('|')})`
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, 'i')
  const regexpPath = new RegExp(`^/${localesPattern}/`, 'i')

  /**
   * Extract locale code from given route:
   * - If route has a name, try to extract locale from it
   * - Otherwise, fall back to using the routes'path
   * @param  {Object} route
   * @param  {string[]} localeCodes
   * @param  {{ routesNameSeparator: string, defaultLocaleRouteNameSuffix: string }} options
   * @return {string | null} Locale code found if any
   */
  const getLocaleFromRoute = route => {
    // Extract from route name
    if (route.name) {
      const matches = route.name.match(regexpName)
      if (matches && matches.length > 1) {
        return matches[1]
      }
    } else if (route.path) {
      // Extract from path
      const matches = route.path.match(regexpPath)
      if (matches && matches.length > 1) {
        return matches[1]
      }
    }

    return null
  }

  return getLocaleFromRoute
}

/**
 * @param {object} [req]
 * @param {{ useCookie: boolean, localeCodes: string[], cookieKey: string}} options
 * @return {string | void}
 */
export const getLocaleCookie = (req, { useCookie, cookieKey, localeCodes }) => {
  if (useCookie) {
    let localeCode

    if (process.client) {
      localeCode = JsCookie.get(cookieKey)
    } else if (req && typeof req.headers.cookie !== 'undefined') {
      const cookies = req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
      localeCode = cookies[cookieKey]
    }

    if (localeCodes.includes(localeCode)) {
      return localeCode
    }
  }
}

/**
 * @param {string} locale
 * @param {object} [res]
 * @param {{ useCookie: boolean, cookieDomain: string, cookieKey: string}} options
 */
export const setLocaleCookie = (locale, res, { useCookie, cookieDomain, cookieKey }) => {
  if (!useCookie) {
    return
  }
  const date = new Date()
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: '/',
    sameSite: 'lax'
  }

  if (cookieDomain) {
    cookieOptions.domain = cookieDomain
  }

  if (process.client) {
    JsCookie.set(cookieKey, locale, cookieOptions)
  } else if (res) {
    let headers = res.getHeader('Set-Cookie') || []
    if (typeof headers === 'string') {
      headers = [headers]
    }

    const redirectCookie = Cookie.serialize(cookieKey, locale, cookieOptions)
    headers.push(redirectCookie)

    res.setHeader('Set-Cookie', headers)
  }
}

export const registerStore = (store, vuex, localeCodes, moduleName) => {
  store.registerModule(vuex.moduleName, {
    namespaced: true,
    state: () => ({
      ...(vuex.syncLocale ? { locale: '' } : {}),
      ...(vuex.syncMessages ? { messages: {} } : {}),
      ...(vuex.syncRouteParams ? { routeParams: {} } : {})
    }),
    actions: {
      ...(vuex.syncLocale ? {
        setLocale ({ commit }, locale) {
          commit('setLocale', locale)
        }
      } : {}),
      ...(vuex.syncMessages ? {
        setMessages ({ commit }, messages) {
          commit('setMessages', messages)
        }
      } : {}),
      ...(vuex.syncRouteParams ? {
        setRouteParams ({ commit }, params) {
          if (process.env.NODE_ENV === 'development') {
            validateRouteParams(params, localeCodes, moduleName)
          }
          commit('setRouteParams', params)
        }
      } : {})
    },
    mutations: {
      ...(vuex.syncLocale ? {
        setLocale (state, locale) {
          state.locale = locale
        }
      } : {}),
      ...(vuex.syncMessages ? {
        setMessages (state, messages) {
          state.messages = messages
        }
      } : {}),
      ...(vuex.syncRouteParams ? {
        setRouteParams (state, params) {
          state.routeParams = params
        }
      } : {})
    },
    getters: {
      ...(vuex.syncRouteParams ? {
        localeRouteParams: ({ routeParams }) => locale => routeParams[locale] || {}
      } : {})
    }
  }, { preserveState: !!store.state[vuex.moduleName] })
}

/**
 * Dispatch store module actions to keep it in sync with app's locale data
 * @param  {Store} store     Vuex store
 * @param  {String} locale   Current locale
 * @param  {Object} messages Current messages
 * @param  {{ vuex: object }} options
 * @return {Promise(void)}
 */
export const syncVuex = async (store, locale = null, messages = null, { vuex }) => {
  if (vuex && store) {
    if (locale !== null && vuex.syncLocale) {
      await store.dispatch(vuex.moduleName + '/setLocale', locale)
    }
    if (messages !== null && vuex.syncMessages) {
      await store.dispatch(vuex.moduleName + '/setMessages', messages)
    }
  }
}

const isObject = value => value && !Array.isArray(value) && typeof value === 'object'

/**
 * Validate setRouteParams action's payload
 * @param {object} routeParams The action's payload
 * @param {string[]} localeCodes
 * @param {string} moduleName
 */
export const validateRouteParams = (routeParams, localeCodes, moduleName) => {
  if (!isObject(routeParams)) {
    // eslint-disable-next-line no-console
    console.warn(`[${moduleName}] Route params should be an object`)
    return
  }

  for (const [key, value] of Object.entries(routeParams)) {
    if (!localeCodes.includes(key)) {
    // eslint-disable-next-line no-console
      console.warn(`[${moduleName}] Trying to set route params for key ${key} which is not a valid locale`)
    } else if (!isObject(value)) {
    // eslint-disable-next-line no-console
      console.warn(`[${moduleName}] Trying to set route params for locale ${key} with a non-object value`)
    }
  }
}
