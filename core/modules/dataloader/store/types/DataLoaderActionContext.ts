// Data loader queues all the data fetching operations and runs them at once - to be usedf for example in the `asyncData()` functions
export interface DataLoaderActionContext {
    category?: string,
    route: any,
    store: any,
    context: any
}