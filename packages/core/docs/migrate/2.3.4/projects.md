# Project upgrade notes

## Composables usage

We have changed a bit the naming and signatures of composable functions. Below is the full list of what hs been implemented or changed:

| Composable | Method | Old signature | New signature |
|------------|--------|---------------|---------------|
|      useCart      |   applyCoupon     |      ({ couponCode: string, customQuery?: CustomQuery })         |        ({ coupon: COUPON, customQuery?: CustomQuery })       |
