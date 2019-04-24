<template>
  <div class="mb35">
    <!-- My newsletter header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6" :class="{ 'cl-accent' : !isEdited }">
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
        @click="user.isSubscribed = !user.isSubscribed, edit()"
      >
        {{ $t('I want to receive a newsletter, and agree to its terms') }}
      </base-checkbox>

      <div class="col-xs-12 col-sm-6">
        <button-full @click.native="updateNewsletter" :disabled="!isEdited">
          {{ $t('Update my preferences') }}
        </button-full>
      </div>
    </div>
  </div>
</template>

<script>
import MyNewsletter from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyNewsletter'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'

export default {
  components: {
    ButtonFull,
    BaseCheckbox
  },
  data () {
    return {
      isEdited: false
    }
  },
  methods: {
    edit () {
      this.isEdited = true
    }
  },
  mixins: [MyNewsletter]
}
</script>
