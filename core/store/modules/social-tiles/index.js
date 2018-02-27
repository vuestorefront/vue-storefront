import getters from './getters'
import igFeed from 'core/resource/ig_feed.json'

export default {
  namespaced: true,
  state: {
    tiles: igFeed
  },
  getters
}
