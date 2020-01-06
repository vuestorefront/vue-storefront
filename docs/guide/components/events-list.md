# Events List

To keep track and make debugging of `$bus.$emit` events across components easier, here is a list of such events that are triggered by components of the default theme.

## ForgotPass

On component close:
- [`modal-hide`, `modal-signup`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Auth/ForgotPass.vue#L80)

On send email action:
- [`notification-progress-start`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Auth/ForgotPass.vue#L95)
- [`notification-progress-stop`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Auth/ForgotPass.vue#L97)

On error handler of email send action:
- [`notification-progress-stop`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Auth/ForgotPass.vue#L109)

## OrderConfirmation

On mounted lifecycle hook:
- [`modal-show`, `modal-order-confirmation`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/OrderConfirmation.vue#L65)

On order confirmation:
- [`modal-hide`, `modal-order-confirmation`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/OrderConfirmation.vue#L71)

On order cancelling:
- [`modal-show`, `modal-order-confirmation`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/OrderConfirmation.vue#L75)

## OrderReview

On 'Term and conditions' link click:
- [`modal-toggle`, `modal-terms`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/OrderReview.vue#L51)

## PersonalDetails

On 'Term and conditions' link click:
- [`modal-toggle`, `modal-terms`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Checkout/PersonalDetails.vue#L151)

## Newsletter

On newsletter popup show:
- [`modal-show`, `modal-newsletter`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Footer/Newsletter.vue#L49)

## Header

On 'Login to your account' link click:
- [`modal-toggle`, `modal-signup`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Header/Header.vue#L122)

## Reviews

On 'Login to your account' link click:
- [`modal-show`, `modal-signup`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Reviews/Reviews.vue#L155)

## SidebarMenu

On 'Login to your account' link click:
- [`modal-show`, `modal-signup`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/SidebarMenu/SidebarMenu.vue#L201)

## SubCategory

On user logout:
- [`user-before-logout`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/SidebarMenu/SubCategory.vue#L131)

## Language

On mounted lifecycle hook:
- [`modal-show`, `modal-switcher`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Switcher/Language.vue#L55)

On component close:
- [`modal-hide`, `modal-switcher`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/blocks/Switcher/Language.vue#L60)

## LanguageSwitcher

On showing language popup:
- [`modal-show`, `modal-switcher`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/LanguageSwitcher.vue#L30)

## NewsletterPopup

On showing newsletter popup:
- [`modal-show`, `modal-newsletter`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/NewsletterPopup.vue#L54)

On hiding newsletter popup:
- [`modal-hide`, `modal-newsletter`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/core/NewsletterPopup.vue#L67)

## Onboard

On component close:
- [`modal-hide`, `modal-onboard`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/components/theme/blocks/Home/Onboard.vue#L45)

## Home

On beforeMount lifecycle hook:
- [`modal-toggle`, `modal-onboard`](https://github.com/DivanteLtd/vue-storefront/blob/6c100f978aa79975e4db22be3cefa7f8d38b4c97/src/themes/default/pages/Home.vue#L74)
