<template>
  <div class="inspiration-machine-download-guide-step">
    <p>{{ $t('Your kit includes printable templates of your special creature and all the awesome extras you selected.') }}</p>

    <ul class="_list">
      <li>
        {{ $t('Cut them out and paste them together') }}
      </li>

      <li>
        {{ $t('Trace the pieces and color them in') }}
      </li>

      <li>
        {{ $t('Or draw something completely new based on your templates') }}
      </li>
    </ul>

    <p>{{ $t('Whatever you decide to do, we can\'t wait to see what you create! :)') }}</p>

    <p>
      {{ $t('Enter your address below and we\'ll send you your customized, printable kit! We’ll also send you a free digital copy of “Dongler’s Dinner Quest” drawing and storybook. (valued at $24.95 on Amazon)') }}
    </p>

    <div class="_request-kit">
      <SfHeading :level="2" :title="$t('Email Address:')" />

      <email-submit-form
        class="_form"
        :button-text="$t('Send My Inspiration Kit')"
        :submit-action="onFormSubmit"
        :prefilled-email="prefilledEmail"
        name="request-inspiration-kit-form"
        success-message=""
        layout="vertical"
      />

      <div class="_helper">
        {{ $t('Please allow up to 5 mins for the digital guide to be created') }}
      </div>

      <SfButton
        class="_skip-button sf-button--text"
        @click="$emit('skip-request-kit-button-click')"
      >
        {{ $t('Skip to download') }}
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts">
import { SfButton, SfHeading } from '@storefront-ui/vue';
import { PropType, defineComponent, ref } from 'vue';

import { EmailSubmitForm } from 'src/modules/shared';
import { usePersistedEmail } from 'src/modules/persisted-customer-data';

import { SN_INSPIRATION_MACHINE } from '../types/store-name';
import { REQUEST_KIT } from '../types/action';

export default defineComponent({
  name: 'InspirationMachineDownloadGuideStep',
  props: {
    characterId: {
      type: Number,
      required: true
    },
    extraIds: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },
  components: {
    SfButton,
    SfHeading,
    EmailSubmitForm
  },
  setup () {
    const prefilledEmail = ref<string | undefined>(undefined);
    const { persistLastUsedCustomerEmail } = usePersistedEmail(prefilledEmail);

    return {
      prefilledEmail,
      persistLastUsedCustomerEmail
    }
  },
  methods: {
    async onFormSubmit (email: string): Promise<void> {
      this.persistLastUsedCustomerEmail(email);

      const response = await this.$store.dispatch(`${SN_INSPIRATION_MACHINE}/${REQUEST_KIT}`, {
        email,
        characterId: this.characterId,
        extraIds: this.extraIds
      });

      if (response.result.errorMessage) {
        throw new Error(response.result.errorMessage);
      }

      this.$emit('request-kit-form-submitted');
    }
  }
})
</script>

<style lang="scss" scoped>
.inspiration-machine-download-guide-step {
  text-align: center;

  ._list {
    list-style: disc;
    display: inline-block;
    text-align: start;
  }

  ._request-kit {
    margin-top: var(--spacer-lg);
  }

  ._form {
    margin: var(--spacer-sm) auto 0;
    text-align: start;
    max-width: 30rem;
  }

  ._helper {
    font-size: var(--font-xs);
    margin-top: var(--spacer-base);
  }
}
</style>
