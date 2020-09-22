import { UseCart } from '@vue-storefront/core';
import { params } from './factoryParams';
import { useCartFactory} from '@vue-storefront/core';
import { BapiProduct, BasketResponseData, BasketItem } from '../../types';

const { useCart, setCart }: {
  useCart: () => UseCart<BasketResponseData, BasketItem, BapiProduct, any>;
  setCart: (BasketResponseData) => void;
} = useCartFactory<BasketResponseData, BasketItem, BapiProduct, any>(params);

export { useCart, setCart };
