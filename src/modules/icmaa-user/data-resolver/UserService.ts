import { processLocalizedURLAddress } from '@vue-storefront/core/helpers'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import config from 'config'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl'

const headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

const getLastOrder = async (token: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(
      getApiEndpointUrl(config.users, 'last_order').replace('{{token}}', token)
    ),
    payload: {
      method: 'GET',
      mode: 'cors',
      headers
    }
  })

export const UserService: any = {
  getLastOrder
}
