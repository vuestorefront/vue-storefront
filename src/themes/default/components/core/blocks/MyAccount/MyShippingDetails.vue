<template>
  <div class="my-shipping-details mb35">
    <!-- My shipping details header -->
    <div class="row mb15">
      <div class="col-xs-12 col-md-6" :class="{ 'c-darkgray' : !isActive }">
        <h3 class="m0 mb5">My shipping details</h3>
      </div>
      <div class="col-xs-12 col-md-6 pr30">
        <div class="lh30 flex end-md" v-if="!isActive && editMode">
          <a href="#" class="c-lightgray-secondary flex" @click.prevent="edit">
            <span class="pr5">Edit your shipping details</span>
            <i class="material-icons c-lightgray-secondary">edit</i>
          </a>
        </div>
      </div>
    </div>
    <!-- My shipping details body (edit mode) -->
    <div class="row" v-show="isActive">
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="first-name" placeholder="First name" v-model.trim="shippingDetails.firstName">
        <span class="validation-error" v-if="!$v.shippingDetails.firstName.required">Field is required</span>
        <span class="validation-error" v-if="!$v.shippingDetails.firstName.minLength">Name must have at least {{$v.shippingDetails.firstName.$params.minLength.min}} letters.</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="last-name" placeholder="Last name" v-model.trim="shippingDetails.lastName">
        <span class="validation-error" v-if="!$v.shippingDetails.lastName.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-md-12 mb25" v-if="currentUser.hasOwnProperty('default_billing')">
        <div class="checkboxStyled">
          <input type="checkbox" v-model="useCompanyAddress" id="useCompanyAddress" @click="fillCompanyAddress">
          <label for="useCompanyAddress"></label>
        </div>
        <div class="checkboxText ml15 lh25" @click="fillCompanyAddress">
          <span class="fs16 c-darkgray">Use my company's address details</span>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="street-address" placeholder="Street name" v-model.trim="shippingDetails.street" :disabled="useCompanyAddress">
        <span class="validation-error" v-if="!$v.shippingDetails.street.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="apartment-number" placeholder="House/Apartment number" v-model.trim="shippingDetails.house" :disabled="useCompanyAddress">
        <span class="validation-error" v-if="!$v.shippingDetails.house.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="city" placeholder="City" v-model.trim="shippingDetails.city" :disabled="useCompanyAddress">
        <span class="validation-error" v-if="!$v.shippingDetails.city.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="state" placeholder="State / Province" v-model.trim="shippingDetails.region" :disabled="useCompanyAddress">
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="zip-code" placeholder="Zip-code" v-model.trim="shippingDetails.postcode" :disabled="useCompanyAddress">
        <span class="validation-error" v-if="!$v.shippingDetails.postcode.required">Field is required</span>
        <span class="validation-error" v-if="!$v.shippingDetails.postcode.minLength">Zip-code must have at least {{$v.shippingDetails.postcode.$params.minLength.min}} letters.</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <select name="countries" v-model="shippingDetails.country" :disabled="useCompanyAddress">
          <option value="" disabled selected hidden>Country</option>
          <option v-for="country in countries" :value="country.code">{{ country.name }}</option>
        </select>
        <span class="validation-error" v-if="!$v.shippingDetails.country.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="phone-number" placeholder="Phone Number" v-model.trim="shippingDetails.phone">
      </div>
      <div class="hidden-xs col-sm-6 mb25"></div>
      <div class="col-xs-12 col-sm-6">
        <button-full text="Update my shipping details" @click.native="updateDetails" :class="{ 'button-disabled': $v.$invalid }" />
      </div>
      <div class="col-xs-12 col-sm-6 pt15">
        <a href="#" @click="exitSection" class="link no-underline fs16 c-darkgray">Cancel</a>
      </div>
    </div>

    <!-- The look when it's not in edit mode -->
    <div class="row fs16 mb35" v-if="!isActive">
      <div class="col-xs-12 h4">
        <p>{{ shippingDetails.firstName }} {{ shippingDetails.lastName }}</p>
        <div class="col-xs-12 col-md-12 mb25" v-if="useCompanyAddress">
          <div class="checkboxStyled">
            <input type="checkbox" v-model="useCompanyAddress" id="useCompanyAddressFilled" disabled>
            <label for="useCompanyAddressFilled"></label>
          </div>
          <div class="checkboxText ml15 lh25">
            <span class="fs16 c-darkgray">Use my company's address details</span>
          </div>
        </div>
        <p class="mb25">{{ shippingDetails.company }}</p>
        <p class="mb25">
          {{ shippingDetails.street }}
          <span v-show="shippingDetails.house"> {{ shippingDetails.house }}</span>
        </p>
        <p class="mb25">{{ shippingDetails.city }} {{ shippingDetails.postcode }}</p>
        <p class="mb25">
          <span v-show="shippingDetails.region">{{ shippingDetails.region }}, </span>
          <span>{{ getCountryName() }}</span>
        </p>
        <p>
          <span class="pr15">{{ shippingDetails.phone }}</span>
          <tooltip v-show="shippingDetails.phone">Phone number may be needed by carrier</tooltip>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { coreComponent } from 'lib/themes'
  import { required, minLength } from 'vuelidate/lib/validators'
  
  import ButtonFull from 'theme/components/theme/ButtonFull.vue'
  import Tooltip from 'theme/components/core/Tooltip.vue'
  import Countries from 'src/resource/countries.json'

  export default {
    props: ['isActive', 'editMode'],
    validations: {
      shippingDetails: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required
        },
        country: {
          required
        },
        street: {
          required
        },
        house: {
          required
        },
        postcode: {
          required,
          minLength: minLength(5)
        },
        city: {
          required
        }
      }
    },
    data () {
      return {
        currentUser: this.$store.state.user.current,
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
        useCompanyAddress: false
      }
    },
    mounted () {
      this.shippingDetails = this.getShippingDetails()
    },
    methods: {
      edit () {
        this.$bus.$emit('myAccount.activateSection', 'shipping')
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
          updatedShippingDetails = this.currentUser
          if (this.currentUser.hasOwnProperty('default_shipping')) {
            let index
            for (let i = 0; i < this.currentUser.addresses.length; i++) {
              if (this.currentUser.addresses[i].id === Number(this.currentUser.default_shipping)) {
                index = i
              }
            }
            if (index >= 0) {
              updatedShippingDetails.addresses[index].firstname = this.shippingDetails.firstName
              updatedShippingDetails.addresses[index].lastname = this.shippingDetails.lastName
              updatedShippingDetails.addresses[index].street = [this.shippingDetails.street, this.shippingDetails.house]
              updatedShippingDetails.addresses[index].city = this.shippingDetails.city
              if (this.shippingDetails.region) {
                updatedShippingDetails.addresses[index].region = {
                  region: this.shippingDetails.region
                }
              }
              updatedShippingDetails.addresses[index].country_id = this.shippingDetails.country
              updatedShippingDetails.addresses[index].postcode = this.shippingDetails.postcode
              if (this.shippingDetails.phone) {
                updatedShippingDetails.addresses[index].telephone = this.shippingDetails.phone
              }
              updatedShippingDetails.addresses[index].default_shipping = true
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
        this.$bus.$emit('myAccount.updateUser', updatedShippingDetails)
        if (!updatedShippingDetails) {
          this.shippingDetails = this.getShippingDetails()
          this.useCompanyAddress = false
        }
      },
      fillCompanyAddress () {
        this.useCompanyAddress = !this.useCompanyAddress
        if (this.useCompanyAddress) {
          let index
          for (let i = 0; i < this.currentUser.addresses.length; i++) {
            if (this.currentUser.addresses[i].id === Number(this.currentUser.default_billing)) {
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
          this.shippingDetails.firstName = this.currentUser.firstname
          this.shippingDetails.lastName = this.currentUser.lastname
          this.shippingDetails.street = ''
          this.shippingDetails.house = ''
          this.shippingDetails.city = ''
          this.shippingDetails.postcode = ''
          this.shippingDetails.region = ''
          this.shippingDetails.country = ''
        }
      },
      getShippingDetails () {
        if (this.currentUser.hasOwnProperty('default_shipping')) {
          let index
          for (let i = 0; i < this.currentUser.addresses.length; i++) {
            if (this.currentUser.addresses[i].id === Number(this.currentUser.default_shipping)) {
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
      },
      getCountryName () {
        for (let i = 0; i < this.countries.length; i++) {
          if (this.countries[i].code === this.shippingDetails.country) {
            return this.countries[i].name
          }
        }
        return ''
      }
    },
    components: {
      ButtonFull,
      Tooltip
    },
    mixins: [coreComponent('core/blocks/MyAccount/MyShippingDetails')]
  }
</script>

<style lang="scss" scoped>

  .link {
    text-decoration: underline;
  }

</style>