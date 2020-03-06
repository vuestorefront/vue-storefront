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

## Notes

- Promos - Use `sendPromoClick` and `sendPromoView` in `mixins/GTM.ts` to add tracking to your marketing promos.
- Wishlist - Use `sendWishlistTrack` to send wishlist event
- Compare - Use `sendCompareTrack` to send compare event

## Todo

- Add better notes
- Organize code
- Add testing
