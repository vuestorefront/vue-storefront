<template>
  <div class="t-p-4 t-bg-white">
    <headline icon="home">
      {{ $t('My addresses') }}
    </headline>

    <div class="list t-flex t-flex-wrap t-flex-grow t--mx-2" v-if="!edit">
      <div v-for="(a, i) in addresses" :key="i" class="t-flex t-w-full sm:t-w-1/2 lg:t-w-1/3 t-px-2 t-mb-4 t-cursor-pointer" @click="editAddress(a.entity_id)">
        <div class="t-w-full t-text-sm t-leading-snug t-border t-border-base-lightest t-p-4">
          <p v-if="a.company" v-text="a.company" />
          <p>{{ a.prefix }} {{ a.firstname }} {{ a.lastname }} {{ a.suffix }}</p>
          <p>{{ a.street }}</p>
          <p>{{ a.postcode }} {{ a.city }}</p>
          {{ a.country.name }}
          <div v-if="a.is_default_billing || a.is_default_shipping" class="t-mt-2">
            <div v-if="a.is_default_billing" class="t-text-xs t-text-base-light">
              <material-icon icon="check" size="xs" class="t-inline-flex t-align-bottom" />
              {{ $t('Default billing address') }}
            </div>
            <div v-if="a.is_default_shipping" class="t-text-xs t-text-base-light">
              <material-icon icon="check" size="xs" class="t-inline-flex t-align-bottom" />
              {{ $t('Default shipping address') }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="addresses.length === 0" class="t-flex t-w-full sm:t-w-1/2 lg:t-w-1/3 t-px-2 t-mb-4 t-cursor-pointer" @click="editAddress(true)">
        <div class="t-w-full t-text-sm t-leading-snug t-border t-border-base-lightest t-p-4 t-h-32 t-flex t-flex-wrap t-items-center">
          <div class="t-w-full">
            <div>{{ $t('There are no addresses yet.') }}</div>
            <div class="t-text-base-light">
              {{ $t('Click here to add a new one') }}
            </div>
          </div>
        </div>
      </div>
      <div class="t-w-full t-px-2">
        <button-component @click="editAddress(true)">
          {{ $t('New address') }}
        </button-component>
      </div>
    </div>

    <div class="form" v-if="edit">
      <form @submit.prevent="submit" novalidate class="t-flex t-flex-wrap t--mx-2">
        <base-input
          name="firstname"
          id="firstname"
          autocomplete="given-name"
          v-model="address.firstname"
          :label="$t('First name') + ' *'"
          :validations="[
            {
              condition: !validation.firstname.required && validation.firstname.$error,
              text: $t('Field is required.')
            },
            {
              condition: !validation.firstname.latin && validation.firstname.$error,
              text: $t('Invalid characters.')
            }
          ]"
          class="t-w-1/2 lg:t-w-1/4 t-px-2 t-mb-4"
        />
        <base-input
          name="lastname"
          id="lastname"
          autocomplete="family-name"
          v-model="address.lastname"
          :label="$t('Last name') + ' *'"
          :validations="[
            {
              condition: !validation.lastname.required && validation.lastname.$error,
              text: $t('Field is required.')
            },
            {
              condition: !validation.lastname.latin && validation.lastname.$error,
              text: $t('Invalid characters.')
            }
          ]"
          class="t-w-1/2 lg:t-w-1/4 t-px-2 t-mb-4"
        />
        <base-input
          name="company"
          id="company"
          autocomplete="company"
          v-model="address.company"
          :label="$t('Company name')"
          :validations="[{
            condition: !validation.company.latin && validation.company.$error,
            text: $t('Invalid characters.')
          }]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <div class="t-w-full lg:t-w-1/2 t-px-2">
          <base-input
            v-for="(street,i) in address.street" :key="i"
            :name="`street[${i}]`"
            :id="`street-${i}`"
            autocomplete="street"
            v-model="address.street[i]"
            :label="i === 0 ? $t('Street') + ' *' : false"
            :validations="[
              {
                condition: houseNumberAdvice,
                text: $t('Forgot your house number?')
              },
              {
                condition: !validation.street.$each[i].required && validation.street.$error,
                text: $t('Field is required.')
              },
              {
                condition: (!validation.street.$each[i].latin || !validation.street.$each[i].streetname) && validation.street.$error,
                text: $t('Invalid characters.')
              }
            ]"
            class="t-w-full"
            :class="[ i === address.street.length - 1 ? 't-mb-4' : 't-mb-2' ]"
          />
        </div>
        <base-input
          name="city"
          id="city"
          autocomplete="city"
          v-model="address.city"
          :label="$t('City') + ' *'"
          :validations="[
            {
              condition: !validation.city.required && validation.city.$error,
              text: $t('Field is required.')
            },
            {
              condition: !validation.city.latin && validation.city.$error,
              text: $t('Invalid characters.')
            }
          ]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <base-input
          name="postcode"
          id="postcode"
          autocomplete="postcode"
          v-model="address.postcode"
          :label="$t('Postcode') + ' *'"
          :validations="[
            {
              condition: !validation.postcode.required && validation.postcode.$error,
              text: $t('Field is required.')
            },{
              condition: !validation.postcode.postcode && validation.postcode.$error,
              text: $t('This is not a valid postcode. Format: {code}', { code: postCodeFormat})
            }
          ]"
          class="t-w-1/2 lg:t-w-1/4 t-px-2 t-mb-4"
        />
        <country-select
          name="country_id"
          id="country_id"
          v-model="address.country_id"
          :label="$t('Country') + ' *'"
          :validations="[{
            condition: !validation.country_id.required && validation.country_id.$error,
            text: $t('Field is required.')
          }]"
          class="t-w-1/2 lg:t-w-1/4 t-px-2 t-mb-4"
        />
        <div class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4">
          <base-input
            name="telephone"
            id="telephone"
            autocomplete="telephone"
            v-model="address.telephone"
            :label="$t('Telephone')"
            :validations="[{
              condition: !validation.telephone.unicodeAlphaNum && validation.telephone.$error,
              text: $t('Only alphanumeric characters are allowed.')
            }]"
          />
          <div class="t-mt-2 t-text-xs t-text-base-light t-leading-snug" v-if="['FR'].includes(countryId)">
            En cas de problème avec votre livraison, le coursier GLS peut vous contacter par téléphone pour décider d'une nouvelle date de livraison.
          </div>
        </div>
        <div v-if="hasVatId" class="t-w-full t-mb-4">
          <base-input
            name="vat_id"
            id="vat_id"
            autocomplete="vat_id"
            v-model="address.vat_id"
            :label="$t('VAT number') + ' *'"
            :validations="[
              {
                condition: !validation.vat_id.required && validation.vat_id.$error,
                text: $t('Field is required.')
              }
            ]"
            class="t-w-full lg:t-w-1/2 t-px-2"
          />
        </div>
        <base-checkbox
          name="is_default_billing"
          id="is_default_billing"
          v-model="address.is_default_billing"
          class="t-w-full lg:t-w-1/2 t-px-2"
          :disabled="customerAddress && customerAddress.is_default_billing"
        >
          {{ $t('Use as my default billing address') }}
        </base-checkbox>
        <base-checkbox
          name="is_default_shipping"
          id="is_default_shipping"
          v-model="address.is_default_shipping"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
          :disabled="customerAddress && customerAddress.is_default_shipping"
        >
          {{ $t('Use as my default shipping address') }}
        </base-checkbox>
        <div class="t-px-2 t-w-full t-flex t-flex-wrap t-justify-between">
          <button-component :submit="true" type="primary" size="lg" class="t-w-full lg:t-w-auto lg:t-order-3">
            {{ $t('Save address') }}
          </button-component>
          <button-component type="ghost" icon="keyboard_arrow_left" icon-position="left" class="t-flex-1 lg:t-flex-fix t-w-1/2 t-mt-4 lg:t-mt-0 lg:t-w-auto lg:t-order-1" @click="back">
            {{ $t('Back') }}
          </button-component>
          <div v-if="!isNewAddress && !isDefaultAddress && address.entity_id" class="t-flex-1 t-w-1/2 t-pl-4 lg:t-order-2">
            <button-component type="ghost" icon="delete" icon-position="left" class="t-w-full t-mt-4 lg:t-mt-0 lg:t-w-auto " :confirm="true" @click="deleteAddress(address.entity_id)">
              {{ $t('Delete') }}
            </button-component>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from 'config'
