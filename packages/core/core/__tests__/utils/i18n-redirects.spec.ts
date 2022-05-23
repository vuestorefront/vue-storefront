import i18nRedirectsUtil from '../../src/utils/i18n-redirects';

const defaultParams = {
  path: '/',
  defaultLocale: 'en',
  availableLocales: ['en', 'de'],
  cookieLocale: '',
  acceptedLanguages: ['de', 'en'],
  autoRedirectByLocale: true
};

describe('i18n redirects util', () => {
  it('returns redirect path for the first visit with not default locale accepted', async () => {
    const util = i18nRedirectsUtil(defaultParams);

    expect(util.getRedirectPath()).toEqual('/de');
  });

  it('returns redirect path for the first visit with default locale accepted', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      acceptedLanguages: ['en']
    });

    expect(util.getRedirectPath()).toEqual('');
  });

  it('returns redirect path for page with default locale and with cookie set to other locale', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      cookieLocale: 'de'
    });

    expect(util.getRedirectPath()).toEqual('/de');
  });

  it('returns no redirect path for page with locale and with cookie set to other locale', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      path: '/de',
      cookieLocale: 'en'
    });

    expect(util.getRedirectPath()).toEqual('');
  });

  it('returns no redirect for page with locale and without cookie with locale', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      path: '/de'
    });

    expect(util.getRedirectPath()).toEqual('');
  });

  it('returns full redirect path properly', async () => {
    const path = '/c/men?foo=bar#foo';
    const cookieLocale = 'de';
    const util = i18nRedirectsUtil({
      ...defaultParams,
      path,
      cookieLocale
    });

    expect(util.getRedirectPath()).toEqual(`/${cookieLocale}${path}`);
  });

  it('returns target locale based on path', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      path: '/de'
    });

    expect(util.getTargetLocale()).toEqual('de');
  });

  it('returns target locale based on cookie', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      cookieLocale: 'de'
    });

    expect(util.getTargetLocale()).toEqual('de');
  });

  it('returns target locale based on accepted languages', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams
    });

    expect(util.getTargetLocale()).toEqual('de');
  });

  it('returns default target locale', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      acceptedLanguages: ['es', 'en']
    });

    expect(util.getTargetLocale()).toEqual('en');
  });

  it('should return default language with autoRedirectByLocale set to false', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      cookieLocale: 'de',
      acceptedLanguages: ['de', 'es'],
      autoRedirectByLocale: false
    });

    expect(util.getTargetLocale()).toEqual('en');
  });

  it('should return language from path with autoRedirectByLocale set to false', async () => {
    const util = i18nRedirectsUtil({
      ...defaultParams,
      path: '/de',
      cookieLocale: 'en',
      acceptedLanguages: ['en', 'es'],
      autoRedirectByLocale: false
    });

    expect(util.getTargetLocale()).toEqual('de');
  });
});
