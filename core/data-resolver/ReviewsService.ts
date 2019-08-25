import { DataResolver } from './types/DataResolver';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import { processLocalizedURLAddress } from '@vue-storefront/core/helpers'
import config from 'config'
import Review from 'core/modules/review/types/Review';

const createReview = (review: Review): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(config.reviews.create_endpoint),
    payload: {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ review })
    }
  })

export const ReviewsService: DataResolver.ReviewsService = {
  createReview
}
