<template>
  <div>
    <size-navigation @toggle="toggle" :headline="content.headline" :show="show" />
    <template v-if="show==true">
      <div class="t-flex t-flex-wrap">
        <div class="t-text-sm lg:t-w-1/3 t-mt-4 t-mb-4 t-mr-4">
          {{ content.description }}
        </div>
        <div class="t-flex t-justify-between t-my-4">
          <img :src="getMediaThumbnail(content.image.boys, 0, 0)" class="t-w-1/2 t-pr-2">
          <img :src="getMediaThumbnail(content.image.girls, 0, 0)" class="t-w-1/2 t-pl-2">
        </div>
      </div>
      <div v-for="table in tables" :key="table">
        <size-table :table="content[table]" :headline="true" />
      </div>
    </template>
  </div>
</template>

<script>
import SizeTable from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Size/SizeTable'
import SizeNavigation from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Size/SizeNavigation'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'ServiceSizeLayout',
  components: {
    SizeTable,
    SizeNavigation
  },
  props: {
    content: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    tables () {
      return Object.keys(this.content).filter(el => el.includes('table'))
    }
  },
  methods: {
    toggle (param) {
      this.show = param
    }
  }
}
</script>
