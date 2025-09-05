import isVue from './is-vue.typeguard';
import { AspectRatio } from './types/aspect-ratio.value';
import { BEFORE_STORE_BACKEND_API_REQUEST } from './types/before-store-backend-api-request.event';
import { BreakpointValue } from './types/breakpoint.value';
import CartEvents from './types/cart-events';
import { InjectType } from './types/inject-type';
import { VideoProvider } from './types/video-provider.value';
import CustomerImage from './types/customer-image.interface';
import { PAYMENT_ERROR_EVENT } from './types/payment-error-event';
import { DETECTED_COUNTRY_COOKIE_KEY } from './types/detected-country-cookie.key';
import { DEFAULT_CURRENCY_CODE } from './types/default-currency-code';
import { EU_COUNTRY_CODES } from './types/eu-country-codes';
import ServerError from './types/server-error';
import * as ProductEvent from './types/product-events';
import { UserEvents } from './types/user-events';
import { CustomerDataChangedEventPayload } from './types/user-events-payload';
import { PersistedCustomerData } from './types/persisted-customer-data.interface';
import { PersistedBillingAddress } from './types/persisted-billing-address.interface';
import { getProductOptions } from './helpers/get-product-options.function';
import { localStorageSynchronizationFactory } from './helpers/local-storage-synchronization.factory';
import { parseLocalStorageValue } from './helpers/parse-local-storage-value.function';
import { getRegionIdByCountryAndStateCode } from './helpers/get-region-id-by-country-and-state-code.function';
import * as PriceHelper from '@vue-storefront/core/helpers/price';
import * as BundleProductDiscountedPrice from '@vue-storefront/core/helpers/bundle-product-discounted-price';
import { stateCodeAutocompleteOptionSearch } from './helpers/state-code-autocomplete-option-search.function';
import { createPhoneHelpers } from './helpers/phone-number';

import EmailSubmitForm from './components/email-submit-form.vue';
import PrivacyPolicyLink from './components/privacy-policy-link.vue';
import StreamingVideo from './components/streaming-video.vue';
import { getCanonicalUrl } from './helpers/get-canonical-url.function';
import getCookieByName from './helpers/get-cookie-by-name.function';
import { MimeTypeValue } from './types/mime-type.value';
import { useMobileObserver } from './helpers/use-mobile-observer';
import isCustomProduct from './helpers/is-custom-product.function';

export {
  InjectType,
  isVue,
  AspectRatio,
  VideoProvider,
  StreamingVideo,
  CustomerImage,
  ServerError,
  EmailSubmitForm,
  ProductEvent,
  CartEvents,
  PriceHelper,
  BEFORE_STORE_BACKEND_API_REQUEST,
  BreakpointValue,
  PAYMENT_ERROR_EVENT,
  parseLocalStorageValue,
  localStorageSynchronizationFactory,
  getProductOptions,
  BundleProductDiscountedPrice,
  PrivacyPolicyLink,
  stateCodeAutocompleteOptionSearch,
  getCanonicalUrl,
  UserEvents,
  CustomerDataChangedEventPayload,
  PersistedCustomerData,
  PersistedBillingAddress,
  getCookieByName,
  MimeTypeValue,
  useMobileObserver,
  isCustomProduct,
  EU_COUNTRY_CODES,
  DETECTED_COUNTRY_COOKIE_KEY,
  getRegionIdByCountryAndStateCode,
  createPhoneHelpers,
  DEFAULT_CURRENCY_CODE
}
