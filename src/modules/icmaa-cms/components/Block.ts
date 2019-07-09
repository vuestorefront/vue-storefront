import { mapGetters } from 'vuex'
import BlockStateItem from '../types/BlockState'
import { stringToComponent } from '../helpers'

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
    await this.$store.dispatch('icmaaCmsBlock/single', { value: this.identifier })
  },
  computed: {
    ...mapGetters({
      blockByIdentifier: 'icmaaCmsBlock/blockByIdentifier'
    }),
    loaded (): boolean {
      return (this.block && this.block.hasOwnProperty('content'))
    },
    block (): BlockStateItem {
      return this.blockByIdentifier(this.identifier)
    },
    content (): object {
      return stringToComponent(this.page.content)
    }
  }
}
