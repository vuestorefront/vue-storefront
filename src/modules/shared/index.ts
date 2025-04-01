import isVue from './is-vue.typeguard';
import { AspectRatio } from './types/aspect-ratio.value';
import { BEFORE_STORE_BACKEND_API_REQUEST } from './types/before-store-backend-api-request.event';
import { BreakpointValue } from './types/breakpoint.value';
import CartEvents from './types/cart-events';
import { InjectType } from './types/inject-type';
import { VideoProvider } from './types/video-provider.value';
import CustomerImage from './types/customer-image.interface';
import { getCartItemPrice, getProductDefaultDiscount, getProductDefaultPrice, getProductPriceFromTotals } from './helpers/price';
import { PAYMENT_ERROR_EVENT } from './types/payment-error-event';
import ServerError from './types/server-error';
import * as ProductEvent from './types/product-events';
import { UserEvents } from './types/user-events';
import { CustomerDataChangedEventPayload } from './types/user-events-payload';
import { getProductOptions } from './helpers/get-product-options.function';
import { localStorageSynchronizationFactory } from './helpers/local-storage-synchronization.factory';
import { parseLocalStorageValue } from './helpers/parse-local-storage-value.function';
import * as PriceHelper from './helpers/price';
import { stateCodeAutocompleteOptionSearch } from './helpers/state-code-autocomplete-option-search.function';

import EmailSubmitForm from './components/email-submit-form.vue';
import PrivacyPolicyLink from './components/privacy-policy-link.vue';
import StreamingVideo from './components/streaming-video.vue';
import { getCanonicalUrl } from './helpers/get-canonical-url.function';
import getCookieByName from './helpers/get-cookie-by-name.function';

export {
  InjectType,
  isVue,
  AspectRatio,
  VideoProvider,
  StreamingVideo,
  CustomerImage,
  getCartItemPrice,
  getProductDefaultDiscount,
  getProductDefaultPrice,
  getProductPriceFromTotals,
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
  PrivacyPolicyLink,
  stateCodeAutocompleteOptionSearch,
  getCanonicalUrl,
  UserEvents,
  CustomerDataChangedEventPayload,
  getCookieByName
}
