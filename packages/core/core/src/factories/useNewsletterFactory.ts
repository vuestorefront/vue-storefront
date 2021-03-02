import { computed, Ref } from '@vue/composition-api';
import { FactoryParams, Context, UseNewsletterErrors, UseNewsletter, NewsletterSections } from '../types';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseNewsletterFactoryParams extends FactoryParams {
  updateNewsletterData: (
    context: Context,
    params: NewsletterSections) => Promise<NewsletterSections>;
  load: () => Promise<NewsletterSections>;
}

export const useNewsletterFactory = (
  factoryParams: UseNewsletterFactoryParams
) => {
  return function useNewsletter (): UseNewsletter {
    const loading: Ref<boolean> = sharedRef(false, 'useNewsletter-loading');
    const newsletterRef: Ref<NewsletterSections> = sharedRef({}, 'useNewsletter-newsletter');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseNewsletterErrors> = sharedRef({}, 'useNewsletter-error');

    const load = async (): Promise<NewsletterSections> => {
      Logger.debug('useNewsletter.load');

      try {
        loading.value = true;
        error.value = null;
        newsletterRef.value = await _factoryParams.load();
        return newsletterRef.value;
      } catch (err) {
        error.value = err;
        Logger.error('useNewsletter/load', err);
      } finally {
        loading.value = false;
      }
    };

    const updateNewsletterData = async (newsletter): Promise<NewsletterSections> => {
      Logger.debug('useNewsletter.updateNewsletterData', newsletter);

      try {
        loading.value = true;
        error.value = null;
        newsletterRef.value = await _factoryParams.updateNewsletterData(newsletter);
        return newsletterRef.value;
      } catch (err) {
        error.value = err;
        Logger.error('useNewsletter/updateNewsletterData', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      newsletter: computed(() => newsletterRef.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      updateNewsletterData,
      load
    };
  };
};
