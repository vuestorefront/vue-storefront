<template>
  <div v-if="editUrl" class="t-absolute t-top-0 t-mt-2">
    <a :href="editUrl" @click.stop="/** Don't call parent redirect */" target="_blank" class="t-block t-bg-white t-p-2 t-text-xs t-font-mono t-text-base-tone">
      <material-icon icon="edit" size="lg" class="t-align-middle" />
    </a>
  </div>
</template>

<script>

import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'TeaserEditButton',
  components: {
    MaterialIcon
  },
  props: {
    editUrl: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>
