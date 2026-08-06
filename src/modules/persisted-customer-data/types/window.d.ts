import type { CustomerDataInput } from '../helpers/register-window-customer-data-updater.function'

declare global {
  interface BudsiesGlobal {
    updateCustomerData?: (data?: CustomerDataInput) => void
  }
}

export {}
