<template>
  <div>
    <SfHeading
      title="1. Personal details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfInput
        v-model="personalDetails.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="personalDetails.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="personalDetails.email"
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
        <SfButton class="sf-button--text info" @click="accountBenefits = true">+info</SfButton>
      </div>
      <transition name="fade">
        <SfInput
          v-if="createAccount"
          v-model="personalDetails.password"
          type="password"
          label="Create Password"
          class="form__element"
          required
        />
      </transition>
      <div class="form__action">
        <SfButton class="sf-button--full-width form__action-button" @click="$emit('nextStep')">
          Continue to shipping
        </SfButton>
        <SfButton class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary">
          or log in to your account
        </SfButton
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
        class="sf-button--full-width color-secondary modal__button" @click="accountBenefits = false">
        Ok
      </SfButton>
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
} from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import { useCheckout } from '@vue-storefront/commercetools-composables';

export default {
  name: 'PersonalDetails',
  components: {
    SfInput,
    SfCheckbox,
    SfButton,
    SfHeading,
    SfModal,
    SfCharacteristic
  },
  setup(props, context) {
    context.emit('changeStep', 0);
    const { personalDetails } = useCheckout();
    const accountBenefits = ref(false);
    const createAccount = ref(false);

    return {
      personalDetails,
      accountBenefits,
      createAccount,
      characteristics: [
        { description: 'Faster checkout',
          icon: 'clock' },
        { description: 'Full rewards program benefits',
          icon: 'rewards' },
        { description: 'Earn credits with every purchase',
          icon: 'credits' },
        { description: 'Manage your wishliste',
          icon: 'heart' }
      ]
    };
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
