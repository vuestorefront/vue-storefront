
import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import Review from '@vue-storefront/core/modules/review/types/Review'
import ReviewState from '../type/ReviewState'

const arraySum = (arr): number => arr.reduce((a, b) => a + b, 0)
const arrayAvg = (arr): number => {
  const sum = arraySum(arr)
  return sum > 0 ? sum / arr.length : sum
}

const getters: GetterTree<ReviewState, RootState> = {
  getReviews: (state): Review[] => state.items.items || [],
  getReviewAvgRating: (state) => (review: Review): number => {
    return arrayAvg(review.ratings.map(r => r.percent))
  },
  getReviewsCount: (state, getters): number => getters.getReviews.length || 0,
  getReviewsTotalRating: (state, getters): number => {
    return arrayAvg(
      getters.getReviews.map(
        rvw => arrayAvg(rvw.ratings.map(r => r.percent))
      )
    )
  }
}

export default getters
