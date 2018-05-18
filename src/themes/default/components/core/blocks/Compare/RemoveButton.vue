<template>
  <button
    class="brdr-none bg-cl-transparent p15"
    :aria-label="$t('Remove')"
    :title="$t('Remove')"
  >
    <i class="material-icons h4">close</i>
  </button>
</template>

<script>
import removeButton from 'core/components/blocks/Compare/removeButton'

export default {
  mixins: [removeButton]
}
</script>
