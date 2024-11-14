import rootStore from '@vue-storefront/core/store'

import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';

import { SN_MAILCHIMP } from '../types/store-name';
import { CAMPAIGN_ID, LANDING_PAGE } from '../types/local-storage-key';
import { SET_CAMPAIGN_ID, SET_LANDING_PAGE } from '../types/mutation';

const clearItem = (mutationName: string) => {
  rootStore.commit(
    mutationName,
    undefined
  );
}

const clearCampaignId = () => {
  clearItem(
    `${SN_MAILCHIMP}/${SET_CAMPAIGN_ID}`
  );
}
const clearLandingPage = () => {
  clearItem(
    `${SN_MAILCHIMP}/${SET_LANDING_PAGE}`
  );
}

export function getItemsFromStorage ({ key }: {key: string | null}) {
  if (!key) {
    clearCampaignId();
    clearLandingPage();
    return;
  }

  const isCampaignIdChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_MAILCHIMP}/${CAMPAIGN_ID}`
  );
  const isLandingPageChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_MAILCHIMP}/${LANDING_PAGE}`
  );

  if (!isCampaignIdChanged && !isLandingPageChanged) {
    return;
  }

  const clearData = () => {
    if (isCampaignIdChanged) {
      clearCampaignId();
    }

    if (isLandingPageChanged) {
      clearLandingPage();
    }
  }

  const value = parseLocalStorageValue(localStorage[key]);

  if (!value) {
    clearData();
    return;
  }

  let mutationName: string | undefined;

  if (isCampaignIdChanged) {
    mutationName = `${SN_MAILCHIMP}/${SET_CAMPAIGN_ID}`;
  }

  if (isLandingPageChanged) {
    mutationName = `${SN_MAILCHIMP}/${SET_LANDING_PAGE}`;
  }

  if (!mutationName) {
    return;
  }

  rootStore.commit(
    mutationName,
    value
  );
}
