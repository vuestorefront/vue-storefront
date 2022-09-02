import isVue from './is-vue.typeguard';
import { AspectRatio } from './types/aspect-ratio.value';
import { InjectType } from './types/inject-type';
import { VideoProvider } from './types/video-provider.value';
import CustomerImage from './types/customer-image.interface';
import { getCartItemPrice, getProductDefaultDiscount, getProductDefaultPrice, getProductPriceFromTotals } from './helpers/price';
import ServerError from './types/server-error';

import StreamingVideo from './components/streaming-video.vue';

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
  ServerError
}
