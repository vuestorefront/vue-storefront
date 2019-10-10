<template>
  <div class="t-fixed t-bottom-0 t-z-10 t-left-0 t-bg-white t-shadow t-p-4">
    <select class="t-border t-bg-white" @change="changeCluster" v-model="clusterSelect">
      <option v-for="(option, i) in clusterAttributeOptions" :key="'option-' + i" :value="option.value" :selected="cluster === option.value ? 'selected' : ''">
        {{ option.label }} - {{ option.value }}
      </option>
      <option :value="false">
        x Reset cluster
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClusterDebug',
  data () {
    return {
      clusterSelect: false
    }
  },
  computed: {
    ...mapGetters({
      cluster: 'user/getCluster',
      attributes: 'attribute/getAttributeListByCode'
    }),
    clusterAttribute () {
      let attributes = Object.values(this.attributes)
      let attribute = attributes.find(a => a.attribute_code === 'customercluster')

      /**
       * Because of a bug the state overwrites itself when `attribute/list` is called multiple times.
       * This is our workaround and not that bad because its just for debugging.
       * @see https://github.com/DivanteLtd/vue-storefront/issues/3698
       */
      if (!attribute) {
        this.fetchClusterAttribute()
      }

      return attribute
    },
    clusterAttributeOptions () {
      return this.clusterAttribute ? this.clusterAttribute.options : []
    }
  },
  methods: {
    changeCluster () {
      this.$store.dispatch('user/setCluster', this.clusterSelect)
    },
    fetchClusterAttribute () {
      this.$store.dispatch('attribute/list', { filterValues: ['customercluster'] })
    }
  },
  async mounted () {
    return this.fetchClusterAttribute()
  }
}
</script>
