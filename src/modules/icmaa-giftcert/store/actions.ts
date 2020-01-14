import { ActionTree } from 'vuex'
import { entities } from 'config'
import GiftcertService from '../data-resolver/GiftcertService'
import RootState from '@vue-storefront/core/types/RootState'
import GiftcertState from '../types/GiftcertState'
import * as types from './mutation-types'

const actions: ActionTree<GiftcertState, RootState> = {
  async fetchGiftcert ({ commit }, { number = '', pin = '' } = {}): Promise<boolean> {
    commit(types.ICMAA_GIFTCERT_CLR)

    const result = await GiftcertService.loadGiftcert(number)
    commit(
      types.ICMAA_GIFTCERT_ADD,
      { number: result.cert_number, balance: result.balance, expires: result.expire_at, currency: result.currency_code }
    )
    return true
  },
  clearGiftcert ({ commit }): void {
    commit(types.ICMAA_GIFTCERT_CLR)
  }
}

export default actions
