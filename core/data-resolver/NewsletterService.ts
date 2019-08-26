import config from 'config';
import { DataResolver } from './types/DataResolver';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'

const status = (email: string): Promise<Task> =>
  TaskQueue.execute({
    url: processURLAddress(config.newsletter.endpoint) + '?email=' + encodeURIComponent(email),
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    }
  })

const subscribe = (email: string): Promise<Task> =>
  TaskQueue.execute({
    url: processURLAddress(config.newsletter.endpoint),
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ email })
    }
  })

const unsubscribe = (email: string): Promise<Task> =>
  TaskQueue.execute({
    url: processURLAddress(config.newsletter.endpoint),
    payload: {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ email })
    }
  })

export const NewsletterService: DataResolver.NewsletterService = {
  status,
  subscribe,
  unsubscribe
}
