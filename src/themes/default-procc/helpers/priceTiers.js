/**
 * Default not logged user grouped ID
 * @type {number}
 */
const NotLoggedUserGroupId = 0;

/**
 * Update product final price
 *
 * @param productData
 * @param groupId
 * @returns {*}
 */
function updatePrices (productData, groupId) {
  if (productData.tier_prices && productData.tier_prices.length) {
    for (let i = productData.tier_prices.length - 1; i >= 0; i--) {
      const tier = productData.tier_prices[i];
      // Check group

      if (tier.customer_group_id === groupId) {
        if (tier.qty === 1) {
          productData.specialPriceInclTax = 0;

          if (productData.price > tier.value) {
            productData.price = tier.value
          }
        }
      } else {
        productData.tier_prices.splice(i, 1)
      }
    }
  }

  return productData;
}

/**
 * Set price by tier and reduce tiers
 *
 * @param productData
 * @param groupId
 * @returns {*}
 */
export default (productData, groupId) => {
  groupId = groupId || NotLoggedUserGroupId;

  if (productData.type_id === 'configurable') {
    const children = productData.configurable_children;

    if (children) {
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        updatePrices(child, groupId);

        if (child.price < productData.price) {
          productData.price = child.price;
        }
      }
    }
  } else {
    updatePrices(productData, groupId);
  }

  return productData;
}
