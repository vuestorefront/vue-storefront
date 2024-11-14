import rootStore from '@vue-storefront/core/store'

import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';

import CampaignContent from '../types/CampaignContent.model';
import { CAMPAIGN_CONTENT, CAMPAIGN_TOKEN, LAST_BANNER_VERSION, PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE } from '../types/local-storage-key';
import { SET_CAMPAIGN_CONTENT, SET_CAMPAIGN_TOKEN, SET_LAST_BANNER_VERSION_CLOSED_BY_USER, SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE, SN_PROMOTION_PLATFORM } from '../types/StoreMutations';

const clearItem = (mutationName: string) => {
  rootStore.commit(
    mutationName,
    undefined
  );
}

const expirationDateMutationName = `${SN_PROMOTION_PLATFORM}/${SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE}`;
const campaignContentMutationName = `${SN_PROMOTION_PLATFORM}/${SET_CAMPAIGN_CONTENT}`;
const campaignTokenMutationName = `${SN_PROMOTION_PLATFORM}/${SET_CAMPAIGN_TOKEN}`;
const lastBannerVersionMutationName = `${SN_PROMOTION_PLATFORM}/${SET_LAST_BANNER_VERSION_CLOSED_BY_USER}`;

export function getItemsFromStorage ({ key }: StorageEvent) {
  if (!key) {
    clearItem(expirationDateMutationName);
    clearItem(campaignContentMutationName);
    clearItem(campaignTokenMutationName);
    clearItem(lastBannerVersionMutationName);
    return;
  }

  let mutationName: string | undefined;

  const isExpirationDateChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PROMOTION_PLATFORM}/${PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE}`
  );
  const isCampaignContentChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PROMOTION_PLATFORM}/${CAMPAIGN_CONTENT}`
  );
  const isCampaignTokenChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PROMOTION_PLATFORM}/${CAMPAIGN_TOKEN}`
  );
  const isLastBannerVersionChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PROMOTION_PLATFORM}/${LAST_BANNER_VERSION}`
  );

  if (isExpirationDateChanged) {
    mutationName = expirationDateMutationName;
  }

  if (isCampaignContentChanged) {
    mutationName = campaignContentMutationName;
  }

  if (isCampaignTokenChanged) {
    mutationName = campaignTokenMutationName;
  }

  if (isLastBannerVersionChanged) {
    mutationName = lastBannerVersionMutationName;
  }

  if (!mutationName) {
    return;
  }

  let value = parseLocalStorageValue(localStorage[key]);

  if (!value) {
    clearItem(mutationName);
    return;
  }

  if (isCampaignContentChanged) {
    value = CampaignContent.fromPlainObject(value);
  }

  rootStore.commit(
    mutationName,
    value
  );
}
