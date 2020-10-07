import toString from 'lodash-es/toString'
import pick from 'lodash-es/pick'
import config from 'config'
import { userHooks } from '@vue-storefront/core/modules/user/hooks'
const Countries = require('@vue-storefront/core/i18n/resource/countries.json')

export const UserAccount = {
  name: 'UserAccount',
  data () {
    return {
      currentUser: Object.assign({}, this.$store.state.user.current),
      userCompany: {
        company: '',
        street: '',
        house: '',
        city: '',
        region: '',
        country: '',
        postcode: '',
        taxId: '',
        phone: ''
      },
      countries: Countries,
      changePassword: false,
      oldPassword: '',
      password: '',
      rPassword: '',
      addCompany: false,
      isEdited: false,
      remainInEditMode: false
    }
  },
  beforeMount () {
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
    this.$bus.$on('myAccount-before-remainInEditMode', block => {
      if (block === 'MyProfile') {
        this.remainInEditMode = true
      }
    })
  },
  beforeDestroy () {
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
    this.$bus.$off('myAccount-before-remainInEditMode')
  },
  mounted () {
    this.userCompany = this.getUserCompany()
    if (this.userCompany.company) {
      this.addCompany = true
    }
  },
  methods: {
    onLoggedIn () {
      this.currentUser = Object.assign({}, this.$store.state.user.current)
      this.userCompany = this.getUserCompany()
      if (this.userCompany.company) {
        this.addCompany = true
      }
    },
    edit () {
      this.isEdited = true
    },
    objectsEqual (a, b, excludedFields = []) {
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
          } else if (!excludedFields.includes(propName) && a[propName] !== b[propName]) {
            return false
          }
        }
      }
      return true
    },
    updateProfile () {
      let updatedProfile
      if (!this.objectsEqual(this.currentUser, this.$store.state.user.current, ['updated_at', 'addresses']) ||
        !this.objectsEqual(this.userCompany, this.getUserCompany()) ||
        (this.userCompany.company && !this.addCompany)
      ) {
        updatedProfile = JSON.parse(JSON.stringify(this.$store.state.user.current))
        updatedProfile.firstname = this.currentUser.firstname
        updatedProfile.lastname = this.currentUser.lastname
        updatedProfile.email = this.currentUser.email
        if (updatedProfile.hasOwnProperty('default_billing')) {
          let index
          for (let i = 0; i < updatedProfile.addresses.length; i++) {
            if (toString(updatedProfile.addresses[i].id) === toString(updatedProfile.default_billing)) {
              index = i
            }
          }
          if (index >= 0) {
            if (this.addCompany) {
              updatedProfile.addresses[index].firstname = this.currentUser.firstname || ''
              updatedProfile.addresses[index].lastname = this.currentUser.lastname || ''
              updatedProfile.addresses[index].company = this.userCompany.company || ''
              updatedProfile.addresses[index].street = [this.userCompany.street, this.userCompany.house] || ['', '']
              updatedProfile.addresses[index].city = this.userCompany.city || ''
              updatedProfile.addresses[index].region = {
                region: this.userCompany.region ? this.userCompany.region : null
              }
              updatedProfile.addresses[index].country_id = this.userCompany.country || ''
              updatedProfile.addresses[index].postcode = this.userCompany.postcode || ''
              updatedProfile.addresses[index].vat_id = this.userCompany.taxId || ''
              updatedProfile.addresses[index].telephone = this.userCompany.phone || ''
            } else {
              updatedProfile.addresses.splice(index, 1)
              this.userCompany = {
                company: '',
                street: '',
                house: '',
                city: '',
                region: '',
                country: '',
                postcode: '',
                taxId: '',
                phone: ''
              }
            }
          }
        } else if (this.addCompany) {
          updatedProfile.addresses.push({
            firstname: this.currentUser.firstname,
            lastname: this.currentUser.lastname,
            company: this.userCompany.company,
            street: [this.userCompany.street, this.userCompany.house],
            city: this.userCompany.city,
            ...(this.userCompany.region ? { region: { region: this.userCompany.region } } : {}),
            country_id: this.userCompany.country,
            postcode: this.userCompany.postcode,
            vat_id: this.userCompany.taxId,
            telephone: this.userCompany.phone,
            default_billing: true
          })
        }
      }
      if (this.password) {
        this.$bus.$emit('myAccount-before-changePassword', {
          currentPassword: this.oldPassword,
          newPassword: this.password
        })
      }
      updatedProfile = pick(updatedProfile, config.users.allowModification)
      this.exitSection(null, updatedProfile)
    },
    exitSection (event, updatedProfile) {
      this.$bus.$emit('myAccount-before-updateUser', updatedProfile)
      userHooks.afterUserProfileUpdated(event => {
        if (event.resultCode === 200) {
          if (!updatedProfile) {
            this.currentUser = Object.assign({}, this.$store.state.user.current)
            this.userCompany = this.getUserCompany()
            this.changePassword = false
            this.oldPassword = ''
            this.password = ''
            this.rPassword = ''
            if (!this.userCompany.company) {
              this.addCompany = false
            }
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
    getUserCompany () {
      let user = this.$store.state.user.current
      if (user && user.hasOwnProperty('default_billing')) {
        let index
        for (let i = 0; i < this.currentUser.addresses.length; i++) {
          if (toString(user.addresses[i].id) === toString(user.default_billing)) {
            index = i
          }
        }
        if (index >= 0) {
          return {
            company: user.addresses[index].company || '',
            street: user.addresses[index].street[0] || '',
            house: user.addresses[index].street[1] || '',
            city: user.addresses[index].city || '',
            region: user.addresses[index].region.region ? user.addresses[index].region.region : '',
            country: user.addresses[index].country_id || '',
            postcode: user.addresses[index].postcode || '',
            taxId: user.addresses[index].vat_id || '',
            phone: user.addresses[index].telephone || ''
          }
        }
      } else {
        return {
          company: '',
          street: '',
          house: '',
          city: '',
          region: '',
          country: '',
          postcode: '',
          taxId: '',
          phone: ''
        }
      }
    },
    getCountryName () {
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].code === this.userCompany.country) {
          return this.countries[i].name
        }
      }
      return ''
    }
  }
}
