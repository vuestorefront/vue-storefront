import {
  LOCALE_CODE_KEY,
  LOCALE_FILE_KEY,
  MODULE_NAME
} from './options'

/**
 * Asynchronously load messages from translation files
 * @param  {Context}  context  Nuxt context
 * @param  {String}   locale  Language code to load
 */
export async function loadLanguageAsync (context, locale) {
  const { app } = context

  if (!app.i18n.loadedLanguages) {
    app.i18n.loadedLanguages = []
  }

  if (!app.i18n.loadedLanguages.includes(locale)) {
    const langOptions = app.i18n.locales.find(l => l[LOCALE_CODE_KEY] === locale)
    if (langOptions) {
      const file = langOptions[LOCALE_FILE_KEY]
      if (file) {
        // Hiding template directives from eslint so that parsing doesn't break.
        /*  */
      } else {
        // eslint-disable-next-line no-console
        console.warn(`[${MODULE_NAME}] Could not find lang file for locale ${locale}`)
      }
    }
  }
}
