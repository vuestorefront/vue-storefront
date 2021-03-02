import { Context, UseNewsletterFactoryParams, useNewsletterFactory, NewsletterSections } from '@vue-storefront/core';

let newsletter: NewsletterSections = {
  woman: false,
  man: false,
  kids: false
};

const params: UseNewsletterFactoryParams = {
  load: (): Promise<NewsletterSections> => {
    return Promise.resolve(newsletter);
  },

  updateNewsletterData: async (context: Context, params: NewsletterSections): Promise<NewsletterSections> => {
    console.log('Mocked: updateNewsletterData', params);

    const paramsHasKeys = Object.keys(params).length > 0;

    if (!paramsHasKeys) return Promise.reject('Cannot update newsletter without new data');

    newsletter = params;

    return Promise.resolve(newsletter);
  }
};

export default useNewsletterFactory(params);
