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
        <div class="mb25" v-show="addCompany">
          <div class="checkboxStyled">
            <input type="checkbox" v-model="addCompany" id="addCompanyFilled" disabled>
            <label for="addCompanyFilled"></label>
          </div>
          <div class="checkboxText ml15 lh25">
            <span class="fs16 c-darkgray">I have a company and want to receive an invoice for every order</span>
          </div>
        </div>
        <p class="mb25" v-show="addCompany">{{ userCompany.company }}</p>
        <p class="mb25" v-show="addCompany">
          {{ userCompany.street }}
          <span v-show="userCompany.house"> {{ userCompany.house }}</span>
        </p>
        <p class="mb25" v-show="addCompany">{{ userCompany.city }} {{ userCompany.postcode }}</p>
        <p class="mb25" v-show="addCompany">
          <span v-show="userCompany.region">{{ userCompany.region }}, </span>
          <span>{{ getCountryName() }}</span>
        </p>
        <p class="mb25" v-show="addCompany && userCompany.taxId">
          {{ userCompany.taxId }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  import { coreComponent } from 'lib/themes'
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
  import ButtonFull from 'theme/components/theme/ButtonFull.vue'

  export default {
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
        passType: {
          oldPass: 'password',
          pass: 'password',
          repeatPass: 'password'
        },
        iconName: {
          oldPass: 'visibility',
          pass: 'visibility',
          repeatPass: 'visibility'
        }
      }
    },
    methods: {
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
      },
      togglePassType (name) {
        if (this.passType[name] === 'password') {
          this.passType[name] = 'text'
          this.iconName[name] = 'visibility_off'
        } else {
          this.passType[name] = 'password'
          this.iconName[name] = 'visibility'
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