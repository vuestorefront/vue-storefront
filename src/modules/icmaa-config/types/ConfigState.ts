import { StoreView } from '@vue-storefront/core/lib/types'

export interface StoreView {
  [key: string]: any
}

export default interface ConfigState {
  map: StoreView[]
}
