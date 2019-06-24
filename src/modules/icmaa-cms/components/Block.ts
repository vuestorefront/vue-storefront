import { mapGetters } from 'vuex'
import BlockStateItem from '../types/BlockState'

export default {
  name: 'IcmaaCmsBlock',
  props: {
    identifier: {
      type: String,
      default: null,
      required: true
    }
  },
  async created () {
    if (!this.block) {
      await this.$store.dispatch('icmaaCmsBlock/single', { value: this.identifier })
    }
  },
  computed: {
    ...mapGetters({
      blockByIdentifier: 'icmaaCmsBlock/blockByIdentifier'
    }),
    block (): BlockStateItem {
      return this.blockByIdentifier(this.identifier)
    }
  }
}
