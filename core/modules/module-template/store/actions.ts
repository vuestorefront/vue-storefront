import { ExampleState } from '../types/ExampleState'
import { ActionTree } from 'vuex';
// you can use this storage if you want to enable offline capabilities
import { cacheStorage } from './cache-storage'

// it's a good practice for all actions to return Promises
export const actions: ActionTree<ExampleState, any> = {

}