# Project upgrade notes

## Composables usage

We have changed a bit the naming and signatures of composable functions. Below is the full list of what hs been implemented or changed:

| Composable | Method | Old signature | New signature |
|------------|--------|---------------|---------------|
|      useCart      |   removeCoupon     |       ({ coupon: COUPON, customQuery?: CustomQuery })        |       ({ couponCode: string, customQuery?: CustomQuery })        |
