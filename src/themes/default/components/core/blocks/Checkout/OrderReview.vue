<template>
  <div class='order-review'>
    <div class="row">
      <div class="col-xs-2 col-md-1">
        <div class="number-circle lh35 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">4</div>
      </div>
      <div class="col-xs-9 col-md-11">
        <div class="row">
          <div class="col-md-12" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="m0">Review order</h3>
          </div>
        </div>
        <div class="row mb35 mt20" v-show="isActive">
          <div class="col-xs-12">
            <p class="h4">Please check if all data are correct</p>
            <div class="row">
              <div class="col-md-8  bg-lightgray p15 mb35 ml10">
                <div class="checkboxStyled">
                  <input type="checkbox" v-model="orderReview.terms" id="acceptTermsCheckbox">
                  <label for="acceptTermsCheckbox"></label>
                </div>
                <div class="checkboxText ml15 lh25">
                  <span class="fs16 c-darkgray">I agree to <span class="link" @click.stop="$bus.$emit('modal.toggle', 'modal-terms')">terms and conditions</span></span>
                </div>
                <span class="validation-error" v-if="!$v.orderReview.terms.required">Field is required</span>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <button-full text="Place the order" @click.native="placeOrder"  :class="{ 'ripple': true, 'button-disabled' : $v.orderReview.$invalid}"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="modal-terms" static="terms">
      <p slot="header">Terms and conditions</p>
    </modal>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import ValidationError from 'theme/components/core/ValidationError.vue'
import Modal from 'theme/components/core/Modal.vue'
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['isActive'],
  validations: {
    orderReview: {
      terms: {
        required
      }
    }
  },
  data () {
    return {
      isFilled: false,
      orderReview: {
        terms: ''
      }
    }
  },
  methods: {
    placeOrder () {
      if (this.$store.state.checkout.personalDetails.createAccount) {
        this.register()
      } else {
        this.$bus.$emit('checkout.placeOrder')
      }
    },
    register () {
      this.$bus.$emit('notification-progress-start', 'Registering the account ... ')
      this.$store.dispatch('user/register', {
        email: this.$store.state.checkout.personalDetails.emailAddress,
        password: this.$store.state.checkout.personalDetails.password,
        firstname: this.$store.state.checkout.personalDetails.firstName,
        lastname: this.$store.state.checkout.personalDetails.lastName
      }).then((result) => {
        console.log(result)
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: result.result,
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          this.$bus.$emit('notification', {
            type: 'success',
            message: 'You are logged in!',
            action1: { label: 'OK', action: 'close' }
          })
          this.$store.commit('ui/setSignUp', false)
          this.$bus.$emit('checkout.placeOrder')
        }
      }).catch(err => {
        this.$bus.$emit('notification-progress-stop')
        console.error(err)
      })
    }
  },
  components: {
    ButtonFull,
    ValidationError,
    Modal
  },
  mixins: [coreComponent('core/blocks/Checkout/OrderReview')]
}
</script>

<style lang="scss" scoped>

  .link {
    cursor: pointer;
    text-decoration: underline;
  }

  .checkboxStyled {
    width: 23px;
    position: relative;
    display: inline-block;

    label {
      cursor: pointer;
      position: absolute;
      width: 23px;
      height: 23px;
      top: 0;
      left: 0;
      background: #F2F2F2;
      border:1px solid #8E8E8E;

      &:after {
        content: '';
        position: absolute;
        width: 11px;
        height: 5px;
        background: transparent;
        top: 6px;
        left: 5px;
        border: 3px solid #F2F2F2;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
    }

    input[type=checkbox]:checked + label {
      background: #8E8E8E;
    }
  }

  .checkboxText {
    display: inline-block;
    cursor: pointer;
    
    span {
      vertical-align: middle;
    }
  }
</style>
