import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import { DataLoaderAction } from './types/DataLoaderAction';
import { DataLoaderState } from './types/DataLoaderState';

export const mutations: MutationTree<any> = {
  [types.PUSH_ACTION] (state: DataLoaderState, payload: DataLoaderAction) {
    payload.scheduledAt = new Date()
    state.actions.push(payload)
  }
}