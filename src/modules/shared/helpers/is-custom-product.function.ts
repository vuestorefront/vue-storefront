import rootStore from '@vue-storefront/core/store';

export default function isCustomProduct (productId: number): boolean {
  const customProductsIds = rootStore.getters['backend-settings/getSettingByCompositeKey']('budsies/customProductIds');
  return customProductsIds.includes(productId);
}
