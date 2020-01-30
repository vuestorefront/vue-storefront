<template>
  <form @submit.prevent="submit" novalidate class="form-component t-flex t-flex-wrap t--mx-2 t-pb-4">
    <template v-for="(element, i) in formElements">
      <div :key="i"
           class="t-flex t-w-full t-px-2 t-mb-4"
           :class="{ 'lg:t-w-1/2': ['half', 'half-single'].includes(element.width) }"
      >
        <template v-if="element.component === 'form_input'">
          <base-input
            :name="element.name"
            :id="element.name"
            :label="element.label"
            :placeholder="element.placeholder"
            :mask="element.mask || undefined"
            :validations="validation[element.name]"
            v-model="form[element.name]"
            class="t-w-full"
          />
        </template>
        <template v-else-if="element.component === 'form_textarea'">
          <base-textarea
            :name="element.name"
            :id="element.name"
            :label="element.label"
            :placeholder="element.placeholder"
            :validations="validation[element.name]"
            v-model="form[element.name]"
            class="t-w-full"
          />
        </template>
        <template v-else-if="element.component === 'form_checkbox'">
          <base-checkbox
            :name="element.name"
            :id="element.name"
            :validations="validation[element.name]"
            :class="{ 'lg:t-mt-4': ['half', 'half-single'].includes(element.width) }"
            class="t-w-full"
            v-model="form[element.name]"
          >
            <template v-if="containsHtml(element.label)">
              <component :is="stringToComponent(element.label)" />
            </template>
            <template v-else>
              {{ element.label }}
            </template>
          </base-checkbox>
        </template>
        <template v-else-if="element.component === 'form_select'">
          <base-select
            :name="element.name"
            :id="element.name"
            :label="element.label"
            :options="element.options"
            :validations="validation[element.name]"
            v-model="form[element.name]"
            class="t-w-full"
          />
        </template>
        <template v-else-if="element.component === 'form_select_country'">
          <country-select
            :name="element.name"
            :id="element.name"
            :label="element.label"
            :validations="validation[element.name]"
            v-model="form[element.name]"
            class="t-w-full"
          />
        </template>
      </div>
      <div class="lg:t-w-1/2" v-if="['half-single'].includes(element.width)" :key="'spacer-' + i" />
    </template>
    <div class="t-flex t-w-full t-px-2">
      <div class="t-w-full t-mb-2 t-text-sm t-text-alert" v-if="recaptcha && $v.form.recaptcha.$error && !$v.form.recaptcha.required">
        {{ $t('Your Google reCAPTCHA validation is invalid.') }}<br>
        {{ $t('Please try again or contact our customer-support.') }}
      </div>
      <vue-recaptcha v-if="recaptcha" :sitekey="recaptchaWebsiteKey" :load-recaptcha-script="true" badge="inline" @verify="recaptchaVerify" class="t-w-full">
        <button-component @click="submit()" type="primary" class="t-w-full lg:t-w-auto t-mt-4">
          {{ submitButtonText }}
        </button-component>
      </vue-recaptcha>
      <button-component v-else :submit="true" type="primary" class="t-flex-1 lg:t-flex-fix">
        {{ submitButtonText }}
      </button-component>
    </div>
  </form>
</template>

<script>
import config from 'config'
import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import { date, postcode, isTrue, regex } from 'icmaa-config/helpers/validators'
import { stringToComponent } from 'icmaa-cms/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import CountrySelect from 'theme/components/core/blocks/Form/CountrySelect'
import ButtonComponent from 'theme/components/core/blocks/Button'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'Form',
  components: {
    BaseInput,
    BaseSelect,
    BaseCheckbox,
    BaseTextarea,
    CountrySelect,
    ButtonComponent,
    VueRecaptcha
  },
  props: {
    formElements: {
      type: Array,
      required: true
    },
    submitButtonText: {
      type: String,
      default: i18n.t('Submit')
    },
    recaptcha: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {},
      messages: {
        default: 'This isn\'t a valid field value.',
        email: 'Please provide valid e-mail address.',
        required: 'Field is required.'
      }
    }
  },
  watch: {
    form (data) {
      this.$emit('input', data)
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      customer: 'user/getCustomer'
    }),
    fields () {
      return this.formElements.map(element => {
        if (element.required && element.component !== 'form_checkbox' && !element.label.endsWith('*')) {
          element.label = element.label + ' *'
        }

        if (element.component === 'form_select') {
          element.options = element.options.map(o => {
            const { label, value } = o
            return { label, value }
          })
        }

        return element
      })
    },
    validator () {
      let validations = {}
      const textFields = ['form_input', 'form_textarea']
      this.fields.forEach(element => {
        let validation = {}
        if (element.required === true) {
          if (element.component === 'form_checkbox') {
            validation = Object.assign(validation, { isTrue })
          } else {
            validation = Object.assign(validation, { required })
          }
        }
        if (textFields.includes(element.component)) {
          if (element.name === 'email' || element.validation === 'email') {
            validation = Object.assign(validation, { email })
          } else if (element.validation === 'date') {
            validation = Object.assign(validation, { date })
          } else if (element.validation === 'postcode') {
            validation = Object.assign(validation, { postcode: postcode(this.countryId) })
          } else {
            const regexRule = regex(element.validation)
            validation = Object.assign(validation, { regexRule })
          }
        }

        validations[element.name] = validation
      })

      if (this.recaptcha) {
        validations.recaptcha = { required }
      }

      return validations
    },
    validation () {
      const messages = {}
      Object.keys(this.$v.form.$params).forEach(i => {
        let validation = []
        Object.keys(this.$v.form[i].$params).forEach(j => {
          validation.push({
            condition: !this.$v.form[i][j] && this.$v.form[i].$error,
            text: i18n.t(this.messages[j] || this.messages['default'])
          })
        })

        messages[i] = validation
      })

      this.fields.forEach(f => {
        if (!messages[f.name]) {
          messages[f.name] = []
        }
      })

      return messages
    },
    defaults () {
      let defaults = {}
      this.fields.forEach(element => {
        let value = ''
        if (element.component === 'form_select') {
          value = element.default || ''
        } else if (element.component === 'form_select_country') {
          value = currentStoreView().i18n.defaultCountry
        } else if (element.component === 'form_checkbox') {
          value = element.checked || undefined
        } else if (element.component === 'form_input' && element.name === 'email') {
          value = this.isLoggedIn ? this.customer.email : ''
        }
        defaults[element.name] = value
      })

      if (this.recaptcha) {
        defaults.recaptcha = ''
      }

      return defaults
    },
    countryId () {
      return this.form.country || currentStoreView().i18n.defaultCountry
    },
    recaptchaWebsiteKey () {
      return config.icmaa.googleRecaptcha.websiteKey || false
    }
  },
  methods: {
    containsHtml (string) {
      return /<\/?[a-z][\s\S]*>/i.test(string)
    },
    stringToComponent (string) {
      return stringToComponent(string)
    },
    submit () {
      if (this.recaptcha && !this.$v.form.recaptcha.$error && !this.$v.form.recaptcha.required) {
        return
      }

      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$emit('submit')
      }
    },
    recaptchaVerify (token) {
      this.form.recaptcha = token
      this.submit()
    }
  },
  validations () {
    return {
      form: this.validator
    }
  },
  created () {
    this.form = this.defaults
  }
}
</script>
