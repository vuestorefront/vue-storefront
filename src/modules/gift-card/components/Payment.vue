<template>
  <div class="gift-card-payment">
    <div class="_notice-message" v-if="showNoticeMessage">
      Gift Cards cannot be used to purchase Gift Card products
    </div>

    <template v-if="showContent">
      <SfCheckbox v-model="useGiftCard" class="_checkbox">
        <template #label>
          <span class="sf-checkbox__label">
            {{ $t("Use gift card to checkout") }}
          </span>
        </template>
      </SfCheckbox>

      <div class="_applied-gift-cards" v-if="showAppliedGiftCard">
        <AppliedGiftCard
          class="_applied-gift-card"
          v-for="giftCard in appliedGiftCards"
          :key="giftCard.code"
          :gift-card-code="giftCard.code"
          :gift-card-value="giftCard.value"
        />
      </div>

      <validation-observer
        v-slot="{ passes }"
        tag="div"
        class="_form"
        v-if="showForm"
      >
        <validation-provider
          v-slot="{ errors }"
          mode="passive"
          name="giftCode"
          rules="required"
          ref="giftCardCodeValidator"
          slim
        >
          <div class="_form-field">
            <div class="_code-error" v-show="showCodeError">
              {{ codeError }}
            </div>

            <SfInput
              class="form__element form__element--half"
              name="giftCode"
              :label="$t('Gift Card Code')"
              :required="true"
              :valid="!errors.length"
              :error-message="errors[0]"
              :value="giftCardCode"
              @input="onGiftCardCodeChangeHandler"
            />
          </div>
        </validation-provider>

        <div class="_loader -gift-card" v-show="isSubmitting">
          <SfLoader class="_sf-loader" :loading="true" />
          <span class="_loader-text"> Adding Gift Card... </span>
        </div>

        <SfButton
          class="color-secondary _apply-button"
          :disabled="isSubmitting"
          @click.native="() => passes(() => onApplyGiftCardCode())"
        >
          {{ $t("Apply Gift Card") }}
        </SfButton>
      </validation-observer>

      <div class="_grand-total-notification" v-if="showGranTotalNotification">
        <span> Your order’s grand total is now zero. You're all set! </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import Vue, { PropType } from 'vue';
import { SfInput, SfButton, SfCheckbox, SfLoader } from '@storefront-ui/vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

import GiftCard from '../types/GiftCard';

import AppliedGiftCard from './AppliedGiftCard.vue';

extend('required', {
  ...required,
  message: 'Please enter your code'
});

export default Vue.extend({
  name: 'GiftCardPayment',
  components: {
    AppliedGiftCard,
    SfButton,
    SfCheckbox,
    SfInput,
    SfLoader,
    ValidationObserver,
    ValidationProvider
  },
  props: {
    cartItems: {
      type: Array as PropType<CartItem[]>,
      required: true
    }
  },
  computed: {
    appliedGiftCards (): GiftCard[] {
      return this.$store.getters['giftCard/appliedGiftCards'];
    },
    grandTotal (): number | undefined {
      const totals = this.$store.getters['cart/getTotals'];

      if (!totals || !totals.length) {
        return;
      }

      const grandTotal = totals.find((totalsItem) => totalsItem.code === 'grand_total');

      return grandTotal ? grandTotal.value : undefined;
    },
    hasGiftCardsInOrder (): boolean {
      return this.cartItems.some((item) => item.sku === 'GiftCard');
    },
    isOnlyGiftCardsInOrder (): boolean {
      return this.cartItems.every((item) => item.sku === 'GiftCard');
    },
    showAppliedGiftCard (): boolean {
      return this.useGiftCard && this.appliedGiftCards.length > 0;
    },
    showCodeError (): boolean {
      return !!this.codeError;
    },
    showContent (): boolean {
      return !this.isOnlyGiftCardsInOrder;
    },
    showForm (): boolean {
      return this.useGiftCard && this.grandTotal !== 0;
    },
    showGranTotalNotification (): boolean {
      return this.useGiftCard && this.grandTotal === 0;
    },
    showNoticeMessage (): boolean {
      return this.hasGiftCardsInOrder;
    }
  },
  data () {
    return {
      useGiftCard: false,
      giftCardCode: '',
      isSubmitting: false,
      codeError: ''
    };
  },
  methods: {
    getGiftCardCodeValidator ():
    | InstanceType<typeof ValidationProvider>
    | undefined {
      return this.$refs.giftCardCodeValidator as
        | InstanceType<typeof ValidationProvider>
        | undefined;
    },
    async onApplyGiftCardCode (): Promise<void> {
      if (this.isSubmitting) {
        return;
      }

      this.codeError = '';
      this.isSubmitting = true;
      try {
        await this.$store.dispatch(
          'giftCard/applyGiftCardCode',
          this.giftCardCode
        );

        this.giftCardCode = '';
      } catch (err) {
        this.codeError = (err as Error).message;
      } finally {
        this.isSubmitting = false;
      }
    },
    onGiftCardCodeChangeHandler (value: string): void {
      this.giftCardCode = value;

      this.getGiftCardCodeValidator()?.reset();
    }
  }
});
</script>

<style lang="scss" scoped>
.gift-card-payment {
  display: flex;
  flex-direction: column;

  ._notice-message {
    background-color: var(--c-light);
    padding: var(--spacer-xs) var(--spacer-sm);
    position: relative;
    text-align: center;
    font-weight: 700;
    margin-bottom: var(--spacer-sm);
  }

  ._checkbox {
    margin-bottom: var(--spacer-sm);
  }

  ._label {
    margin-bottom: var(--spacer-xs);
  }

  ._apply-button {
    margin-bottom: var(--spacer-base);
  }

  ._applied-gift-card {
    margin-bottom: var(--spacer-xs);
  }

  ._code-error {
    background-color: var(--c-warning-darken);
    margin-bottom: var(--spacer-sm);
    padding: var(--spacer-xs) var(--spacer-sm);
    text-align: center;
  }

  ._grand-total-notification {
    background-color: var(--c-success);
    padding: var(--spacer-xs) var(--spacer-sm);
    font-size: var(--font-lg);
    text-align: center;

    span {
      vertical-align: sub;
    }
  }

  ._loader {
    display: flex;
    align-items: center;

    ._sf-loader {
      width: 2em;
      height: 2em;
    }

    ._loader-text {
      margin-left: var(--spacer-sm);
      line-height: 100%;
    }

    &.-gift-card {
      margin-bottom: var(--spacer-base);
    }
  }
}
</style>
