<template>
  <div>
    <SfHeading
      title="1. Personal details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        v-model="firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="email"
        label="Your email"
        name="email"
        class="form__element"
        required
      />
      <div class="form__element form__group">
        <SfCheckbox
          v-model="createAccount"
          name="createAccount"
          label="I want to create an account"
          class="form__checkbox"
        />
        <SfButton class="sf-button--text info" @click="accountBenefits = true"
          >+info</SfButton
        >
      </div>
      <transition name="fade">
        <SfInput
          v-if="createAccount"
          v-model="password"
          type="password"
          label="Create Password"
          class="form__element"
          required
        />
      </transition>
      <div class="form__action">
        <SfButton
          class="sf-button--full-width form__action-button"
          @click="toShipping"
          >Continue to shipping</SfButton
        >
        <SfButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary"
          >or log in to your account</SfButton
        >
      </div>
    </div>
    <SfModal
      :visible="accountBenefits"
      class="modal"
      @close="accountBenefits = false"
    >
      <SfHeading
        title="Account Benefits"
        subtitle="Enjoy these perks with your free account!"
        class="sf-heading--left sf-heading--no-underline modal__heading"
      />
      <SfCharacteristic
        v-for="(characteristic, key) in characteristics"
        :key="key"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
      <SfButton
        class="sf-button--full-width color-secondary modal__button"
        @click="accountBenefits = false"
        >Ok</SfButton
      >
    </SfModal>
  </div>
</template>
<script>
import {
  SfInput,
  SfCheckbox,
  SfButton,
  SfHeading,
  SfModal,
  SfCharacteristic
} from "@storefront-ui/vue";
export default {
  name: "PersonalDetails",
  components: {
    SfInput,
    SfCheckbox,
    SfButton,
    SfHeading,
    SfModal,
    SfCharacteristic
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      createAccount: false,
      accountBenefits: false,
      characteristics: [
        { description: "Faster checkout", icon: "clock" },
        { description: "Full rewards program benefits", icon: "rewards" },
        { description: "Earn credits with every purchase", icon: "credits" },
        { description: "Manage your wishliste", icon: "heart" }
      ]
    };
  },
  watch: {
    order: {
      handler(value) {
        this.firstName = value.firstName;
        this.lastName = value.lastName;
        this.email = value.email;
      },
      immediate: true
    },
    createAccount(value) {
      if (!value) this.password = "";
    }
  },
  methods: {
    toShipping() {
      const order = { ...this.order };
      order.firstName = this.firstName;
      order.lastName = this.lastName;
      order.email = this.email;
      order.password = this.password;
      order.createAccount = this.createAccount;
      this.$emit("update:order", order);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.title {
  margin-bottom: $spacer-extra-big;
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin-bottom: $spacer-extra-big;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: $spacer-extra-big;
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    flex: 1;
    &--secondary {
      margin: $spacer-big 0;
      @include for-desktop {
        margin: 0;
        text-align: right;
      }
    }
  }
}
.info {
  margin-left: $spacer-big;
  color: $c-text-muted;
  text-decoration: none;
}
.characteristic {
  margin-bottom: $spacer-big;
}
.modal {
  .modal {
    &__heading {
      margin-bottom: $spacer-extra-big;
    }
  }
  &__button {
    display: block;
    margin-top: $spacer-extra-big;
  }
}
</style>
