import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import Product from './pages/Product.vue'
import Static from './pages/Static.vue'
import Checkout from './pages/Checkout.vue'
import UIStore from './store/ui-store'

const routes = [
    { path: '/', component: Home },
    { name: 'checkout', path: '/checkout', component: Checkout },
    { name: 'category', path: '/c/:slug', component: Category },
    { name: 'product', path: '/p/:id/:slug', component: Product },
    { name: 'legal', path: '/legal', component: Static, props: {page: 'lorem', title: 'Legal Notice'} },
    { name: 'privacy', path: '/privacy', component: Static, props: {page: 'lorem', title: 'Privacy'} },
    { name: 'magazine', path: '/magazine', component: Static, props: {page: 'lorem', title: 'Magazine'} },
    { name: 'sale', path: '/sale', component: Static, props: {page: 'lorem', title: 'Sale'} },
    { name: 'order-tracking', path: '/order-tracking', component: Static, props: {page: 'lorem', title: 'Track my Order'} },
    { name: 'my-account', path: '/my-account', component: Static, props: {page: 'lorem', title: 'My Account'} }
]

export default function (app, router, store) {
  router.addRoutes(routes)
  store.registerModule('ui', UIStore)
  return
}
