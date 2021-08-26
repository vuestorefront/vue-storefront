import { Module } from 'vuex'
import GoogleTagManagerState from '../types/GoogleTagManagerState'

export const googleTagManagerModule: Module<GoogleTagManagerState, any> = {
  namespaced: true,
  state: {
    key: null
  }
}
