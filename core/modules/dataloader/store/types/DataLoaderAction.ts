// Data loader queues all the data fetching operations and runs them at once - to be usedf for example in the `asyncData()` functions
export interface DataLoaderAction {
    execute: any, // this function must return a Promise
    category?: string,
    name?: string,
    executedAt?: Date,
    scheduledAt?: Date
}