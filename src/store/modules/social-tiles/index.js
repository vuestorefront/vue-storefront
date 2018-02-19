import getters from './getters'
import igFeed from 'src/resource/ig_feed.json'

export default {
  namespaced: true,
  state: {
    tiles: igFeed
  },
  getters
}
