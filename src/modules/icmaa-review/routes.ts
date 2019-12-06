const MyAccount = () => import(/* webpackChunkName: "vsf-my-account" */ 'theme/pages/MyAccount.vue')

export default [
  { name: 'my-order-review', path: '/my-account/order-review/:orderId?', component: MyAccount, props: { activeBlock: 'MyOrderReview' } }
]
