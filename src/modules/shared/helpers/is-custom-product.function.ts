import rootStore from '@vue-storefront/core/store';

export default function isCustomProduct (productSku: string): boolean {
  const customProductsSkus = rootStore.getters['backend-settings/getSettingByCompositeKey']('products/customProductsSkus');
  return customProductsSkus.includes(productSku);
}
