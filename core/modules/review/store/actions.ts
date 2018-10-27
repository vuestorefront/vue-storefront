import Vue from 'vue'
import { ActionTree } from "vuex"
import { quickSearchByQuery } from "core/store/lib/search"
import SearchQuery from 'core/store/lib/search/searchQuery'
import { adjustMultistoreApiUrl } from '@vue-storefront/store/lib/multistore'
import RootState from "@vue-storefront/store/types/RootState"
import ReviewState from "../types/ReviewState"
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import rootStore from "@vue-storefront/store"
import { ValidationError } from "core/store/lib/exceptions";
import Review from '@vue-storefront/core/modules/review/types/Review'
const Ajv = require('ajv') // json validator

const actions: ActionTree<ReviewState, RootState> = {
  /**
   * Retrieve reviews
   *
   * @param context
   * @param {any} query
   * @param {any} start
   * @param {any} size
   * @param {any} entityType
   * @param {any} sort
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  list (context, { productId, approved = true, start = 0, size = 50, entityType = 'review', sort = '', excludeFields = null, includeFields = null}) {
    let query = new SearchQuery()

    if (productId) {
      query = query.applyFilter({key: 'product_id', value: {'eq': productId}})
    }

    if (approved) {
      query = query.applyFilter({key: 'review_status', value: {'eq': 1}})
    }

    quickSearchByQuery({ query, start, size, entityType, sort, excludeFields, includeFields }).then((resp) => {
      context.commit(types.REVIEW_UPD_REVIEWS, resp)
    }).catch(err => {
      console.error(err)
    })
  },

  /**
   * Add new review
   *
   * @param context
   * @param reviewData
   * @returns {Promise<void>}
   */
  add (context, reviewData: Review) {
    const ajv = new Ajv()
    const reviewSchema = require('./review.schema.json')
    const validate = ajv.compile(reviewSchema)
    const review = {review: reviewData}

    if (!validate(review)) {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('Internal validation error. Please check if all required fields are filled in. Please contact us on contributors@vuestorefront.io'),
        action1: { label: i18n.t('OK') }
      })
      throw new ValidationError(validate.errors)
    } else {
      Vue.prototype.$bus.$emit('notification-progress-start', i18n.t('Adding a review ...'))

      let url = rootStore.state.config.reviews.create_endpoint

      if (rootStore.state.config.storeViews.multistore) {
        url = adjustMultistoreApiUrl(url)
      }

      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      }).then(resp => { return resp.json() })
        .then((resp) => {
          Vue.prototype.$bus.$emit('notification-progress-stop')
          if (resp.code === 200) {
            rootStore.dispatch('notification/spawnNotification', {
              type: 'success',
              message: i18n.t('You submitted your review for moderation.'),
              action1: { label: i18n.t('OK') }
            })
            Vue.prototype.$bus.$emit('clear-add-review-form')
          }
        }).catch(function() {
          Vue.prototype.$bus.$emit('notification-progress-stop')
          rootStore.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t('Something went wrong. Try again in a few seconds.'),
            action1: { label: i18n.t('OK') }
          })
        });
    }
  }
}

export default actions
