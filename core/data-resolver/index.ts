import { DataResolver } from './types/DataResolver';
import GetService from './GetService';

export const StockService = GetService<DataResolver.StockService>({
  loader: async () => (await import(/* webpackChunkName: "vsf-data-service-stock" */ './StockService')).StockService,
  methods: [
    'check',
    'list',
    'queueCheck'
  ]
})

export const CategoryService = GetService<DataResolver.CategoryService>({
  loader: async () => (await import(/* webpackChunkName: "vsf-data-service-category" */ './CategoryService')).CategoryService,
  methods: [
    'getCategories'
  ]
})

export const UserService = GetService<DataResolver.UserService>({
  loader: async () => (await import(/* webpackChunkName: "vsf-data-service-user" */ './UserService')).UserService,
  methods: [
    'resetPassword',
    'createPassword',
    'login',
    'register',
    'updateProfile',
    'getProfile',
    'getOrdersHistory',
    'changePassword',
    'refreshToken'
  ]
})

export const CartService = GetService<DataResolver.CartService>({
  loader: async () => (await import(/* webpackChunkName: "vsf-data-service-cart" */ './CartService')).CartService,
  methods: [
    'setShippingInfo',
    'getTotals',
    'getCartToken',
    'updateItem',
    'deleteItem',
    'getPaymentMethods',
    'getShippingMethods',
    'getItems',
    'applyCoupon',
    'removeCoupon'
  ]
})

export const OrderService = GetService<DataResolver.OrderService>({
  loader: async () => (await import(/* webpackChunkName: "vsf-data-service-order" */ './OrderService')).OrderService,
  methods: [
    'placeOrder'
  ]
})

export const ReviewsService = GetService<DataResolver.ReviewsService>({
  loader: async () => (await import(/* webpackChunkName: "vsf-data-service-reviews" */ './ReviewsService')).ReviewsService,
  methods: [
    'createReview'
  ]
})

export const NewsletterService = GetService<DataResolver.NewsletterService>({
  loader: async () => (await import(/* webpackChunkName: "vsf-data-service-newsletter" */ './NewsletterService')).NewsletterService,
  methods: [
    'isSubscribed',
    'subscribe',
    'unsubscribe'
  ]
})

export const ProductService = GetService<DataResolver.ProductService>({
  loader: async () => (await import(/* webpackChunkName: "vsf-data-service-product" */ './ProductService')).ProductService,
  methods: [
    'getProducts',
    'getProductRenderList',
    'getProductByKey'
  ]
})
