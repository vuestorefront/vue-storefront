import { Category } from 'core/modules/catalog-next/types/Category';
import { UserProfile } from 'core/modules/user/types/UserProfile'
import Task from '@vue-storefront/core/lib/sync/types/Task'

declare namespace DataResolver {

  export interface CategorySearchOptions {
    parentId?: number,
    filters?: { [key: string]: string[] | string },
    level?: number,
    onlyActive?: boolean,
    onlyNotEmpty?: boolean,
    size?: number,
    start?: number,
    sort?: string,
    includeFields?: string[],
    excludeFields?: string[]
  }

  export interface Customer {
    email: string,
    firstname: string,
    lastname: string,
    addresses: string
  }

  export interface PasswordData {
    currentPassword: string,
    newPassword: string
  }

  export interface CategoryService {
    getCategories: (searchRequest?: CategorySearchOptions) => Promise<Category[]>
  }

  export interface UserService {
    resetPassword: (email: string) => Promise<Task>,
    login: (username: string, password: string) => Promise<Task>,
    register: (customer: Customer, pssword: string) => Promise<Task>,
    updateProfile: (userProfile: UserProfile) => Promise<Task>,
    getProfile: () => Promise<Task>,
    getOrdersHistory: () => Promise<Task>,
    changePassword: (passwordData: PasswordData) => Promise<Task>,
    invalidateToken: (refreshToken: string) => Promise<Task>
  }
}
