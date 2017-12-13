<template>
  <div class="personal-details">
    <div class="row">
      <div class="col-md-1 col-xs-2">
        <div class="number-circle lh35 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">1</div>
      </div>
      <div class="col-md-11 col-xs-10">
        <div class="row">
          <div class="col-md-6" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="mt0">Personal Details</h3>
          </div>
          <div class="col-md-6 pr30">
            <div class="lh30 flex end-xs" v-if="isFilled && !isActive">
              <a href="#" class="c-lightgray-secondary pr5" @click.prevent="edit">Edit personal details</a>
              <i class="material-icons c-lightgray-secondary">edit</i>
            </div>
          </div>
        </div>
        <div class="row" v-show="isActive">
          <div class="col-md-6 mb25">
            <input type="text" name="first-name" placeholder="First name" v-model.trim="personalDetails.firstName" @input="$v.personalDetails.firstName.$touch()">
            <span class="validation-error" v-if="!$v.personalDetails.firstName.required">Field is required</span><span class="validation-error" v-if="!$v.personalDetails.firstName.minLength">Name must have at least {{$v.personalDetails.firstName.$params.minLength.min}} letters.</span>
          </div>
          <div class="col-md-6 mb25">
            <input type="text" name="last-name" placeholder="Last name" v-model.trim="personalDetails.lastName">
            <span class="validation-error" v-if="!$v.personalDetails.lastName.required">Field is required</span>
          </div>
          <div class="col-md-12 mb15">
            <input type="email" name="email-address" placeholder="Email address" v-model="personalDetails.emailAddress">
            <span class="validation-error" v-if="!$v.personalDetails.emailAddress.required">Field is required</span><span class="validation-error" v-if="!$v.personalDetails.emailAddress.email">Please provide valid e-mail address.</span>
          </div>
          <!-- <div class="col-md-12 mb25">
            <input type="checkbox" name="create-account" value="create-account" v-model="personalDetails.createAccount">
            <label>I want to create an account</label>
          </div>
          <div class="col-md-12 mb25" v-show="personalDetails.createAccount">
            <input type="password" name="password" placeholder="Password *" v-model="personalDetails.emailAddress">
          </div>
          <div class="col-md-12 mb25" v-show="personalDetails.createAccount">
            <input type="password" name="password-confirmation" placeholder="Repeat password *" v-model="personalDetails.emailAddress">
          </div> -->
          <div class="col-md-12 my30">
            <button-full @click.native="sendDataToCheckout" text="Continue to shipping" :class="{ 'ripple': true, 'button-disabled' : $v.personalDetails.$invalid}"/>
            <!-- <p>Or login to the existing account</p> -->
          </div>
        </div>
        <div class="row fs16 mb35" v-show="isFilled">
          <div class="col-xs-12 h4">
            <p>
              {{ personalDetails.firstName }} {{ personalDetails.lastName }}
            </p>
            <p>
              <span class="pr15">{{ personalDetails.emailAddress }}</span>
              <tooltip>We will send you details regarding the order</tooltip>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Tooltip from './Tooltip.vue'
import { required, minLength, email } from 'vuelidate/lib/validators'

// https://monterail.github.io/vuelidate/#sub-basic-usage

export default {
  props: ['isActive'],
  validations: {
    personalDetails: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required
      },
      emailAddress: {
        required,
        email
      }
    }
  },
  data () {
    return {
      isFilled: false,
      personalDetails: this.$store.state.checkout.personalDetails
    }
  },
  methods: {
    sendDataToCheckout () {
      this.$bus.$emit('checkout.personalDetails', this.personalDetails, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout.edit', 'personalDetails')
        this.isFilled = false
      }
    }
  },
  created () {
    console.log(this)
  },
  components: {
    ButtonFull,
    Tooltip
  },
  mixins: [coreComponent('core/blocks/Checkout/PersonalDetails')]
}
</script>
