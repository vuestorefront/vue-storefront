import toString from 'lodash-es/toString'
import pick from 'lodash-es/pick'
import config from 'config'
import { userHooks } from '@vue-storefront/core/modules/user/hooks'
const Countries = require('@vue-storefront/i18n/resource/countries.json')

export const UserShippingDetails = {
  name: 'MyShippingDetails',
  data () {
    return {
      shippingDetails: {
        firstName: '',
        lastName: '',
        street: '',
        house: '',
        city: '',
        postcode: '',
        region: '',
        country: '',
        phone: ''
      },
      countries: Countries,
      useCompanyAddress: false,
      currentUser: Object.assign({}, this.$store.state.user.current),
      isEdited: false,
      remainInEditMode: false
    }
  },
  beforeMount () {
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
    this.$bus.$on('myAccount-before-remainInEditMode', block => {
      if (block === 'MyShippingDetails') {
        this.remainInEditMode = true
      }
    })
  },
  beforeDestroy () {
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
    this.$bus.$off('myAccount-before-remainInEditMode')
  },
  mounted () {
    this.shippingDetails = this.getShippingDetails()
  },
  watch: {
    useCompanyAddress: {
      handler () {
        this.fillCompanyAddress()
      }
    }
  },
  methods: {
    onLoggedIn () {
      this.currentUser = Object.assign({}, this.$store.state.user.current)
      this.shippingDetails = this.getShippingDetails()
    },
    edit () {
      this.isEdited = true
    },
    objectsEqual (a, b) {
      const aProps = Object.keys(a)
      const bProps = Object.keys(b)

      if (aProps.length !== bProps.length) {
        return false
      }

      for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i]
        if (!b.hasOwnProperty(propName)) {
          return false
        } else {
          if (a[propName] !== null && b[propName] !== null && a[propName] === 'object' && b[propName] === 'object') {
            if (!this.objectsEqual(a[propName], b[propName])) {
              return false
            }
          } else if (a[propName] !== b[propName]) {
            return false
          }
        }
      }
      return true
    },
    updateDetails () {
      let updatedShippingDetails
      if (!this.objectsEqual(this.shippingDetails, this.getShippingDetails())) {
        updatedShippingDetails = JSON.parse(JSON.stringify(this.$store.state.user.current))
        let updatedShippingDetailsAddress = {
          firstname: this.shippingDetails.firstName,
          lastname: this.shippingDetails.lastName,
          street: [this.shippingDetails.street, this.shippingDetails.house],
          city: this.shippingDetails.city,
          ...(this.shippingDetails.region ? { region: { region: this.shippingDetails.region } } : {}),
          country_id: this.shippingDetails.country,
          postcode: this.shippingDetails.postcode,
          ...(this.shippingDetails.phone ? { telephone: this.shippingDetails.phone } : {})
        }
        if (this.currentUser.hasOwnProperty('default_shipping')) {
          if (this.currentUser.addresses.length === 0) {
            updatedShippingDetails = null
          } else {
            updatedShippingDetails.addresses = updatedShippingDetails.addresses.map((address) =>
              toString(address.id) === toString(this.currentUser.default_shipping)
                ? { ...address, ...updatedShippingDetailsAddress } // update default address if already exist
                : address
            )
          }
        } else {
          // create default address
          updatedShippingDetails.addresses.push({
            ...updatedShippingDetailsAddress,
            default_shipping: true
          })
        }
      }
      updatedShippingDetails = pick(updatedShippingDetails, config.users.allowModification)
      this.exitSection(null, updatedShippingDetails)
    },
    exitSection (event, updatedShippingDetails) {
      this.$bus.$emit('myAccount-before-updateUser', updatedShippingDetails)
      userHooks.afterUserProfileUpdated(event => {
        if (event.resultCode === 200) {
          if (!updatedShippingDetails) {
            this.shippingDetails = this.getShippingDetails()
            this.useCompanyAddress = false
            this.remainInEditMode = false
          }
          if (!this.remainInEditMode) {
            this.isEdited = false
          }
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: this.$t(event.result.errorMessage || 'Something went wrong ...'),
            action1: { label: this.$t('OK') }
          }, { root: true })
        }
      })
    },
    fillCompanyAddress () {
      if (this.useCompanyAddress) {
        const companyAddress = this.currentUser.addresses.find((address) => toString(address.id) === toString(this.currentUser.default_billing))
        if (companyAddress) {
          this.shippingDetails.firstName = companyAddress.firstname
          this.shippingDetails.lastName = companyAddress.lastname
          this.shippingDetails.street = companyAddress.street[0]
          this.shippingDetails.house = companyAddress.street[1]
          this.shippingDetails.city = companyAddress.city
          this.shippingDetails.postcode = companyAddress.postcode
          this.shippingDetails.region = companyAddress.region.region ? companyAddress.region.region : ''
          this.shippingDetails.country = companyAddress.country_id
        }
      } else {
        this.shippingDetails = this.getShippingDetails()
      }
    },
    readShippingDetailsFromCurrentUser (shippingDetails) {
      for (let address of this.currentUser.addresses) {
        if (toString(address.id) === toString(this.currentUser.default_shipping)) {
          return {
            firstName: address.firstname,
            lastName: address.lastname,
            street: address.street[0],
            house: address.street[1],
            city: address.city,
            postcode: address.postcode,
            region: address.region.region ? address.region.region : '',
            country: address.country_id,
            phone: address.hasOwnProperty('telephone') ? address.telephone : ''
          }
        }
      }
      return shippingDetails
    },
    getShippingDetails () {
      this.currentUser = Object.assign({}, this.$store.state.user.current)
      let shippingDetails = {
        firstName: '',
        lastName: '',
        street: '',
        house: '',
        city: '',
        postcode: '',
        region: '',
        country: '',
        phone: ''
      }
      if (this.currentUser) {
        if (this.currentUser && this.currentUser.hasOwnProperty('default_shipping')) {
          shippingDetails = this.readShippingDetailsFromCurrentUser(shippingDetails);
        } else {
          shippingDetails.firstName = this.currentUser.firstname
          shippingDetails.lastName = this.currentUser.lastname
        }
      }
      return shippingDetails;
    },
    getCountryName () {
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].code === this.shippingDetails.country) {
          return this.countries[i].name
        }
      }
      return ''
    },
    hasBillingAddress () {
      if (this.currentUser) {
        if (this.currentUser.hasOwnProperty('default_billing')) {
          return true
        }
      }
      return false
    }
  }
}
