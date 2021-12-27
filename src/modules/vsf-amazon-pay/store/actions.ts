import { AmazonPayState } from '../types/AmazonPayState'
import { ActionTree } from 'vuex'
import config from 'config'
import fetch from 'isomorphic-fetch'
import rootStore from '@vue-storefront/core/store'
import * as types from './mutation-types'
import * as states from './order-states'
import { cacheStorage } from '../'

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<AmazonPayState, any> = {
  // getLoginProfile ({ commit }, accessToken): Promise<Response> {
  //   let decodedAccessToken = decodeURIComponent(accessToken)
  //   let encodeAccessToken = encodeURIComponent(decodedAccessToken)
  //   let sandboxStr = 'api'

  //   if (config.amazonPay.sandbox) {
  //     sandboxStr += '.sandbox'
  //   }

  //   const apiUrl = `https://${sandboxStr}.amazon.com`

  //   return new Promise((resolve, reject) => {
  //     fetch(apiUrl + '/auth/o2/tokeninfo?access_token=' + encodeAccessToken, {
  //       method: 'GET',
  //       mode: 'cors'
  //     }).then(resp => {
  //       resp.json().then(data => {
  //         if (data['aud'] != config.amazonPay.clientId) {
  //           reject(new Error('Invalid Access Token'))
  //         }

  //         resolve(new Promise((resolve, reject) => {
  //           fetch(apiUrl + '/user/profile', {
  //             method: 'GET',
  //             mode: 'cors',
  //             headers: new Headers({
  //               'Authorization': 'bearer ' + decodedAccessToken
  //             })
  //           }).then(res => {
  //             res.json().then(profile => {
  //               commit(types.SET_USER_ID, profile.user_id)
  //               commit(types.SET_USER_TOKEN, decodedAccessToken)
  //               resolve(res)
  //             }).catch(err => {
  //               reject(err)
  //             })
  //           }).catch(err => {
  //             reject(err)
  //           })
  //         }))
  //       }).catch(err => {
  //         reject(err)
  //       })
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // }
  getOrderReferenceDetails ({ state }): Promise<Response> {
    let encodeAccessToken = encodeURIComponent(state.userToken.token)
    let url = `${config.amazonPay.endpoint.GetOrderReferenceDetails}?orderReferenceId=${state.orderReferenceId}&accessToken=${encodeAccessToken}`

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      }).then(resp => {
        if(resp.ok) {
          resolve(resp.json())
        } else {
          reject(resp)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  setOrderReferenceDetails ({ state }, orderReferenceAttributes): Promise<Response> {
    let url = `${config.amazonPay.endpoint.SetOrderReferenceDetails}?orderReferenceId=${state.orderReferenceId}`

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ orderReferenceAttributes })
      }).then(resp => {
        if(resp.ok) {
          resolve(resp.json())
        } else {
          reject(resp)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  submitFinalOrderReference({ commit, dispatch }): Promise<Response> {
    commit(types.SET_ORDER_STATE, states.DRAFT)

    let CurrencyCode = rootStore.state.cart.platformTotals.base_currency_code
    let totals = rootStore.getters['cart/getTotals']
    let Amount = 0.00

    totals.forEach(total => {
      if (total.code != 'grand_total') {
        Amount += total.value
      }
    })

    let orderReferenceAttributes = {
      OrderTotal: {
        Amount,
        CurrencyCode
      },
      SellerOrderAttributes: {
        StoreName: config.amazonPay.StoreName
      }
    }

    return dispatch('setOrderReferenceDetails', orderReferenceAttributes)
  },
  confirmOrderReference({ state, commit }): Promise<Response> {
    commit(types.SET_ORDER_STATE, states.OPEN)

    let url = `${config.amazonPay.endpoint.ConfirmOrderReference}?orderReferenceId=${state.orderReferenceId}`

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      }).then(resp => {
        if(resp.ok) {
          resolve(resp.json())
        } else {
          reject(resp)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  authorizeOrder({ state }): Promise<Response> {
    let CurrencyCode = rootStore.state.cart.platformTotals.base_currency_code
    let totals = rootStore.getters['cart/getTotals']
    let Amount = 0.00

    totals.forEach(total => {
      if (total.code != 'grand_total') {
        Amount += total.value
      }
    })

    let url = `${config.amazonPay.endpoint.Authorize}?orderReferenceId=${state.orderReferenceId}`

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          AuthorizationAmount: {
            Amount,
            CurrencyCode
          }
        })
      }).then(resp => {
        if(resp.ok) {
          resolve(resp.json())
        } else {
          reject(resp)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  cancelOrderReference({ state, commit }): Promise<Response> {
    commit(types.SET_ORDER_STATE, states.CANCELED)
    let url = `${config.amazonPay.endpoint.CancelOrderReference}?orderReferenceId=${state.orderReferenceId}`

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      }).then(resp => {
        if(resp.ok) {
          resolve(resp.json())
        } else {
          reject(resp)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  loadUserToken ({ commit }): Promise<Object> {
    return new Promise ((resolve, reject) => {
      cacheStorage.getItem('userToken').then(token => {
        if (token.expire_at > Date.now()) {
          commit(types.SET_USER_TOKEN, token)
          resolve(token)
        } else {
          commit(types.SET_USER_TOKEN, null)
          cacheStorage.removeItem('userToken')
          reject()
        }
      }).catch(() => reject())
    })
  },
  setUserToken ({ commit }, { token, useCache = true }): Promise<Object> {
    return new Promise ((resolve, reject) => {
      commit(types.SET_USER_TOKEN, token)
      if (useCache) cacheStorage.setItem('userToken', token)
      resolve(token)
    })
  },
  clearUserToken ({ commit }): Promise<Object> {
    return new Promise ((resolve, reject) => {
      commit(types.SET_USER_TOKEN, null)
      cacheStorage.removeItem('userToken')
      resolve()
    })
  }
}
