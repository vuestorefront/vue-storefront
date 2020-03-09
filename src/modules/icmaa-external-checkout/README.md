# `icmaa-external-checkout` module

Use our default magento checkout as bypass.
Based on: https://github.com/Vendic/vsf-external-checkout

**Because of the cookie-vs-session handling, this module is only working when both systems, Magento and VSF, are running behind the same domain.**  
For client-side cookie handling we are using the `vue-cookies` library.

## Session conflicts and logging out in both systems

There are some major caveats for bypassing the checkout. One of it is that you have to handle two session routines.

### Logout

**The Problem:** If you: login, add some products to cart, go to checkout, go back and logout in VSF. Then again add some products to cart without logging in and go to checkout again. Now you should still be logged in as the old user – not good.

As you logout in VSF the session in Magento will still be alive because Magento is not knowing that you have logged out.
This leads to conflicts if you start a new session and enter the checkout again as you will still be logged in as the user you've been before.

So, as Magento is saving it's session ID in a cookie, it has to be deleted on logout though. But Magento has an optional setting to set this cookie as a http-only cookie, which means it is not possible to delete it using client-side javascript. That is why we need to be able to make a server-side request which then deletes the cookie and disconnects your session in Magento too.

### Quote-ID highjack by new session

**The Problem:** If we have a valid quote as a logged out customer and enter the checkout we are forced to login there. If we do so, the current quote is merged to the newly created session and the old one disappears. VSF never notices this change – so if you switch back to the Storefront and add more products to then cart and then again went back to the checkout, the Magento quote will be empty because the products are added to the old quote. Thats because the quote-id is never been updated in the VSF after login in Magento.

We solve this problem by setting the new quote-id into a cookie on login in Magento. This way, the next time the VSF is initialized, we can set the new quote-id-token to the state/storage and newly added products will be connected correctly.

# Config

There are two options: `enableCookieSessionTransfer` to generally enable the cookie deletion on VSF logout and session/quote transfer if cookies are set.  
And `httpOnlySupport` to make an server-side request to delete the cookie if you use http-only cookies in Magento.

```
{
  ...
  "externalCheckout": {
    "shopUrl": "https://www.domain-of-your-shop.com",
    "enableCookieSessionTransfer": true,
    "httpOnlySupport": true
  }
}
```

## Todo

[ ] ...
