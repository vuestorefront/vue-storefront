const i18nRedirectsUtil = ({
  path,
  defaultLocale,
  availableLocales,
  cookieLocale,
  acceptedLanguages
}: {
  path: string;
  defaultLocale: string;
  cookieLocale: string;
  availableLocales: string[];
  acceptedLanguages: string[];
}): {
  getRedirectPath: () => string;
  getTargetLocale: () => string;
} => {
  const arrayFromPath = path.split('/').filter(String);
  const localeCandidate = arrayFromPath[0];
  const isLocaleAvailable = (locale: string): boolean => availableLocales.includes(locale);
  const strippedLocaleFromPath = isLocaleAvailable(localeCandidate) ? `/${arrayFromPath.slice(1).join('/')}` : path;
  const localeFromPath = isLocaleAvailable(localeCandidate) ? localeCandidate : '';
  const removeTailingSlash = (path: string): string => path.replace(/\/$/, '');

  const getTargetLocale = (): string => {
    const languagesOrderedByPriority = [
      localeFromPath,
      cookieLocale,
      ...acceptedLanguages,
      defaultLocale
    ];

    return languagesOrderedByPriority.find(code => isLocaleAvailable(code));
  };

  const getRedirectPath = (): string => {
    const targetLocale = getTargetLocale();
    const isTargetDefaultLocale = targetLocale === defaultLocale;
    const isTargetInPath = targetLocale === localeFromPath;

    if (!localeFromPath && !isTargetInPath && !isTargetDefaultLocale) {
      return removeTailingSlash(`/${targetLocale}${strippedLocaleFromPath}`);
    }

    return '';
  };

  return {
    getRedirectPath,
    getTargetLocale
  };
};

export default i18nRedirectsUtil;
