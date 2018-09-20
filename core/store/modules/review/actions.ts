import { ActionTree } from "vuex";
import { quickSearchByQuery } from "core/store/lib/search";
import { adjustMultistoreApiUrl } from '../../lib/multistore'
import RootState from "../../types/RootState";
import ReviewState from "./types/ReviewState";
import * as types from '../../mutation-types'
import EventBus from "@vue-storefront/core/plugins/event-bus";
import i18n from '@vue-storefront/i18n'
import rootStore from "core/store";
import {ValidationError} from "core/store/lib/exceptions";
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
  list (context, { query, start = 0, size = 50, entityType = 'review', sort = '', excludeFields = null, includeFields = null}) {
    return quickSearchByQuery({ query, start, size, entityType, sort, excludeFields, includeFields }).then((resp) => {
      return resp
    })
  },

  setReviews (context, items) {
    context.commit(types.REVIEW_UPD_REVIEWS, items)
  },

  /**
   * Add new review
   *
   * @param context
   * @param reviewData
   * @returns {Promise<void>}
   */
  add (context, reviewData) {
    const ajv = new Ajv()
    const reviewSchema = require('./review.schema.json')
    const validate = ajv.compile(reviewSchema)
    const review = {review: reviewData}

    if (!validate(review)) {
      EventBus.$emit('notification', {
        type: 'error',
        message: i18n.t('Internal validation error. Please check if all required fields are filled in. Please contact us on contributors@vuestorefront.io'),
        action1: { label: i18n.t('OK'), action: 'close' }
      })
      throw new ValidationError(validate.errors)
    } else {
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
          if (resp.code === 200) {
            EventBus.$emit('notification', {
              type: 'success',
              message: i18n.t('You submitted your review for moderation.'),
              action1: { label: i18n.t('OK'), action: 'close' }
            })
            EventBus.$emit('clear-add-review-form')
          }
        }).catch(function() {
          EventBus.$emit('notification', {
            type: 'error',
            message: i18n.t('Something went wrong. Try again in a few seconds.'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        });
    }
  }
}

export default actions
