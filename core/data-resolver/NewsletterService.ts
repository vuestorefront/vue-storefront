import config from 'config';
import { DataResolver } from './types/DataResolver';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';

const isSubscribed = (email: string): Promise<boolean> =>
  TaskQueue.execute({
    url: processURLAddress(getApiEndpointUrl(config.newsletter, 'endpoint')) + '?email=' + encodeURIComponent(email),
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    silent: true
  }).then(({ result }) => result === 'subscribed')

const subscribe = (email: string): Promise<boolean> =>
  TaskQueue.execute({
    url: processURLAddress(getApiEndpointUrl(config.newsletter, 'endpoint')),
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ email })
    }
  }).then(({ code }) => code === 200)

const unsubscribe = (email: string): Promise<boolean> =>
  TaskQueue.execute({
    url: processURLAddress(getApiEndpointUrl(config.newsletter, 'endpoint')),
    payload: {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ email })
    }
  }).then(({ code }) => code === 200)

export const NewsletterService: DataResolver.NewsletterService = {
  isSubscribed,
  subscribe,
  unsubscribe
}
