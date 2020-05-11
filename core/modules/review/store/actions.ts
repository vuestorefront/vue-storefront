import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import RootState from '@vue-storefront/core/types/RootState'
import ReviewState from '../types/ReviewState'
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import Review from '@vue-storefront/core/modules/review/types/Review'
import { createLoadReviewsQuery } from '@vue-storefront/core/modules/review/helpers'
import { ReviewsService } from '@vue-storefront/core/data-resolver'

const actions: ActionTree<ReviewState, RootState> = {
  async list (context, { productId, approved = true, start = 0, size = 50, entityType = 'review', sort = '', excludeFields = null, includeFields = null }) {
    const query = createLoadReviewsQuery({ productId, approved })

    const reviewResponse = await quickSearchByQuery({ query, start, size, entityType, sort, excludeFields, includeFields })
    context.commit(types.REVIEW_UPD_REVIEWS, reviewResponse)
  },
  async add (context, review: Review) {
    EventBus.$emit('notification-progress-start', i18n.t('Adding a review ...'))

    const isReviewCreated = await ReviewsService.createReview(review)
    EventBus.$emit('notification-progress-stop')

    if (isReviewCreated) {
      EventBus.$emit('clear-add-review-form')
    }

    return isReviewCreated
  }
}

export default actions
