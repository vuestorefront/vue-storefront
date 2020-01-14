<template>
  <div class="t-p-4 t-bg-white">
    <headline icon="mail">
      {{ $t('My coupons') }}
    </headline>

    <div class="t-w-full lg:t-w-1/2 t-flex t-flex-wrap t-p-4 t-pb-2 t-mb-6 t-bg-base-lightest t-rounded-sm" v-if="number && number.length > 0">
      <template v-if="number && number.length > 0">
        <div class="t-w-full lg:t-w-1/3 t-px-2 t-mb-2 t-font-bold t-text-sm">
          {{ $t('Card number') }}
        </div>
        <div class="t-w-full lg:t-w-2/3 t-px-2 t-mb-2 t-font-mono">
          {{ number }}
        </div>
      </template>
      <template v-if="balance && currency && balance >= 0">
        <div class="t-w-full lg:t-w-1/3 t-px-2 t-mb-2 t-font-bold t-text-sm">
          {{ $t('Balance') }}
        </div>
        <div class="t-w-full lg:t-w-2/3 t-px-2 t-mb-2 t-font-mono">
          {{ balance }} {{ currency }}
        </div>
      </template>
      <template v-if="expires && expires !== null && expires.length > 0">
        <div class="t-w-full lg:t-w-1/3 t-px-2 t-mb-2 t-font-bold t-text-sm">
          {{ $t('Expires at') }}
        </div>
        <div class="t-w-full lg:t-w-2/3 t-px-2 t-mb-2 t-font-mono">
          {{ expires }}
        </div>
      </template>
    </div>

    <div class="t-w-full t-flex t-flex-wrap t--mx-2">
      <div class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4">
        <base-input
          type="text"
          name="code"
          :label="$t('Card number') + ' *'"
          v-model="giftCert.number"
          @blur="$v.giftCert.number.$touch()"
          :validations="[
            {
              condition: $v.giftCert.number.$error && !$v.giftCert.number.required,
              text: $t('Field is required')
            }
          ]"
        />
      </div>

      <div class="t-px-2 t-w-full t-mb-4">
        <button-component type="primary" class="t-flex-1 lg:t-flex-fix" @click="fetchGiftcert">
          {{ $t('Check balance') }}
        </button-component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Headline from 'theme/components/core/blocks/MyAccount/Headline'
import i18n from '@vue-storefront/i18n'
import { required } from 'vuelidate/lib/validators'
import ButtonComponent from 'theme/components/core/blocks/Button'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

export default {
  name: 'MyGiftcert',
  components: {
    ButtonComponent,
    BaseInput,
    Headline
  },
  data () {
    return {
      giftCert: {
        number: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      number: 'icmaaGiftcert/getGiftcertNumber',
      balance: 'icmaaGiftcert/getGiftcertBalance',
      currency: 'icmaaGiftcert/getGiftcertCurrency',
      expires: 'icmaaGiftcert/getGiftcertExpires'
    })
  },
  validations: {
    giftCert: {
      number: {
        required
      }
    }
  },
  methods: {
    async fetchGiftcert () {
      await this.$store.dispatch('icmaaGiftcert/fetchGiftcert', { number: this.giftCert.number })
    }
  }
}
</script>
