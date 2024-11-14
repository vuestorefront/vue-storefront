<template>
  <div class="raffle-registration-form">
    <form class="_form">
      <SfHeading>
        <template #title>
          <h2 class="sf-heading__title sf-heading__title--h2">
            {{ $t('Claim Your') }}

            <span class="_accent">
              {{ $t('Spot in Line') }}
            </span>
          </h2>
        </template>
      </SfHeading>

      <validation-observer v-slot="{passes}">
        <div class="_row">
          <validation-provider
            slim
            v-slot="{ errors }"
            rules="required"
            :name="$t('First Name')"
          >
            <SfInput
              class="_form-input"
              v-model="firstName"
              name="firstName"
              :label="$t('First Name')"
              :valid="!errors.length"
              :error-message="errors[0]"
            />
          </validation-provider>

          <validation-provider
            slim
            v-slot="{ errors }"
            rules="required"
            :name="$t('Last Name')"
          >
            <SfInput
              class="_form-input _last-name"
              v-model="lastName"
              name="lastName"
              :label="$t('Last Name')"
              :valid="!errors.length"
              :error-message="errors[0]"
            />
          </validation-provider>
        </div>

        <div class="_row -email">
          <validation-provider
            slim
            v-slot="{ errors }"
            rules="required|email"
            :name="$t('E-mail')"
          >
            <SfInput
              class="_form-input"
              v-model="email"
              name="email"
              type="email"
              :label="$t('E-mail')"
              :valid="!errors.length"
              :error-message="errors[0]"
            />
          </validation-provider>

          <SfButton
            class="_apply-button"
            @click.prevent="passes(() => onSubmit())"
          >
            {{ $t('Get Ticket') }}
          </SfButton>
        </div>

        <div class="_agreement">
          {{ $t('You agree to receive email marketing from Budsies regarding our products and services.') }}
        </div>

        <california-privacy-notice-link />
      </validation-observer>
    </form>

    <div class="_capacity">
      <div class="_content">
        <div class="_inner">
          <span class="_small">
            {{ $t('Capacity Per') }}
          </span>
          <br>
          {{ $t('Week') }}
        </div>

        <div class="_capacity-count">
          {{ capacity }}
        </div>
      </div>

      <div class="_next-drawing">
        {{ nextDrawing }}
      </div>
    </div>

    <ul class="_rules">
      <li class="_rule">
        {{ $t('Approx. 10-25 spots will open each week based on our artists\' capacity') }}
      </li>

      <li class="_rule">
        {{ $t('If your ticket is chosen, you\'ll be notified via email and have 5 days to order your Specialty Commission') }}
      </li>

      <li class="_rule">
        {{ $t('We will first get through all raffle ticket holders before we open up Specialty Commissions to the public')
        }}
      </li>

      <li class="_rule">
        {{ $t('You can see all previously chosen ticket numbers') }}
        <SfButton
          class="sf-button--text"
          @click="$emit('show-previous-winning-tickets-button-click')"
        >
          {{ $t('here') }}
        </SfButton>
      </li>
    </ul>

    <div class="_support">
      {{ $t('Thank you for supporting our artists & good luck!!') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';

import i18n from '@vue-storefront/i18n'
import { usePersistedEmail, usePersistedFirstName, usePersistedLastName } from 'src/modules/persisted-customer-data';

import { CaliforniaPrivacyNoticeLink } from 'src/modules/true-vault';

import { SfButton, SfHeading, SfInput } from '@storefront-ui/vue';

import { SN_RAFFLE } from '../types/store-name';
import { REGISTER } from '../types/action';

extend('required', {
  ...required,
  message: 'The {_field_} field is required'
});

extend('email', {
  ...email,
  message: 'Please, provide the correct email address'
});

export default defineComponent({
  name: 'RaffleRegistrationForm',
  components: {
    CaliforniaPrivacyNoticeLink,
    SfButton,
    SfHeading,
    SfInput,
    ValidationObserver,
    ValidationProvider
  },
  props: {
    capacity: {
      type: Number,
      required: true
    },
    nextDrawingDate: {
      type: String,
      required: true
    }
  },
  setup () {
    const email = ref<string | undefined>(undefined);
    const firstName = ref<string | undefined>(undefined);
    const lastName = ref<string | undefined>(undefined);

    return {
      email,
      firstName,
      lastName,
      ...usePersistedEmail(email),
      ...usePersistedFirstName(firstName),
      ...usePersistedLastName(lastName)
    }
  },
  data () {
    return {
      isSubmitting: false
    }
  },
  computed: {
    nextDrawing (): string {
      const date = new Date(this.nextDrawingDate);

      return this.$t('Next Drawing: {date}', {
        date: date.toLocaleDateString()
      }).toString();
    }
  },
  methods: {
    async onSubmit (): Promise<void> {
      if (this.isSubmitting) {
        return;
      }

      if (!this.firstName || !this.lastName || !this.email) {
        throw new Error('Required fields are missing');
      }

      this.persistLastUsedCustomerEmail(this.email);
      this.persistLastUsedCustomerFirstName(this.firstName);
      this.persistLastUsedCustomerLastName(this.lastName);

      this.isSubmitting = true;

      try {
        await this.$store.dispatch(`${SN_RAFFLE}/${REGISTER}`, {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName
        });
      } catch (error) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: (error as Error).message,
          action1: { label: i18n.t('OK') }
        })
      } finally {
        this.isSubmitting = false;
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.raffle-registration-form {
  ._accent {
    color: var(--c-warning);
  }

  ._row {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: var(--spacer-sm);

    ._form-input {
      flex-grow: 1;
      flex-basis: 100%;

      &._last-name {
        margin-top: var(--spacer-sm);
      }
    }

    &.-email {
      position: relative;

      &::before {
        background-image: url(../assets/fireworks-left.png);
        content: "";
        height: 102px;
        left: -64px;
        position: absolute;
        top: -24px;
        width: 98px;
        z-index: -1;
      }

      &::after {
        background-image: url(../assets/fireworks-right.png);
        content: "";
        height: 77px;
        position: absolute;
        right: -22px;
        top: 35px;
        width: 74px;
        z-index: -1;
      }
    }
  }

  ._agreement {
    font-size: var(--font-xs);
    text-align: center;
    margin-top: var(--spacer-xs);
  }

  ._capacity {
    max-width: 375px;
    margin: var(--spacer-base) auto 0;
    position: relative;
    z-index: 1;

    ._content {
      background: url(../assets/spot.png) no-repeat 0 0;
      background-size: cover;
      padding: var(--spacer-base);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    ._inner,
    ._capacity-count {
      flex: 1;
      text-transform: uppercase;
      font-size: var(--font-lg);
      font-weight: var(--font-bold);
      line-height: 1;
      padding-left: var(--spacer-sm);
    }

    ._small {
      font-size: var(--font-xs);
    }

    ._capacity-count {
      text-align: center;
      color: var(--c-white);
      font-size: var(--font-2xl);
    }

    ._next-drawing {
      margin-top: var(--spacer-xs);
      font-size: var(--font-2xs);
      font-weight: var(--font-bold);
      text-align: center;
    }
  }

  ._apply-button {
    --button-font-size: var(--font-sm);
    --button-font-line-height: 1;

    margin-top: var(--spacer-sm);
    width: 100%;
  }

  ._rules {
    margin-top: var(--spacer-lg);
  }

  ._support {
    margin-top: var(--spacer-base);
    font-size: var(--font-xs);
    text-align: center;
  }

  @include for-desktop() {
    ._row {
      flex-wrap: nowrap;

      ._form-input {
        margin-left: var(--spacer-lg);

        &:first-child {
          margin-left: 0;
        }

        &._last-name {
          margin-top: 0;
        }
      }
    }

    ._apply-button {
      margin-top: 0;
      width: auto;
    }
  }
}
</style>
