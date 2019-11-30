<template>
  <div class="mb35">
    <!-- My newsletter header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6">
        <h3 class="m0 mb5">
          {{ $t('My newsletter') }}
        </h3>
      </div>
    </div>

    <!-- My newsletter body (both modes) -->
    <div class="row">
      <div class="col-xs-12">
        <h4>
          {{ $t('General agreement') }}
        </h4>
      </div>

      <base-checkbox
        class="col-xs-12 mb25 cl-primary"
        id="generalAgreement"
        v-model="user.isSubscribed"
        @click="edit()"
      >
        {{ $t('I want to receive a newsletter, and agree to its terms') }}
      </base-checkbox>

      <div class="col-xs-12 col-sm-6">
        <button-full @click.native="updateNewsletter">
          {{ $t('Update my preferences') }}
        </button-full>
      </div>
    </div>
  </div>
</template>

<script>
import { Newsletter } from '@vue-storefront/core/modules/newsletter/components/Newsletter'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'

export default {
  components: {
    ButtonFull,
    BaseCheckbox
  },
  data () {
    return {
    }
  },
  methods: {
    edit () {
      this.isEdited = true
    },
    updateNewsletter () {
      if (this.user.isSubscribed) {
        this.subscribe()
      } else {
        this.unsubscribe()
      }
    }
  },
  mixins: [Newsletter]
}
</script>
