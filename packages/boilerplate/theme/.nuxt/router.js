import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bd26b8b0 = () => interopDefault(import('../.theme/pages/Checkout.vue' /* webpackChunkName: "" */))
const _71d9c1db = () => interopDefault(import('../.theme/pages/Checkout/PersonalDetails.vue' /* webpackChunkName: "" */))
const _3268d005 = () => interopDefault(import('../.theme/pages/Checkout/Shipping.vue' /* webpackChunkName: "" */))
const _c37d5202 = () => interopDefault(import('../.theme/pages/Checkout/Payment.vue' /* webpackChunkName: "" */))
const _6782b682 = () => interopDefault(import('../.theme/pages/Checkout/OrderReview.vue' /* webpackChunkName: "" */))
const _1bf69bac = () => interopDefault(import('../.theme/pages/Checkout/ThankYou.vue' /* webpackChunkName: "" */))
const _717bd122 = () => interopDefault(import('../.theme/pages/MyAccount.vue' /* webpackChunkName: "" */))
const _63a57760 = () => interopDefault(import('../.theme/pages/Category.vue' /* webpackChunkName: "" */))
const _07fe9006 = () => interopDefault(import('../.theme/pages/Product.vue' /* webpackChunkName: "" */))
const _021c687e = () => interopDefault(import('../.theme/pages/Home.vue' /* webpackChunkName: "" */))
const _22f9f636 = () => interopDefault(import('../.theme/pages/MyAccount/LoyaltyCard.vue' /* webpackChunkName: ".theme/pages/MyAccount/LoyaltyCard" */))
const _cfbab316 = () => interopDefault(import('../.theme/pages/MyAccount/MyNewsletter.vue' /* webpackChunkName: ".theme/pages/MyAccount/MyNewsletter" */))
const _954ee2c6 = () => interopDefault(import('../.theme/pages/MyAccount/MyProfile.vue' /* webpackChunkName: ".theme/pages/MyAccount/MyProfile" */))
const _06491fe2 = () => interopDefault(import('../.theme/pages/MyAccount/MyReviews.vue' /* webpackChunkName: ".theme/pages/MyAccount/MyReviews" */))
const _7367c7d6 = () => interopDefault(import('../.theme/pages/MyAccount/OrderHistory.vue' /* webpackChunkName: ".theme/pages/MyAccount/OrderHistory" */))
const _7330bf74 = () => interopDefault(import('../.theme/pages/MyAccount/ShippingDetails.vue' /* webpackChunkName: ".theme/pages/MyAccount/ShippingDetails" */))
const _87da6000 = () => interopDefault(import('../.theme/pages/index.vue' /* webpackChunkName: ".theme/pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/checkout",
    component: _bd26b8b0,
    name: "checkout",
    children: [{
      path: "personal-details",
      component: _71d9c1db,
      name: "personal-details"
    }, {
      path: "shipping",
      component: _3268d005,
      name: "shipping"
    }, {
      path: "payment",
      component: _c37d5202,
      name: "payment"
    }, {
      path: "order-review",
      component: _6782b682,
      name: "order-review"
    }, {
      path: "thank-you",
      component: _1bf69bac,
      name: "thank-you"
    }]
  }, {
    path: "/my-account/:pageName?",
    component: _717bd122,
    name: "my-account"
  }, {
    path: "/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
    component: _63a57760,
    name: "category"
  }, {
    path: "/p/:id/:slug/",
    component: _07fe9006,
    name: "product"
  }, {
    path: "/",
    component: _021c687e,
    name: "home"
  }, {
    path: "/Category",
    component: _63a57760,
    name: "Category"
  }, {
    path: "/Checkout",
    component: _bd26b8b0,
    name: "Checkout",
    children: [{
      path: "OrderReview",
      component: _6782b682,
      name: "Checkout-OrderReview"
    }, {
      path: "Payment",
      component: _c37d5202,
      name: "Checkout-Payment"
    }, {
      path: "PersonalDetails",
      component: _71d9c1db,
      name: "Checkout-PersonalDetails"
    }, {
      path: "Shipping",
      component: _3268d005,
      name: "Checkout-Shipping"
    }, {
      path: "ThankYou",
      component: _1bf69bac,
      name: "Checkout-ThankYou"
    }]
  }, {
    path: "/Home",
    component: _021c687e,
    name: "Home"
  }, {
    path: "/MyAccount",
    component: _717bd122,
    name: "MyAccount",
    children: [{
      path: "LoyaltyCard",
      component: _22f9f636,
      name: "MyAccount-LoyaltyCard"
    }, {
      path: "MyNewsletter",
      component: _cfbab316,
      name: "MyAccount-MyNewsletter"
    }, {
      path: "MyProfile",
      component: _954ee2c6,
      name: "MyAccount-MyProfile"
    }, {
      path: "MyReviews",
      component: _06491fe2,
      name: "MyAccount-MyReviews"
    }, {
      path: "OrderHistory",
      component: _7367c7d6,
      name: "MyAccount-OrderHistory"
    }, {
      path: "ShippingDetails",
      component: _7330bf74,
      name: "MyAccount-ShippingDetails"
    }]
  }, {
    path: "/Product",
    component: _07fe9006,
    name: "Product"
  }, {
    path: "/",
    component: _87da6000,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
