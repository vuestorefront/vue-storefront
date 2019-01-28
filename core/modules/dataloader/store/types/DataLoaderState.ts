// Data loader queues all the data fetching operations and runs them at once - to be usedf for example in the `asyncData()` functions
import { DataLoaderAction } from './DataLoaderAction'
export interface DataLoaderState {
  actions: Array<DataLoaderAction>
}