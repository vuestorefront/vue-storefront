const i18nRedirectsUtil = ({
  path,
  defaultLocale,
  availableLocales,
  cookieLocale,
  acceptedLanguages,
  autoRedirectByLocale
}: {
  path: string;
  defaultLocale: string;
  cookieLocale: string;
  availableLocales: string[];
  acceptedLanguages: string[];
  autoRedirectByLocale: boolean;
}): {
  getRedirectPath: () => string;
  getTargetLocale: () => string;
} => {
  const localeRegexp = new RegExp(`^/(?<locale>${availableLocales.join('|')})(?=(/|$))`, 'g');
  const localeFromPath = localeRegexp.exec(path)?.groups.locale;
  const strippedLocaleFromPath = path.replace(`/${localeFromPath}`, '');
  const removeTailingSlash = (path: string): string => path.replace(/\/$/, '');
  const getTargetLocale = (): string => {
    const languagesOrderedByPriority = [
      localeFromPath,
      ...(autoRedirectByLocale && [cookieLocale]),
      ...(autoRedirectByLocale && acceptedLanguages),
      defaultLocale
    ];

    return languagesOrderedByPriority.find(code => availableLocales.includes(code));
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
