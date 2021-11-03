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

      <div class="_form" v-if="showForm">
        <validation-observer v-slot="{ passes }" slim>
          <validation-provider
            v-slot="{ errors, classes }"
            name="giftCode"
            rules="required"
          >
            <div class="_form-field" :class="classes">
              <!-- <label class="_label"> Use your Gift card(s) to pay for this order </label> -->

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
                v-model="giftCardCode"
              />
            </div>
          </validation-provider>

          <SfButton
            class="color-secondary _apply-button"
            @click.native="() => passes(() => onApplyGiftCardCode())"
          >
            {{ $t("Apply Gift Card") }}
          </SfButton>
        </validation-observer>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import Vue, { PropType } from 'vue';
import { SfInput, SfButton, SfCheckbox, SfHeading } from '@storefront-ui/vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

import GiftCard from '../types/GiftCard';

extend('required', {
  ...required,
  message: 'The {_field_} field is required'
});

enum State {}

export default Vue.extend({
  name: 'GiftCardPayment',
  components: {
    SfInput,
    SfButton,
    SfCheckbox,
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
    appliedGiftCard (): GiftCard | undefined {
      return this.$store.getters['giftCard/appliedGiftCard'];
    },
    hasGiftCardsInOrder (): boolean {
      return this.cartItems.some((item) => item.sku === 'GiftCard');
    },
    isOnlyGiftCardsInOrder (): boolean {
      return this.cartItems.every((item) => item.sku === 'GiftCard');
    },
    showCodeError (): boolean {
      return !!this.codeError;
    },
    showContent (): boolean {
      return !this.isOnlyGiftCardsInOrder;
    },
    showForm (): boolean {
      return this.useGiftCard;
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
      codeError: '',
      isRemoving: false,
      isChangingValue: false,
      giftCardValue: 0
    };
  },
  methods: {
    async onApplyGiftCardCode (): Promise<void> {
      if (this.isSubmitting) {
        return;
      }

      this.codeError = '';
      this.isSubmitting = true;
      try {
        await this.$store.dispatch('giftCard/applyGiftCardCode', this.giftCardCode);
      } catch (err) {
        this.codeError = err as string;
      } finally {
        this.isSubmitting = false;
      }
    },
    async removeAppliedGiftCard (): Promise<void> {
      if (this.isRemoving) {
        return;
      }

      this.isRemoving = true;
      await this.$store.dispatch('giftCard/removeAppliedGiftCard');
      this.isRemoving = false;
    },
    async changeAppliedGiftCardValue (): Promise<void> {
      if (this.isChangingValue || !this.appliedGiftCard) {
        return;
      }

      this.isChangingValue = true;
      await this.$store.dispatch(
        'giftCard/changeAppliedGiftCardValue',
        { code: this.appliedGiftCard.code, value: this.giftCardValue }
      )
      this.isChangingValue = false;
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

  ._code-error {
    background-color: var(--c-warning-darken);
    margin-bottom: var(--spacer-sm);
  }
}
</style>
