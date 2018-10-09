<template>
  <div class="mb35">
    <!-- My newsletter header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6" :class="{ 'cl-accent' : !isEdited }">
        <h3 class="m0 mb5">
          {{ $t('My newsletter') }}
        </h3>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="lh30 flex end-md" v-if="!isEdited">
          <a href="#" class="cl-tertiary flex" @click.prevent="edit">
            <span class="pr5">
              {{ $t('Edit newsletter preferences') }}
            </span>
            <i class="material-icons cl-tertiary">edit</i>
          </a>
        </div>
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
        class="col-xs-12 mb25"
        id="generalAgreement"
        v-model="user.isSubscribed"
        @click="isEdited ? user.isSubscribed = !user.isSubscribed : null"
        :disabled="!isEdited"
      >
        {{ $t('I want to receive a newsletter, and agree to its terms') }}
      </base-checkbox>

      <div class="col-xs-12 col-sm-6" v-if="isEdited">
        <button-full @click.native="updateNewsletter">
          {{ $t('Update my preferences') }}
        </button-full>
      </div>

      <div class="col-xs-12 col-sm-6 flex middle-xs py10" v-if="isEdited">
        <a href="#" @click="exitSection" class="h4 cl-accent">
          {{ $t('Cancel') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MyNewsletter from '@vue-storefront/core/components/blocks/MyAccount/MyNewsletter'
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
    exitSection () {
      this.isEdited = false
    },
    edit () {
      this.isEdited = true
    }
  },
  mixins: [MyNewsletter]
}
</script>
