# Vue Storefront Google Tage Manager with Enhanced Ecommerce

This module provides extra states for use to integrate in your theme for
implementing Google Analytics Enhanced Ecommerce features

Events are based on the Magento 2 GTM Docs found [here](https://docs.magento.com/m2/ee/user_guide/marketing/google-tag-manager.html). You should be able to follow the setup on Steps 1 and Steps 2 and use their JSON file from there as the event names are compatible.

You will need to add in manually events for `addToWishlist` and `addToCompare` if you plan on using those.

## Usage

Add the desired mixin to your desired component:

- GTM
- GTMCart
- GTMCategory
- GTMProduct
- GTMSearchPanel

EX: `import { GTMCategory } from 'src/modules/google-tag-manager-ee/mixins/GTMCategory'`

## List of events

- promotionView
- promotionClick
- addToCart
- removeFromCart
- addToWishlist
- addToCompare
- productImpression
- productClick
- productDetail
- cart
- checkout
- checkoutOption
- purchase

## Install

The updated `google-tag-manager` module has been disabled by default. To Enable uncomment the module from the `src/modules` and update these components:

- In `src/themes/default/pages/Category.vue` add `import { GTMCategory } from 'src/modules/google-tag-manager/mixins/GTMCategory'` and to the mixin list to include `GTMCategory`.
- In `src/themes/default/pages/Product.vue` add `import { GTMProduct } from 'src/modules/google-tag-manager/mixins/GTMProduct'` and to the mixin list to include `GTMProduct`.
- In `src/themes/default/components/core/ProductTile.vue` add `import { GTM } from 'src/modules/google-tag-manager/mixins/GTM` and to the mixin list to include `GTM`. Then in the `router-link` add `@click.native="sendProductClick($vnode.key)"`
- In `src/themes/default/components/core/blocks/Microcart/Microcart.vue` add `import { GTMCart } from 'src/modules/google-tag-manager/mixins/GTMCart` and to the mixin list to include `GTMCart`.
- In `src/themes/default/components/core/blocks/Product/Related.vue` add `import { GTM } from 'src/modules/google-tag-manager/mixins/GTM'` and to the mixin list to include `GTM`. Add before `this.$store.dispatch('product/related'`  this line `if (!isServer) { this.sendProductImpressions(response.items, this.heading, 'Related Products') }`
- In `src/themes/default/components/core/blocks/SearchPanel/SearchPanel.vue` add `import { GTMSearchPanel } from 'src/modules/google-tag-manager/mixins/GTMSearchPanel'` and to the mixin list to include `GTMSearchPanel`.
- In `src/themes/default/components/theme/blocks/Collection/Collection.vue` add `import { GTM } from 'src/modules/google-tag-manager/mixins/GTM'` and to the mixin list to include `GTM`.  Add after `this.products = res.items` this line `if (!isServer) { this.sendProductImpressions(this.products, this.title, 'Collection') }`

## Notes

- Promos - Use `sendPromoClick` and `sendPromoView` in `mixins/GTM.ts` to add tracking to your marketing promos.
- Wishlist - Use `sendWishlistTrack` to send wishlist event
- Compare - Use `sendCompareTrack` to send compare event

## Todo

- Add better notes
- Organize code
- Add testing
