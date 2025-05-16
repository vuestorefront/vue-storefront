import { mapMobileObserver, unMapMobileObserver } from '@storefront-ui/vue/src/utilities/mobile-observer';
import { computed, onBeforeUnmount } from '@vue/composition-api';

import { isServer } from '@vue-storefront/core/helpers';

export function useMobileObserver () {
  const mobileObserver = !isServer ? mapMobileObserver() : undefined;

  const isMobile = computed<boolean>(() => {
    if (!mobileObserver) {
      return false;
    }

    return (mobileObserver.isMobile as any).get() as boolean;
  });

  onBeforeUnmount(() => {
    unMapMobileObserver();
  });

  return {
    isMobile
  }
}
