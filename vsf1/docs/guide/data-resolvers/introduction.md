# Introduction

## What are the data resolvers?

The `data resolvers` are the way of manage the network/api calls and split them from the rest of application. All of available `data resolvers` you can find in the `core/data-resolver` directory.
If you want to trigger a network call, you should create a new `data resolver`, and import it in the place where it's needed.

## How to create a data resolver
First of all, please create a type for it under the namespace `DataResolver`, then just create a new data resolver like this example below:


```js
import { DataResolver } from './types/DataResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'

const headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

const myNewNetworkCall = async (data: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(/* some endpoint */),
    payload: {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify({ data })
    }
  })

export const YourService: DataResolver.YourService = {
  myNewNetworkCall,
}
```

## Available data resolvers

- [CategoryService](category-service.md)
- [UserService](user-service.md)
