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
  const getArrayFromPath = (): string[] => path.split('/').filter(String);
  const isLocaleAvailable = (locale): boolean => availableLocales.includes(locale);
  const removeTailingSlash = (path) => path.replace(/\/$/, '');

  const stripLocaleFromPath = (): string => {
    const parts = getArrayFromPath();
    const localeCandidate = parts[0];

    return isLocaleAvailable(localeCandidate) ? `/${parts.slice(1).join('/')}` : path;
  };

  const getLocaleFromPath = (): string => {
    const parts = getArrayFromPath();
    const localeCandidate = parts[0];

    return isLocaleAvailable(localeCandidate) ? localeCandidate : '';
  };

  const getTargetLocale = (): string => {
    const localeFromPath = getLocaleFromPath();
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
    const localeFromPath = getLocaleFromPath();
    const isTargetDefaultLocale = targetLocale === defaultLocale;
    const isTargetInPath = targetLocale === localeFromPath;

    if (!localeFromPath && !isTargetInPath && !isTargetDefaultLocale) {
      return removeTailingSlash(`/${targetLocale}${stripLocaleFromPath()}`);
    }

    return '';
  };

  return {
    getRedirectPath,
    getTargetLocale
  };
};

export default i18nRedirectsUtil;
