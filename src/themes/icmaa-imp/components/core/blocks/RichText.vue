<template>
  <div class="t-my-8 t-container t-px-4">
    <component :is="htmlContent" class="t-text-sm t-leading-relaxed t-text-base-tone" />
  </div>
</template>

<script>
import config from 'config'
import { mapGetters } from 'vuex'
import { stringToComponent } from 'icmaa-cms/helpers'

export default {
  name: 'RichtText',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    htmlContent () {
      return stringToComponent(this.content)
    }
  }
}
</script>
