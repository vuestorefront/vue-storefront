<template>
  <div class="mb35">
    <!-- My newsletter header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6" :class="{ 'cl-accent' : !isActive }">
        <h3 class="m0 mb5">
          {{ $t('My newsletter') }}
        </h3>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="lh30 flex end-md" v-if="!isActive && editMode">
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
        class="col-xs-12 mb15"
        id="generalAgreement"
        v-model="newsletterPreferences.generalAgreement"
        @click="isActive ? newsletterPreferences.generalAgreement = !newsletterPreferences.generalAgreement : null"
        :disabled="!isActive"
      >
        {{ $t('I want to receive a newsletter, and agree to its terms') }}
      </base-checkbox>

      <div class="col-xs-12">
        <h4>
          {{ $t('Preferences') }}
        </h4>
      </div>

      <base-checkbox
        class="col-xs-6 col-md-2 mb25"
        id="men"
        v-model="newsletterPreferences.men"
        @click="isActive ? newsletterPreferences.men = !newsletterPreferences.men : null"
        :disabled="!isActive"
      >
        {{ $t('Men') }}
      </base-checkbox>

      <base-checkbox
        class="col-xs-6 col-md-2 mb25"
        id="women"
        v-model="newsletterPreferences.women"
        @click="isActive ? newsletterPreferences.women = !newsletterPreferences.women : null"
        :disabled="!isActive"
      >
        {{ $t('Women') }}
      </base-checkbox>

      <base-checkbox
        class="col-xs-6 col-md-2 mb25"
        id="kids"
        v-model="newsletterPreferences.kids"
        @click="isActive ? newsletterPreferences.kids = !newsletterPreferences.kids : null"
        :disabled="!isActive"
      >
        {{ $t('Kids') }}
      </base-checkbox>

      <base-checkbox
        class="col-xs-6 col-md-2 mb25"
        id="home"
        v-model="newsletterPreferences.home"
        @click="isActive ? newsletterPreferences.home = !newsletterPreferences.home : null"
        :disabled="!isActive"
      >
        {{ $t('Home') }}
      </base-checkbox>

      <div class="col-xs-12 col-sm-6" v-if="isActive">
        <button-full @click.native="updateNewsletter">
          {{ $t('Update my preferences') }}
        </button-full>
      </div>

      <div class="col-xs-12 col-sm-6 flex middle-xs py10" v-if="isActive">
        <a href="#" @click="exitSection" class="h4 cl-accent">
          {{ $t('Cancel') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'

export default {
  components: {
    ButtonFull,
    BaseCheckbox
  },
  mixins: [coreComponent('blocks/MyAccount/MyNewsletter')]
}
</script>
