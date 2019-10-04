import { GetterTree } from 'vuex'
import SpotifyState from '../types/SpotifyState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<SpotifyState, RootState> = {
  getRelatedArtists: (state) => state.relatedArtists,
  getRelatedArtistsByCategoryId: (state) => (id: number): string[] => state.relatedArtists[id] || [],
  getRelatedArtistsCategoriesByCategoryId: (state, getters, rootState, rootGetters) => (id: number): Category[] => {
    return getters.getRelatedArtistsByCategoryId(id)
      .map(name => rootGetters['icmaaCategoryExtras/getCategoryBy']('name', name))
      .filter(c => c && c.name)
  },
  getRelatedArtistsCategoriesByCurrentCategory: (state, getters, rootState, rootGetters): Category[] => {
    const category = rootGetters['category-next/getCurrentCategory']
    return getters.getRelatedArtistsCategoriesByCategoryId(category.id)
  }
}

export default getters
