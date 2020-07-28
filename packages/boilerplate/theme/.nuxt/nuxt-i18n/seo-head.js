import VueMeta from 'vue-meta'
import {
  COMPONENT_OPTIONS_KEY,
  LOCALE_CODE_KEY,
  LOCALE_ISO_KEY,
  MODULE_NAME,
  STRATEGIES,
  strategy
} from './options'

export const nuxtI18nSeo = function () {
  if (
    !(VueMeta.hasMetaInfo ? VueMeta.hasMetaInfo(this) : this._hasMetaInfo) ||
    !this.$i18n ||
    !this.$i18n.locale ||
    !this.$i18n.locales ||
    this.$options[COMPONENT_OPTIONS_KEY] === false ||
    (this.$options[COMPONENT_OPTIONS_KEY] && this.$options[COMPONENT_OPTIONS_KEY].seo === false)
  ) {
    return {}
  }

  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  }

  const currentLocale = this.$i18n.locales.find(l => codeFromLocale(l) === this.$i18n.locale)
  const currentLocaleIso = isoFromLocale(currentLocale)

  if (currentLocale && currentLocaleIso) {
    metaObject.htmlAttrs.lang = currentLocaleIso // TODO: simple lang or "specific" lang with territory?
  }

  addHreflangLinks.bind(this)(this.$i18n.locales, this.$i18n.__baseUrl, metaObject.link)
  addCanonicalLinks.bind(this)(currentLocale, this.$i18n.__baseUrl, metaObject.link)
  addCurrentOgLocale.bind(this)(currentLocale, currentLocaleIso, metaObject.meta)
  addAlternateOgLocales.bind(this)(this.$i18n.locales, currentLocaleIso, metaObject.meta)

  return metaObject
}

function addHreflangLinks (locales, baseUrl, link) {
  if (strategy === STRATEGIES.NO_PREFIX) {
    return
  }

  const localeMap = new Map()

  for (const locale of locales) {
    const localeIso = isoFromLocale(locale)

    if (!localeIso) {
      // eslint-disable-next-line no-console
      console.warn(`[${MODULE_NAME}] Locale ISO code is required to generate alternate link`)
      continue
    }

    const [language, region] = localeIso.split('-')

    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale)
    }

    localeMap.set(localeIso, locale)
  }

  for (const [iso, mapLocale] of localeMap.entries()) {
    link.push({
      hid: `alternate-hreflang-${iso}`,
      rel: 'alternate',
      href: baseUrl + this.switchLocalePath(mapLocale.code),
      hreflang: iso
    })
  }
}

function addCanonicalLinks (currentLocale, baseUrl, link) {
  if (strategy !== STRATEGIES.PREFIX_AND_DEFAULT) {
    return
  }

  const currentLocaleCode = codeFromLocale(currentLocale)
  const canonicalPath = this.switchLocalePath(currentLocaleCode)
  const canonicalPathIsDifferentFromCurrent = canonicalPath !== this.$route.path
  const shouldAddCanonical = canonicalPath && canonicalPathIsDifferentFromCurrent
  if (!shouldAddCanonical) {
    return
  }

  link.push({
    hid: `canonical-lang-${currentLocaleCode}`,
    rel: 'canonical',
    href: baseUrl + canonicalPath
  })
}

function addCurrentOgLocale (currentLocale, currentLocaleIso, meta) {
  const hasCurrentLocaleAndIso = currentLocale && currentLocaleIso

  if (!hasCurrentLocaleAndIso) {
    return
  }

  meta.push({
    hid: 'og:locale',
    property: 'og:locale',
    // Replace dash with underscore as defined in spec: language_TERRITORY
    content: underscoreIsoFromLocale(currentLocale)
  })
}

function addAlternateOgLocales (locales, currentLocaleIso, meta) {
  const localesWithoutCurrent = locales.filter(locale => {
    const localeIso = isoFromLocale(locale)
    return localeIso && localeIso !== currentLocaleIso
  })

  const alternateLocales = localesWithoutCurrent.map(locale => ({
    hid: `og:locale:alternate-${isoFromLocale(locale)}`,
    property: 'og:locale:alternate',
    content: underscoreIsoFromLocale(locale)
  }))

  meta.push(...alternateLocales)
}

function isoFromLocale (locale) {
  return locale[LOCALE_ISO_KEY]
}

function underscoreIsoFromLocale (locale) {
  return isoFromLocale(locale).replace(/-/g, '_')
}

function codeFromLocale (locale) {
  return locale[LOCALE_CODE_KEY]
}
