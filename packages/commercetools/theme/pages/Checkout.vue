<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="updateStep($event)">
          <SfStep name="Personal Details">
            <PersonalDetails
              :order="order"
              @update:order="updateOrder($event)"
            />
          </SfStep>
          <SfStep name="Shipping">
            <Shipping
              :order="order"
              :shipping-methods="shippingMethods"
              @update:order="updateOrder($event)"
              @click:back="currentStep--"
            />
          </SfStep>
          <SfStep name="Payment">
            <Payment
              :order="order"
              :payment-methods="paymentMethods"
              @update:order="updateOrder($event)"
              @click:back="currentStep--"
            />
          </SfStep>
          <SfStep name="Review">
            <ReviewOrder
              :order="order"
              :shipping-methods="shippingMethods"
              :payment-methods="paymentMethods"
              @click:back="currentStep--"
              @click:edit="currentStep = $event"
              @update:order="updateOrder($event, false)"
            />
          </SfStep>
        </SfSteps>
      </div>
      <div class="checkout__aside desktop-only">
        <transition name="fade">
          <OrderSummary
            v-if="currentStep <= 2"
            key="order-summary"
            :order="order"
            :shipping-methods="shippingMethods"
            :payment-methods="paymentMethods"
            @update:order="updateOrder($event, false)"
          />
          <OrderReview
            v-else
            key="order-review"
            :order="order"
            :shipping-methods="shippingMethods"
            :payment-methods="paymentMethods"
            @click:edit="currentStep = $event"
          />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps } from "@storefront-ui/vue";

import PersonalDetails from "~/components/checkout/PersonalDetails"
import Shipping from "~/components/checkout/Shipping"
import Payment from "~/components/checkout/Payment"
import ReviewOrder from "~/components/checkout/ReviewOrder"
import OrderSummary from "~/components/checkout/OrderSummary"
import OrderReview from "~/components/checkout/OrderReview"

export default {
  name: "Checkout",
  components: {
    SfSteps,
    PersonalDetails,
    Shipping,
    Payment,
    ReviewOrder,
    OrderSummary,
    OrderReview
  },
  data() {
    return {
      currentStep: 0,
      order: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        createAccount: false,
        shipping: {
          firstName: "",
          lastName: "",
          streetName: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phoneNumber: "",
          shippingMethod: ""
        },
        payment: {
          sameAsShipping: false,
          firstName: "",
          lastName: "",
          streetName: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phoneNumber: "",
          paymentMethod: "",
          card: {
            number: "",
            holder: "",
            month: "",
            year: "",
            cvc: "",
            keep: false
          }
        },
        review: {
          subtotal: "$150.00",
          shipping: "$9.00",
          total: "$159.00"
        },
        products: [
          {
            title: "Cream Beach Bag",
            image: "/assets/storybook/Home/productA.jpg",
            price: { regular: "$50.00" },
            configuration: [
              { name: "Size", value: "XS" },
              { name: "Color", value: "White" }
            ],
            qty: 1,
            sku: "MSD23-345-324"
          },
          {
            title: "Vila stripe maxi dress",
            image: "/assets/storybook/Home/productB.jpg",
            price: { regular: "$50.00", special: "$20.05" },
            configuration: [
              { name: "Size", value: "XS" },
              { name: "Color", value: "White" }
            ],
            qty: 2,
            sku: "MSD23-345-325"
          }
        ]
      },
      paymentMethods: [
        {
          label: "Visa Debit",
          value: "debit"
        },
        {
          label: "MasterCard",
          value: "mastercard"
        },
        {
          label: "Visa Electron",
          value: "electron"
        },
        {
          label: "Cash on delivery",
          value: "cash"
        },
        {
          label: "Check",
          value: "check"
        }
      ],
      shippingMethods: [
        {
          isOpen: false,
          price: "Free",
          delivery: "Delivery from 3 to 7 business days",
          label: "Pickup in the store",
          value: "store",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        },
        {
          isOpen: false,
          price: "$9.90",
          delivery: "Delivery from 4 to 6 business days",
          label: "Delivery to home",
          value: "home",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        },
        {
          isOpen: false,
          price: "$9.90",
          delivery: "Delivery from 4 to 6 business days",
          label: "Paczkomaty InPost",
          value: "inpost",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        },
        {
          isOpen: false,
          price: "$11.00",
          delivery: "Delivery within 48 hours",
          label: "48 hours coffee",
          value: "coffee",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        },
        {
          isOpen: false,
          price: "$14.00",
          delivery: "Delivery within 24 hours",
          label: "Urgent 24h",
          value: "urgent",
          description:
            "Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted."
        }
      ]
    };
  },
  methods: {
    updateStep(next) {
      // prevent to move next by SfStep header
      if (next < this.currentStep) {
        this.currentStep = next;
      }
    },
    updateOrder(order, next = true) {
      this.order = { ...this.order, ...order };
      if (next) {
        this.currentStep++;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";
@import "~@storefront-ui/shared/styles/helpers/visibility";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
#checkout {
  box-sizing: border-box;
  padding: 0 $spacer-big;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
    padding: $spacer-extra-big;
  }
}
.checkout {
  @include for-desktop {
    display: flex;
  }
  &__main {
    @include for-desktop {
      flex: 1;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin-left: 4.25rem;
    }
  }
}
</style>
