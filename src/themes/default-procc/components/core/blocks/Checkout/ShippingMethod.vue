<template>
  <modal name="modal-shipping-method" class="modal-shipping-method" :width="640">
    <p slot="header" class="p15 modal-header h4 serif weight-700 bg-cl-secondary m0">
      {{ $t('Shipping Methods') }}
    </p>
    <div slot="content">
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
          <tr>
            <th></th>
            <th>
              {{ $t('Est. Delivery') }}
            </th>
            <th>
              {{ $t('Cost') }}
            </th>
            <th>
              {{ $t('tracking') }}
            </th>
            <th>
              {{ $t('Carrier') }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="brdr-top-1 brdr-cl-bg-secondary" v-for="method in getShippingMethods(storeBrandId)">
            <td class="fs-medium lh25" :data-th="$t('Product Name')">
              <div>
                <label class="radioStyled">
                  <input
                    type="radio"
                    :value="method._id"
                    name="shipping-method"
                    v-model="shipping.shippingMethod"
                    @change="$v.shipping.shippingMethod.$touch(); changeShippingMethod(storeBrandId);"
                  >
                  <span class="checkmark" />
                </label>
              </div>
            </td>
            <td class="fs-medium lh25" :data-th="$t('Estimated Delivery')">
              {{$t('Estimated Delivery Time:')}} {{method.estimated_delivery_period}} {{$t('Days')}}
            </td>
            <td class="fs-medium lh25 align-right" :data-th="$t('Cost')">
              {{method.cost}}
            </td>
            <td class="fs-medium lh25" :data-th="$t('tracking')">
              <i class="material-icons">
                check
              </i>
            </td>
            <td class="fs-medium lh25" :data-th="$t('Carrier')">
              {{method.name}}
            </td>
          </tr>
          </tbody>
        </table>
      <span class="validation-error" v-if="$v.shipping.shippingMethod.$error && !$v.shipping.shippingMethod.required">
            {{ $t('please select shipping method') }}
      </span>
      </div>
      <div class="row between-xs middle-xs mt40">
        <div class="col-xs-12">
          <button-full @click.native="saveShippingMethod"
                       :disabled="$v.shipping.$invalid || shippingMethods.length <= 0"
          >
            {{ $t('Apply') }}
          </button-full>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  import Modal from 'theme/components/core/Modal'
  import ButtonFull from 'theme/components/theme/ButtonFull.vue'
  import { required, minLength } from 'vuelidate/lib/validators'
  import { Shipping } from '@vue-storefront/core/modules/checkout/components/Shipping'

  export default {
    props: {
      storeBrandId: {
        required: true,
        type: String,
        default: () => []
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$bus.$emit('modal-show', 'modal-shipping-method')
      })
    },
    methods: {
      saveShippingMethod () {
        this.$bus.$emit('modal-hide', 'modal-shipping-method')
      }
    },
    components: {
      Modal,
      ButtonFull
    },
    mixins: [ Shipping ],
    validations: {
      shipping: {
        shippingMethod: {
          required
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-white-smoke: color(white-smoke);

  .modal {
    font-size: 18px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    border: 0;

    @media (max-width: 767px) {
      border-top: none;
    }

    th, td {
      text-align: left;
      padding: 20px;

      &.align-right {
        text-align: right;

        @media (max-width: 767px) {
          text-align: left;
        }

      }

      @media (max-width: 1199px) {
        padding: 10px;
      }

    }

    thead {
      @media (max-width: 767px) {
        display: none;
      }
    }

    tbody {

      tr {
        @media (max-width: 767px) {
          display: block
        }

        &:nth-child(even) {
          td {
            background-color: $color-white-smoke;
          }
        }

      }

      td {
        vertical-align: top;

        @media (max-width: 767px) {
          display: block;
          text-align: left;
          padding: 10px 20px;
          &:before {
            content: attr(data-th) ': ';
            font-weight: 700;
          }
        }

        &:first-child {
          @media (max-width: 767px) {
            padding: 20px 20px 10px 20px;
          }
        }

        &:last-child {
          @media (max-width: 767px) {
            padding: 10px 20px 20px 20px;
          }
        }
      }

    }

    tfoot {

      tr {
        @media (max-width: 767px) {
          display: block
        }

        &:last-child {
          td:last-child {
            padding-bottom: 20px
          }
        }

      }

      td {
        @media (max-width: 767px) {
          display: block
        }

        &:first-child {
          @media (max-width: 767px) {
            font-weight: 700;
            padding: 20px 20px 5px 20px;
          }
        }

        &:last-child {
          @media (max-width: 767px) {
            padding: 5px 20px 0 20px;
          }
        }

      }

    }

    i {
      vertical-align: middle;
    }

  }

  .cancel-order {
    text-align: center;
    margin-bottom: 30px;

    @media only screen and (min-width: 576px) {
      text-align: left;
      margin-bottom: 0;
    }
  }
</style>
<style  lang="scss">

  .modal.modal-shipping-method {
    header.modal-header {
      padding: 0 10px;
    }
    .modal-container {
      max-width: 90%;
      min-width: 812px;
      border-radius: 8px;
      overflow: hidden;
      @media (max-width: 991px) {
        min-width: 90%;
        width: auto !important;
        max-width: calc(100% - 30px);
        margin: 0 auto;
        height: auto;
        max-height: 90vh;
        overflow-y: auto;
        min-height: 1px;
      }
      .row {
        margin: 0;
        padding: 10px 5px;
      }
      .modal-content {
        padding: 16px 30px 26px;
        line-height: 21px;
        @media (max-width: 991px) {
          padding: 10px;
        }
        table {
          tr {
            @media (max-width: 767px) {
              position: relative;
              &:first-child {
                border: 0
              }
            }
          }
          th {
            font-weight: normal;
            text-align: left;
            height: 100%;
            border-bottom: 1px solid #f2f2f2;
            vertical-align: middle;
            font-size: 14px;
            color: #999;
            padding: 14px 5px 16px;
          }
          td {
            font-size: 14px;
            font-weight: 600;
            color: #000;
            text-align: left;
            padding: 8px 8px 8px 0;
            line-height: 21px;
            &:first-child {
              padding-left: 0;
              padding-right: 0;
            }
            @media (max-width: 767px) {
              &:before {
                display: none;
              }
              width: calc(100% - 50px);
              float: right;
              padding-left:50px;
              &:first-child {
                width: 30px;
                float:left;
                padding:0;
                position: absolute;
                top: 7px;
                left: 0
              }
            }
          }
        }
        span.validation-error {
          font-size: 14px;
          color: red;
        }
      }
      button {
        min-width: 1px;
        width: auto;
        line-height: normal;
        padding: 10px 20px;
        margin:  0 auto;
      }
    }
  }
  #checkout {
    .modal.modal-shipping-method {
      .radioStyled {
        margin: 0 !important;
        float: right;
        @media (max-width: 991px) {
          padding: 10px !important;
        }
        input {
          display: none;
          &:checked + span.checkmark:after {
            content: '';
            display: block;
            height: 8px;
            width: 8px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
          }
          &:checked + span.checkmark {
            background: #000;
          }
        }
        span.checkmark {
          height: 20px;
          width: 20px;
          right: 0;
        }
      }
    }
  }
</style>
