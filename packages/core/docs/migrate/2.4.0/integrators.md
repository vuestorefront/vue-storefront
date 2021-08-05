# Integrators upgrade notes

## Factory usage

We have changed a bit the naming and signatures of core factory functions. Below is the full list of what hs been implemented or changed:

| Factory | Old method | New method | Old signature | New signature |
|------------|--------|---------------|---------------|---|
|      useCartFactory      |   removeCoupon     |  No changes |     context: Context, params: { currentCart: CART; coupon: COUPON, customQuery?: CustomQuery }   |     context: Context, params: { currentCart: CART; couponCode: string, customQuery?: CustomQuery }   |
