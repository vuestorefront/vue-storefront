import {ProductVariant} from '../../types';
import {settings} from '../../index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default settings.overrides.getProduct || async function getProduct(options: {}): Promise<ProductVariant[]> {
  return new Promise<ProductVariant[]>(() => {});
};

