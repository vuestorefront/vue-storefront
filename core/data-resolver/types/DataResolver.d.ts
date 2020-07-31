import { AttributesMetadata } from '@vue-storefront/core/modules/catalog/types/Attribute';
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';
import { UserProfile } from '@vue-storefront/core/modules/user/types/UserProfile'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { Order } from '@vue-storefront/core/modules/order/types/Order'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import Review from '@vue-storefront/core/modules/review/types/Review';
import { SearchQuery } from 'storefront-query-builder';
import Product from '@vue-storefront/core/modules/catalog/types/Product';

declare namespace DataResolver {

  interface CategorySearchOptions {
    parentId?: number | string,
    filters?: { [key: string]: string[] | string },
    level?: number,
    onlyActive?: boolean,
    onlyNotEmpty?: boolean,
    size?: number,
    start?: number,
    sort?: string,
    includeFields?: string[],
    excludeFields?: string[],
    reloadAll?: boolean
  }

  interface ProductSearchOptions {
    query: SearchQuery,
    size?: number,
    start?: number,
    sort?: string,
    includeFields?: string[],
    excludeFields?: string[],
    configuration?: { [key: string]: string[] | string },
    options?: {
      prefetchGroupProducts?: boolean,
      fallbackToDefaultWhenNoAvailable?: boolean,
      setProductErrors?: boolean,
      setConfigurableProductOptions?: boolean,
      filterUnavailableVariants?: boolean,
      assignProductConfiguration?: boolean,
      separateSelectedVariant?: boolean
    }
  }

  interface ProductRenderListSearchOptions {
    skus: string[],
    isUserGroupedTaxActive?: boolean,
    userGroupId?: string,
    token?: string
  }

  interface ProductByKeySearchOptions {
    options: { [key: string]: string },
    key?: string,
    skipCache?: boolean
  }

  interface Customer {
    email: string,
    firstname: string,
    lastname: string,
    addresses: string
  }

  interface PasswordData {
    currentPassword: string,
    newPassword: string
  }

  interface ProductsListResponse {
    items: Product[],
    perPage?: number,
    start?: number,
    total?: number,
    aggregations?: any[],
    attributeMetadata?: AttributesMetadata[]
  }

  interface ProductService {
    getProducts: (searchRequest: ProductSearchOptions) => Promise<ProductsListResponse>,
    getProductRenderList: (searchRequest: ProductRenderListSearchOptions) => Promise<ProductsListResponse>,
    getProductByKey: (searchRequest: ProductByKeySearchOptions) => Promise<Product>
  }

  interface CategoryService {
    getCategories: (searchRequest?: CategorySearchOptions) => Promise<Category[]>
  }

  interface UserService {
    resetPassword: (email: string) => Promise<Task>,
    createPassword: (email: string, newPassword: string, resetToken: string) => Promise<Task>,
    login: (username: string, password: string) => Promise<Task>,
    register: (customer: Customer, pssword: string) => Promise<Task>,
    updateProfile: (userProfile: UserProfile, actionName: string) => Promise<Task>,
    getProfile: () => Promise<Task>,
    getOrdersHistory: (pageSize?: number, currentPage?: number) => Promise<Task>,
    changePassword: (passwordData: PasswordData) => Promise<Task>,
    refreshToken: (refreshToken: string) => Promise<string>
  }

  interface CartService {
    setShippingInfo: (methodsData: any /*: ShippingMethodsData */) => Promise<Task>,
    getTotals: () => Promise<Task>,
    getCartToken: (guestCart: boolean, forceClientState: boolean) => Promise<Task>,
    updateItem: (cartServerToken: string, cartItem: CartItem) => Promise<Task>,
    deleteItem: (cartServerToken: string, cartItem: CartItem) => Promise<Task>,
    getPaymentMethods: () => Promise<Task>,
    getShippingMethods: (address: any /*: ShippingMethodsData */) => Promise<Task>,
    getItems: () => Promise<Task>,
    applyCoupon: (couponCode: string) => Promise<Task>,
    removeCoupon: () => Promise<Task>
  }

  interface OrderService {
    placeOrder: (order: Order) => Promise<Task>
  }

  interface StockService {
    check: (sku: string) => Promise<Task>,
    queueCheck: (sku: string, actionName: string) => Promise<any>,
    list: (skuList: string[]) => Promise<Task>
  }

  interface ReviewsService {
    createReview: (review: Review) => Promise<boolean>
  }

  interface NewsletterService {
    isSubscribed: (email: string) => Promise<boolean>,
    subscribe: (email: string) => Promise<boolean>,
    unsubscribe: (email: string) => Promise<boolean>
  }
}