import i18n from '@vue-storefront/i18n'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import pick from 'lodash-es/pick'
import invert from 'lodash-es/invert'

import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { latin, unicodeAlphaNum, streetname, postcode, getPostcodeRegex } from 'icmaa-config/helpers/validators'
import { date } from 'icmaa-config/helpers/validators'
import { toDate } from 'icmaa-config/helpers/datetime'

import Headline from 'theme/components/core/blocks/MyAccount/Headline'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonComponent from 'theme/components/core/blocks/Button'
import CountrySelect from 'theme/components/core/blocks/Form/CountrySelect'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

import { getTranslatedCountries } from 'icmaa-config/helpers/countries'

export default {
  name: 'MyAdresses',
  data () {
    return {
      edit: false,
      isNewAddress: false,
      isDelete: false,
      address: {},
      countries: getTranslatedCountries()
    }
  },
  components: {
    Headline,
    BaseCheckbox,
    BaseInput,
    ButtonComponent,
    CountrySelect,
    MaterialIcon
  },
  computed: {
    ...mapGetters({
      viewport: 'ui/getViewport',
      customer: 'user/getCustomer'
    }),
    addresses () {
      return this.customer.addresses.map(address => {
        let { entity_id, company, prefix, firstname, lastname, suffix, postcode, city, country_id, is_default_billing, is_default_shipping } = address
        let country = this.countries.find(c => c.code === country_id)
        let street = address.street.filter(s => s.length > 0).join('<br>')

        return { entity_id, company, prefix, firstname, lastname, suffix, street, postcode, city, country, is_default_billing, is_default_shipping }
      })
    },
    validation () {
      return this.$v.address
    },
    countryId () {
      return this.address.country_id.length > 0 ? this.address.country_id : undefined
    },
    postCodeFormat () {
      return getPostcodeRegex(this.address.country_id)[1]
    },
    houseNumberAdvice () {
      const street = this.address.street.join('')
      return street.length > 8 && !/(\d)+/.test(street)
    },
    customerAddress () {
      return this.customer.addresses.find(a => a.entity_id === this.address.entity_id)
    },
    isDefaultAddress () {
      let address = this.customerAddress
      return address && (address.is_default_billing === true || address.is_default_shipping === true)
    },
    hasVatId () {
      return ['IT'].includes(this.countryId)
    }
  },
  methods: {
    editAddress (entity_id) {
      this.edit = true
      this.isNewAddress = entity_id === true
      this.validation.$reset()

      this.address = Object.assign({}, this.address, pick(
        this.customer.addresses.find(a => a.entity_id === entity_id),
        ...Object.keys(this.address)
      ))

      if (this.address.street.length > 0) {
        this.address.street = [this.address.street.join(' ')]
      }
    },
    submit () {
      this.validation.$touch()
      if (!this.validation.$invalid) {
        let address = this.address
        let customer = this.customer

        if (customer.addresses.length < 1) {
          address.is_default_billing = true
          address.is_default_shipping = true
        }

        ['is_default_billing', 'is_default_shipping'].forEach(key => {
          if (address[key] === true) {
            customer.addresses.map(a => {
              a[key] = false
              return a
            })
          }
        })

        if (!this.hasVatId) {
          address.vat_id = null
        }

        customer.addresses = customer.addresses
          .map(a => a.entity_id === address.entity_id ? Object.assign(a, address) : a)

        if (this.isNewAddress || !address.entity_id) {
          customer.addresses.push(address)
        }

        this.$bus.$emit('myAccount-before-updateUser', customer)
      }

      return false
    },
    deleteAddress (entity_id) {
      if (this.isDefaultAddress) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Can\'t delete a default shipping nor billing address.'),
          action1: { label: i18n.t('OK') }
        })
        return
      }

      let customer = this.customer
      customer.addresses = customer.addresses
        .map(a => {
          if (a.entity_id === entity_id) {
            a.delete = true
          }
          return a
        })

      this.isDelete = true

      this.$bus.$emit('myAccount-before-updateUser', customer)
    },
    setAddressDefaults () {
      this.address = {
        entity_id: '',
        company: '',
        prefix: '',
        firstname: this.customer.firstname,
        lastname: this.customer.lastname,
        suffix: '',
        street: [''],
        postcode: '',
        city: '',
        country_id: currentStoreView().storeCode.toUpperCase(),
        telephone: '',
        vat_id: null,
        is_default_billing: false,
        is_default_shipping: false
      }

      return this.address
    },
    back () {
      this.edit = false
      this.setAddressDefaults()
    },
    onAfterUpdateUserSuccess () {
      if (this.isNewAddress) {
        const lastAddress = this.customer.addresses.slice(-1).pop()
        this.editAddress(lastAddress.entity_id)
        return
      }

      if (this.isDelete) {
        this.isDelete = false
        this.back()
        return
      }

      this.editAddress(this.address.entity_id)
    }
  },
  beforeMount () {
    this.$bus.$on('myAccount-after-updateUser-success', this.onAfterUpdateUserSuccess)
  },
  mounted () {
    this.setAddressDefaults()
  },
  destroyed () {
    this.$bus.$off('myAccount-after-updateUser-success', this.onAfterUpdateUserSuccess)
  },
  validations () {
    const vatId = this.hasVatId ? {
      vat_id: { required }
    } : {}

    return {
      address: {
        firstname: {
          required,
          latin
        },
        lastname: {
          required,
          latin
        },
        company: {
          latin
        },
        country_id: {
          required
        },
        street: {
          $each: {
            required,
            streetname,
            latin
          }
        },
        postcode: {
          required,
          postcode: postcode(this.countryId)
        },
        city: {
          required,
          latin
        },
        telephone: {
          unicodeAlphaNum
        },
        ...vatId
      }
    }
  }
}
</script>
