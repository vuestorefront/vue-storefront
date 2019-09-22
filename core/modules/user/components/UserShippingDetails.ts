import toString from 'lodash-es/toString'
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
        if (this.currentUser.hasOwnProperty('default_shipping')) {
          let index
          for (let i = 0; i < this.currentUser.addresses.length; i++) {
            if (toString(this.currentUser.addresses[i].id) === toString(this.currentUser.default_shipping)) {
              index = i
            }
          }
          if (index >= 0) {
            updatedShippingDetails.addresses[index].firstname = this.shippingDetails.firstName
            updatedShippingDetails.addresses[index].lastname = this.shippingDetails.lastName
            updatedShippingDetails.addresses[index].street = [this.shippingDetails.street, this.shippingDetails.house]
            updatedShippingDetails.addresses[index].city = this.shippingDetails.city
            updatedShippingDetails.addresses[index].region = {
              region: this.shippingDetails.region ? this.shippingDetails.region : null
            }
            updatedShippingDetails.addresses[index].country_id = this.shippingDetails.country
            updatedShippingDetails.addresses[index].postcode = this.shippingDetails.postcode
            updatedShippingDetails.addresses[index].telephone = this.shippingDetails.phone ? this.shippingDetails.phone : ''
          } else {
            updatedShippingDetails = null
          }
        } else {
          updatedShippingDetails.addresses.push({
            firstname: this.shippingDetails.firstName,
            lastname: this.shippingDetails.lastName,
            street: [this.shippingDetails.street, this.shippingDetails.house],
            city: this.shippingDetails.city,
            ...(this.shippingDetails.region ? { region: { region: this.shippingDetails.region } } : {}),
            country_id: this.shippingDetails.country,
            postcode: this.shippingDetails.postcode,
            ...(this.shippingDetails.phone ? { telephone: this.shippingDetails.phone } : {}),
            default_shipping: true
          })
        }
      }
      this.exitSection(null, updatedShippingDetails)
    },
    exitSection (event, updatedShippingDetails) {
      this.$bus.$emit('myAccount-before-updateUser', updatedShippingDetails)
      if (!updatedShippingDetails) {
        this.shippingDetails = this.getShippingDetails()
        this.useCompanyAddress = false
        this.remainInEditMode = false
      }
      if (!this.remainInEditMode) {
        this.isEdited = false
      }
    },
    fillCompanyAddress () {
      this.useCompanyAddress = !this.useCompanyAddress
      if (this.useCompanyAddress) {
        let index
        for (let i = 0; i < this.currentUser.addresses.length; i++) {
          if (toString(this.currentUser.addresses[i].id) === toString(this.currentUser.default_billing)) {
            index = i
          }
        }
        if (index >= 0) {
          this.shippingDetails.firstName = this.currentUser.addresses[index].firstname
          this.shippingDetails.lastName = this.currentUser.addresses[index].lastname
          this.shippingDetails.street = this.currentUser.addresses[index].street[0]
          this.shippingDetails.house = this.currentUser.addresses[index].street[1]
          this.shippingDetails.city = this.currentUser.addresses[index].city
          this.shippingDetails.postcode = this.currentUser.addresses[index].postcode
          this.shippingDetails.region = this.currentUser.addresses[index].region.region ? this.currentUser.addresses[index].region.region : ''
          this.shippingDetails.country = this.currentUser.addresses[index].country_id
        }
      } else {
        this.shippingDetails = this.getShippingDetails()
      }
    },
    getShippingDetails () {
      this.currentUser = Object.assign({}, this.$store.state.user.current)
      if (this.currentUser) {
        if (this.currentUser && this.currentUser.hasOwnProperty('default_shipping')) {
          let index
          for (let i = 0; i < this.currentUser.addresses.length; i++) {
            if (toString(this.currentUser.addresses[i].id) === toString(this.currentUser.default_shipping)) {
              index = i
            }
          }
          if (index >= 0) {
            return {
              firstName: this.currentUser.addresses[index].firstname,
              lastName: this.currentUser.addresses[index].lastname,
              street: this.currentUser.addresses[index].street[0],
              house: this.currentUser.addresses[index].street[1],
              city: this.currentUser.addresses[index].city,
              postcode: this.currentUser.addresses[index].postcode,
              region: this.currentUser.addresses[index].region.region ? this.currentUser.addresses[index].region.region : '',
              country: this.currentUser.addresses[index].country_id,
              phone: this.currentUser.addresses[index].hasOwnProperty('telephone') ? this.currentUser.addresses[index].telephone : ''
            }
          }
        } else {
          return {
            firstName: this.currentUser.firstname,
            lastName: this.currentUser.lastname,
            street: '',
            house: '',
            city: '',
            postcode: '',
            region: '',
            country: '',
            phone: ''
          }
        }
      } else {
        return {
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
      }
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
