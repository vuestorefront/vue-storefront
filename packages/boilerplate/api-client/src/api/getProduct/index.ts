import {ProductVariant} from '../../types';
import {settings} from '../../index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function(options: {}): Promise<ProductVariant[]> {
  if (settings.overrides.getProduct) {
    return settings.overrides.getProduct(options);
  }
  return new Promise<ProductVariant[]>(() => {});
}
