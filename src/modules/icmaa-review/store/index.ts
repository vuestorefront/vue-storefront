import { Module } from 'vuex'
import getters from './getters'
import ReviewState from '../type/ReviewState'

export const ExtendedReviewStore: Module<ReviewState, any> = {
  getters
}
