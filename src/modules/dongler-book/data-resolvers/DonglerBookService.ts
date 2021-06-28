import config from 'config';
import Task from '@vue-storefront/core/lib/sync/types/Task';
import { DataResolver } from './types/DataResolver';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync'

const requestBook = (email: string): Promise<Task> => {
  const url = processURLAddress(`${config.budsies.endpoint}/dongler-book-requests`);

  return TaskQueue.execute({
    url: url,
    payload: {
      headers: { 'Content-type': 'application/json' },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ email })
    },
    silent: true
  });
}

export const DonglerBookService: DataResolver.DonglerBookService = {
  requestBook
}
