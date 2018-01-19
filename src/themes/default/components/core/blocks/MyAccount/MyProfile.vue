<template>
  <div class="my-profile mb35">
    <!-- My profile header -->
    <div class="row mb15">
      <div class="col-xs-12 col-md-6" :class="{ 'c-darkgray' : !isActive }">
        <h3 class="m0 mb5">My profile</h3>
      </div>
      <div class="col-xs-12 col-md-6 pr30">
        <div class="lh30 flex end-md" v-if="!isActive && editMode">
          <a href="#" class="c-lightgray-secondary flex" @click.prevent="edit">
            <span class="pr5">Edit your profile</span>
            <i class="material-icons c-lightgray-secondary">edit</i>
          </a>
        </div>
      </div>
    </div>
    <!-- My profile body (edit mode) -->
    <div class="row" v-show="isActive">
      <div class="col-xs-12 col-sm-12 col-md-6 mb25">
        <input type="text" name="first-name" placeholder="First name" v-model.trim="currentUser.firstname" @input="$v.currentUser.firstname.$touch()">
        <span class="validation-error" v-if="!$v.currentUser.firstname.required">Field is required</span><span class="validation-error" v-if="!$v.currentUser.firstname.minLength">Name must have at least {{$v.currentUser.firstname.$params.minLength.min}} letters.</span>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 mb25">
        <input type="text" name="last-name" placeholder="Last name" v-model.trim="currentUser.lastname">
        <span class="validation-error" v-if="!$v.currentUser.lastname.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 mb25">
        <input type="email" name="email-address" placeholder="Email address" v-model="currentUser.email">
        <span class="validation-error" v-if="!$v.currentUser.email.required">Field is required</span><span class="validation-error" v-if="!$v.currentUser.email.email">Please provide valid e-mail address.</span>
      </div>
      <div class="col-xs-12 col-md-12 mb15">
        <div class="checkboxStyled">
          <input type="checkbox" v-model="changePassword" id="changePassword">
          <label for="changePassword"></label>
        </div>
        <div class="checkboxText ml15 lh25" @click="changePassword = !changePassword">
          <span class="fs16 c-darkgray">Change my password</span>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 mb15 mt10" v-if="changePassword">
        <div class="pass-container">
          <input class="pr30" name="old-password" v-model="oldPassword" :type="passType.oldPass" placeholder="Current password *">
          <div class="icon">
            <i class="material-icons" @click="togglePassType('oldPass')">{{ iconName.oldPass }}</i>
          </div>
        </div>
        <span class="validation-error" v-if="!$v.oldPassword.required">Field is required.</span>
      </div>
      <div class="hidden-xs hidden-sm col-md-6 mb15 mt10" v-if="changePassword"></div>
      <div class="col-xs-12 col-sm-12 col-md-6 mb15 mt10" v-if="changePassword">
        <div class="pass-container">
          <input class="pr30" name="password" v-model="password" :type="passType.pass" placeholder="New password *">
          <div class="icon">
            <i class="material-icons" @click="togglePassType('pass')">{{ iconName.pass }}</i>
          </div>
        </div>
        <span class="validation-error" v-if="!$v.password.required">Field is required.</span>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 mb15 mt10" v-if="changePassword">
        <div class="pass-container">
          <input class="pr30" name="password-confirm" v-model="rPassword" :type="passType.repeatPass" placeholder="Repeat new password *">
          <i class="icon material-icons" @click="togglePassType('repeatPass')">{{ iconName.repeatPass }}</i>
        </div>
        <span class="validation-error" v-if="!$v.rPassword.sameAsPassword">Passwords must be identical.</span>
      </div>
      <!-- Company information -->
      <div class="col-xs-12 col-md-12 mb25 mt10">
        <div class="checkboxStyled">
          <input type="checkbox" v-model="addCompany" id="addCompany">
          <label for="addCompany"></label>
        </div>
        <div class="checkboxText ml15 lh25" @click="addCompany = !addCompany">
          <span class="fs16 c-darkgray">I have a company and want to receive an invoice for every order</span>
        </div>
      </div>

      <div class="col-xs-12 col-sm-12 mb25" v-show="addCompany">
        <input type="text" name="company-name" placeholder="Company name" v-model.trim="userCompany.company">
        <span class="validation-error" v-if="!$v.userCompany.company.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25" v-show="addCompany">
        <input type="text" name="street-address" placeholder="Street name" v-model.trim="userCompany.street">
        <span class="validation-error" v-if="!$v.userCompany.street.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25" v-show="addCompany">
        <input type="text" name="apartment-number" placeholder="House/Apartment number" v-model.trim="userCompany.house">
        <span class="validation-error" v-if="!$v.userCompany.house.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25" v-show="addCompany">
        <input type="text" name="city" placeholder="City" v-model.trim="userCompany.city">
        <span class="validation-error" v-if="!$v.userCompany.city.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25" v-show="addCompany">
        <input type="text" name="state" placeholder="State / Province" v-model.trim="userCompany.region">
      </div>
      <div class="col-xs-12 col-sm-6 mb25" v-show="addCompany">
        <input type="text" name="zip-code" placeholder="Zip-code" v-model.trim="userCompany.postcode">
        <span class="validation-error" v-if="!$v.userCompany.postcode.required">Field is required</span>
        <span class="validation-error" v-if="!$v.userCompany.postcode.minLength">Zip-code must have at least {{$v.userCompany.postcode.$params.minLength.min}} letters.</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25" v-show="addCompany">
        <select name="countries" v-model="userCompany.country">
          <option value="" disabled selected hidden>Country</option>
          <option v-for="country in countries" :value="country.code">{{ country.name }}</option>
        </select>
        <span class="validation-error" v-if="!$v.userCompany.country.required">Field is required</span>
      </div>
       <div class="col-xs-12 col-sm-6 mb25" v-show="addCompany">
        <input type="text" name="taxId" placeholder="Tax ID" v-model.trim="userCompany.taxId">
        <span class="validation-error" v-if="!$v.userCompany.taxId.required">Field is required</span>
        <span class="validation-error" v-if="!$v.userCompany.taxId.minLength">Tax ID must have at least {{$v.userCompany.taxId.$params.minLength.min}} letters.</span>
      </div>
      <div class="hidden-xs col-sm-6 mb25" v-show="addCompany"></div>

      <div class="col-xs-12 col-sm-6 bottom-button">
        <button-full text="Update my profile" @click.native="updateProfile" :class="{ 'button-disabled': checkValidation() }" />
      </div>
      <div class="col-xs-12 col-sm-6 pt15 bottom-button">
        <a href="#" @click="exitSection" class="link no-underline fs16 c-darkgray">Cancel</a>
      </div>
    </div>

    <!-- The look when it's not in edit mode -->
    <div class="row fs16 mb35" v-show="!isActive">
      <div class="col-xs-12 h4">
        <p>{{ currentUser.firstname }} {{ currentUser.lastname }}</p>
        <p>
          <span class="pr15">{{ currentUser.email }}</span>
        </p>
        <div v-show="addCompany">
          <div class="col-xs-12 col-md-12 mb25">
            <div class="checkboxStyled">
              <input type="checkbox" v-model="addCompany" id="addCompanyFilled" disabled>
              <label for="addCompanyFilled"></label>
            </div>
            <div class="checkboxText ml15 lh25">
              <span class="fs16 c-darkgray">I have a company and want to receive an invoice for every order</span>
            </div>
          </div>
          <p class="mb25">{{ userCompany.company }}</p>
          <p class="mb25">
            {{ userCompany.street }}
            <span v-show="userCompany.house"> {{ userCompany.house }}</span>
          </p>
          <p class="mb25">{{ userCompany.city }} {{ userCompany.postcode }}</p>
          <p class="mb25">
            <span v-show="userCompany.region">{{ userCompany.region }}, </span>
            <span>{{ getCountryName() }}</span>
          </p>
          <p class="mb25" v-show="userCompany.taxId">
            {{ userCompany.taxId }}
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { coreComponent } from 'lib/themes'
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
  import ButtonFull from 'theme/components/theme/ButtonFull.vue'
  import Countries from 'src/resource/countries.json'

  export default {
    props: ['isActive', 'editMode'],
    validations: {
      currentUser: {
        firstname: {
          required,
          minLength: minLength(3)
        },
        lastname: {
          required
        },
        email: {
          required,
          email
        }
      },
      oldPassword: {
        required
      },
      password: {
        required
      },
      rPassword: {
        required,
        sameAsPassword: sameAs('password')
      },
      userCompany: {
        company: {
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
        },
        taxId: {
          required,
          minLength: minLength(3)
        }
      }
    },
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
          taxId: ''
        },
        countries: Countries,
        changePassword: false,
        oldPassword: '',
        password: '',
        rPassword: '',
        passType: {
          oldPass: 'password',
          pass: 'password',
          repeatPass: 'password'
        },
        iconName: {
          oldPass: 'visibility',
          pass: 'visibility',
          repeatPass: 'visibility'
        },
        addCompany: false
      }
    },
    mounted () {
      this.userCompany = this.getUserCompany()
      if (this.userCompany.company) {
        this.addCompany = true
      }
    },
    methods: {
      edit () {
        this.$bus.$emit('myAccount.activateSection', 'profile')
      },
      togglePassType (name) {
        if (this.passType[name] === 'password') {
          this.passType[name] = 'text'
          this.iconName[name] = 'visibility_off'
        } else {
          this.passType[name] = 'password'
          this.iconName[name] = 'visibility'
        }
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
      updateProfile () {
        let updatedProfile
        if (!this.objectsEqual(this.currentUser, this.$store.state.user.current) ||
          !this.objectsEqual(this.userCompany, this.getUserCompany()) ||
          (this.userCompany.company && !this.addCompany)
        ) {
          updatedProfile = this.$store.state.user.current
          if (updatedProfile.hasOwnProperty('default_billing')) {
            let index
            for (let i = 0; i < updatedProfile.addresses.length; i++) {
              if (updatedProfile.addresses[i].id === Number(updatedProfile.default_billing)) {
                index = i
              }
            }
            if (index >= 0) {
              if (this.addCompany) {
                updatedProfile.addresses[index].firstname = this.currentUser.firstname
                updatedProfile.addresses[index].lastname = this.currentUser.lastname
                updatedProfile.addresses[index].company = this.userCompany.company
                updatedProfile.addresses[index].street = [this.userCompany.street, this.userCompany.house]
                updatedProfile.addresses[index].city = this.userCompany.city
                updatedProfile.addresses[index].region = {
                  region: this.userCompany.region ? this.userCompany.region : null
                }
                updatedProfile.addresses[index].country_id = this.userCompany.country
                updatedProfile.addresses[index].postcode = this.userCompany.postcode
                updatedProfile.addresses[index].vat_id = this.userCompany.taxId
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
                  taxId: ''
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
              default_billing: true
            })
          }
        }
        if (this.password) {
          this.$bus.$emit('myAccount.changePassword', {
            currentPassword: this.oldPassword,
            newPassword: this.password
          })
        }
        this.exitSection(null, updatedProfile)
      },
      exitSection (event, updatedProfile) {
        this.$bus.$emit('myAccount.updateUser', updatedProfile)
        if (!updatedProfile) {
          this.currentUser = this.$store.state.user.current
          this.userCompany = this.getUserCompany()
          this.changePassword = false
          this.oldPassword = ''
          this.password = ''
          this.rPassword = ''
          if (!this.userCompany.company) {
            this.addCompany = false
          }
        }
      },
      getUserCompany () {
        if (this.currentUser.hasOwnProperty('default_billing')) {
          let index
          for (let i = 0; i < this.currentUser.addresses.length; i++) {
            if (this.currentUser.addresses[i].id === Number(this.currentUser.default_billing)) {
              index = i
            }
          }
          if (index >= 0) {
            return {
              company: this.currentUser.addresses[index].company,
              street: this.currentUser.addresses[index].street[0],
              house: this.currentUser.addresses[index].street[1],
              city: this.currentUser.addresses[index].city,
              region: this.currentUser.addresses[index].region.region ? this.currentUser.addresses[index].region.region : '',
              country: this.currentUser.addresses[index].country_id,
              postcode: this.currentUser.addresses[index].postcode,
              taxId: this.currentUser.addresses[index].vat_id
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
            taxId: ''
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
      },
      checkValidation () {
        if (this.changePassword && this.addCompany) {
          return this.$v.$invalid
        } else if (this.changePassword && !this.addCompany) {
          return this.$v.currentUser.$invalid || this.$v.password.$invalid || this.$v.rPassword.$invalid
        } else if (!this.changePassword && this.addCompany) {
          return this.$v.currentUser.$invalid || this.$v.userCompany.$invalid
        } else {
          return this.$v.currentUser.$invalid
        }
      }
    },
    components: {
      ButtonFull
    },
    mixins: [coreComponent('core/blocks/MyAccount/MyProfile')]
  }
</script>

<style lang="scss" scoped>

  .pass-container {
    position: relative;
    margin-right: 35px;

    input[type=password], input[type=text] {
      box-sizing: border-box;
      font-size: 18px;
      padding-top: 10px;
      padding-bottom: 10px;
      width: 100% !important;
      border: 0;
      border-bottom: 1px solid #BDBDBD;

      &:focus {
        outline: none;
        border-color: black;
        transition: 0.3s all;
      }
    }

    .icon {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 10px;
      color: #BDBDBD;

      &:hover {
        color: #8E8E8E;
      }
    }
  }

  .button-container {
    @media (max-width: 1200px) {
      margin-bottom: 10px;
      margin-top: 15px;
    }
  }

</style>