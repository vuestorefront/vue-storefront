import { mapGetters } from 'vuex'
import BlockStateItem from '../types/BlockState'
import { stringToComponent } from '../helpers'

import { isServer } from '@vue-storefront/core/helpers'

export default {
  props: {
    identifier: {
      type: String,
      default: null,
      required: true
    }
  },
  async serverPrefetch () {
    await this.fetchContent()
  },
  async created () {
    if (isServer) {
      return
    }

    await this.fetchContent()
  },
  computed: {
    ...mapGetters('icmaaCmsBlock', ['getBlockByIdentifier']),
    loaded (): boolean {
      return (this.block && this.block.hasOwnProperty('content'))
    },
    block (): BlockStateItem {
      return this.getBlockByIdentifier(this.identifier)
    },
    content (): object {
      return stringToComponent(this.block.content)
    }
  },
  methods: {
    async fetchContent () {
      await this.$store.dispatch('icmaaCmsBlock/single', { value: this.identifier })
    }
  }
}
