<template>
  <div
    class="t-flex t-items-center t-h-12 t-px-4 t-text-base-tone t-text-sm t-border-base-lightest t-cursor-pointer t-webkit-tap-transparent"
    :class="[ {'t-flex t-text-base-light': !variant.available}, {'t-bg-base-lightest t-text-black t-relative': isActive && isLoading}, {'t-text-base-light': !isActive && isLoading}, isLast ? 't-border-b-0' : ' t-border-b']"
    @click="selectVariant"
    :aria-label="$t('Select ' + variant.label)"
  >
    <template v-if="variant.available">
      {{ getOptionLabel({ attributeKey: variant.type, optionId: variant.id }) }}
      <loader-background v-if="isLoading && isActive" class="t-bottom-0" />
    </template>
    <template v-else>
      <span class="t-flex-auto">
        {{ getOptionLabel({ attributeKey: variant.type, optionId: variant.id }) }}
      </span>
      <span class="t-flex-fix t-text-xs">
        {{ $t('Request size') }}
      </span>
      <material-icon icon="mail_outline" class="t-flex-fix t-ml-4" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import filterMixin from 'theme/mixins/filterMixin.ts'
import focusClean from 'theme/components/theme/directives/focusClean'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import LoaderBackground from 'theme/components/core/LoaderBackground'

export default {
  mixins: [ filterMixin ],
  directives: { focusClean },
  components: {
    MaterialIcon,
    LoaderBackground
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('attribute', { getOptionLabel: 'getOptionLabel' })
  },
  methods: {
    selectVariant () {
      if (!this.isLoading) {
        this.$emit('change', this.variant)
      }
    }
  }
}
</script>
