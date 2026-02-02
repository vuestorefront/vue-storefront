import rootStore from '@vue-storefront/core/store';

export default function isAlterationProduct (productId: number): boolean {
  const alterationProductIds = rootStore.getters['backend-settings/getSettingByCompositeKey']('budsies/alterationProductIds');
  return alterationProductIds?.includes(productId) ?? false;
}
