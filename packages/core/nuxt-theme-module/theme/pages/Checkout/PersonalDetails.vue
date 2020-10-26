<template>
  <div>
    <div class="log-in desktop-only">
      <SfButton data-cy="personal-details-btn_login" class="log-in__button color-secondary"
        >Log into your account</SfButton
      >
      <p class="log-in__info">or fill the details below:</p>
    </div>
    <SfHeading :level="3" title="Personal details" class="sf-heading--left sf-heading--no-underline title" />
    <div class="form">
      <SfInput
        data-cy="personal-details-input_firstName"
        v-model="personalDetails.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        data-cy="personal-details-input_lastName"
        v-model="personalDetails.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        data-cy="personal-details-input_email"
        v-model="personalDetails.email"
        label="Your email"
        name="email"
        class="form__element"
        required
      />
      <div class="info">
        <p class="info__heading">
          Enjoy these perks with your free account!
        </p>
        <SfCharacteristic
          v-for="(characteristic, key) in characteristics"
          :key="key"
          :description="characteristic.description"
          :icon="characteristic.icon"
          size-icon="24px"
          class="info__characteristic"
        />
      </div>
      <div class="form__element form__group">
        <SfCheckbox
          v-model="createAccount"
          name="createAccount"
          label="I want to create an account"
        />
      </div>
      <transition name="fade">
        <SfInput
          data-cy="personal-details-input_password"
          v-if="createAccount"
          v-model="personalDetails.password"
          type="password"
          label="Create Password"
          class="form__element"
          required
        />
      </transition>
      <div class="form__action">
        <!-- TODO: add nuxt link for returning to home page -->
        <SfButton data-cy="personal-details-btn_go-back" class="color-secondary form__back-button">
          Go back
        </SfButton>
        <SfButton data-cy="personal-details-btn_continue" class="form__action-button" @click="$emit('nextStep')">
          Continue to shipping
        </SfButton>
      </div>
    </div>
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
import { useCheckout } from '<%= options.generate.replace.composables %>';

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
@import "~@storefront-ui/vue/styles";
.title {
 margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.log-in {
  &__info {
    margin: var(--spacer-lg) 0;
    color: var(--c-link);
    font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--secondary);
    @include for-desktop {
      font-weight: var(--font-weight--normal);
    }
  }
  &__button {
    margin: var(--spacer-2xl) 0 var(--spacer-xl) 0;
  }
}
.info {
  margin: 0 0 var(--spacer-xl) 0;
  &__heading {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    margin-bottom: var(--spacer-base);
  }
  &__characteristic {
    --characteristic-description-font-size: var(--font-size--base);
    margin: 0 0 var(--spacer-sm) var(--spacer-2xs);
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    &__heading {
      flex: 100%;
      margin: 0 0 var(--spacer-sm) 0;
      font-size: var(--font-size--xs);
    }
    &__characteristic {
      margin: 0 0 var(--spacer-base) 0;
      flex: 0 50%;
    }
  }
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
    margin: var(--spacer-xl) 0 var(--spacer-lg) 0;
  }
  &__action {
    display: flex;
    flex-direction: column-reverse;
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      flex: 0 0 100%;
      flex-direction: row;
      margin: 0;
    }
  }
  &__action-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0;
    }
  }
  &__back-button {
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
}
.info {
  --button-padding: 0 var(--spacer);
  --button-color: var(--c-text-muted);
  --button-text-decoration: none;
}
.characteristic {
  margin: 0 0 var(--spacer-xl) 0;
  &:last-child {
    margin: 0;
  }
}
.modal {
  &__heading {
    margin: 0 0 var(--spacer-2xl) 0;
  }
  &__button {
    margin: var(--spacer-2xl) 0 0 0;
  }
}
</style>
