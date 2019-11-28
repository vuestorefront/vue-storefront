import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CompetitionsState, { Competition } from '../types/CompetitionsState'

const getters: GetterTree<CompetitionsState, RootState> = {
  getCompetitions: (state): Competition[] => state.items,
  getByIdentifier: (state, getters) =>
    (identifier: string): Competition|boolean => getters.getCompetitions.find(c => c.identifier === identifier)
}

export default getters
