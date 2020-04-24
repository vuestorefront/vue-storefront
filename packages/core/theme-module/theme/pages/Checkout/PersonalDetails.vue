<template>
  <div>
    <div class="log-in desktop-only">
      <SfButton class="log-in__button color-secondary"
        >Log in to your account</SfButton
      >
      <p class="log-in__info">or fill the details below:</p>
    </div>
    <SfHeading :level="3" title="Personal details" class="sf-heading--left sf-heading--no-underline title" />
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
      <div class="info">
        <p class="info__heading">
          Enjoy these perks with your free account!
        </p>
        <SfCharacteristic
          v-for="(characteristic, key) in characteristics"
          :key="key"
          :description="characteristic.description"
          :icon="characteristic.icon"
          size-icon="0.75rem"
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
        <SfButton class="color-secondary form__back-button">
          Go back
        </SfButton>
        <SfButton class="form__action-button" @click="$emit('nextStep')">
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
import { useCheckout } from '<%= options.composables %>';

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
  @include for-desktop {
    margin: var(--spacer-2xl) 0 var(--spacer-base) 0;
  }
}
.log-in {
  &__info {
    margin: var(--spacer-lg) 0;
    color: var(--c-dark-variant);
    font: var(--font-light) var(--font-base) / 1.6 var(--font-family-primary);
    @include for-desktop {
      font-weight: var(--font-normal);
      font-size: var(--font-sm);
    }
  }
  &__button {
    margin: var(--spacer-2xl) 0 var(--spacer-xl) 0;
  }
}
.info {
  margin: 0 0 var(--spacer-xl) 0;
  &__heading {
    font-family: var(--font-family-primary);
    font-weight: var(--font-light);
  }
  &__characteristic {
    --characteristic-description-font-size: var(--font-xs);
    margin: 0 0 var(--spacer-sm) var(--spacer-2xs);
  }
  @include for-desktop {
    margin: 0;
    &__heading {
      margin: 0 0 var(--spacer-sm) 0;
      font-size: var(--font-xs);
    }
    &__characteristic {
      margin: var(--spacer-base) 0;
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
    margin: 0 var(--spacer-xl) 0 0;
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
