<template>
  <transition name="fade">
    <div id="advice" v-if="advice && isOpen" class="t-w-full t-h-50px t-bg-alt-1 t-cursor-pointer t-text-sm" @click="redirect">
      <div class="t-container t-flex t-items-center t-h-full t-justify-end t-text-white">
        <div class="t-flex t-flex-1 t-items-center t-justify-center">
          <div class="md:t-mr-10">
            {{ advice.text }}
          </div>
          <button-component class="t-text-xs t-uppercase t-text-white" :type="'ghost-custom'" :custom-color="'white'">
            {{ advice.buttonText }}
          </button-component>
        </div>
        <button-component class="t-justify-end" type="transparent-white" icon="close" :icon-only="true" @click.stop.native="close">
          {{ $t('Close') }}
        </button-component>
      </div>
      <div />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import { onlineHelper } from '@vue-storefront/core/helpers'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'Advice',
  props: {
    tags: {
      type: String,
      required: true
    }
  },
  components: {
    ButtonComponent
  },
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    close () {
      this.$store.dispatch('claims/set', { claimCode: 'adviceClaimAccepted', value: true })
      this.isOpen = false
    },
    redirect () {
      this.$store.dispatch('claims/set', { claimCode: 'adviceClaimAccepted', value: true })
      this.$router.push(this.localizedRoute(this.advice.link))
      this.isOpen = false
    }
  },
  created () {
    this.$store.dispatch('claims/check', { claimCode: 'adviceClaimAccepted' })
      .then(claim => {
        if (!claim) {
          this.isOpen = true
          this.$store.dispatch('claims/set', { claimCode: 'adviceClaimAccepted', value: false })
        } else {
          this.isOpen = !claim.value
        }
      })
  },
  computed: {
    ...mapGetters('icmaaAdvice', ['getSingleAdvice']),
    advice () {
      return this.getSingleAdvice(this.tags)
    }
  },
  mounted () {
    this.$store.dispatch('icmaaAdvice/list')
  }
}
</script>
