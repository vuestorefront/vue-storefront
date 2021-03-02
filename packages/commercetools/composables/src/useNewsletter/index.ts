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

  updateNewsletterData: async (context: Context, params?): Promise<NewsletterSections> => {
    console.log('Mocked: updateNewsletterData', params);

    newsletter = params;

    return Promise.resolve(newsletter);
  }
};

export default useNewsletterFactory(params);
