import config from 'config';
import { DataResolver } from './types/DataResolver';
import { processURLAddress } from '@vue-storefront/core/helpers';

const status = (email: string): Promise<any> =>
  fetch(processURLAddress(config.newsletter.endpoint) + '?email=' + encodeURIComponent(email), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors'
  }).then(res => res.json())

const subscribe = (email: string): Promise<any> =>
  fetch(processURLAddress(config.newsletter.endpoint), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({ email })
  })

const unsubscribe = (email: string): Promise<any> =>
  fetch(processURLAddress(config.newsletter.endpoint), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({ email })
  })

export const NewsletterService: DataResolver.NewsletterService = {
  status,
  subscribe,
  unsubscribe
}
