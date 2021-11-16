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

      <div class="_applied-code" v-if="showAppliedGiftCard">
        <div class="_code -open">
          GIFT-XXXX-XXXXXX (
        </div>

        <div class="_code-actions">
          <div class="_code-amount" v-show="!isAmountEditing">
            ${{ appliedCodeAmount }}
          </div>

          <SfInput
            class="_code-amount-input"
            name="giftCardValue"
            v-model="giftCardValue"
            v-show="isAmountEditing"
          />

          <div class="_amount-edit" @click="onEditAmountClick">
            <SfIcon :icon="editIcon" size="xxs" :aria-label="editLabel" />
          </div>

          <div class="_code -close">
            )
          </div>

          <div class="_code-remove" @click="removeAppliedGiftCard">
            <SfIcon icon="cross" size="xxs" aria-label="Remove" />
          </div>
        </div>
      </div>

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
import {
  SfInput,
  SfButton,
  SfCheckbox,
  SfIcon,
  SfHeading
} from '@storefront-ui/vue';
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
    SfIcon,
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
    editIcon (): string {
      return this.isAmountEditing ? 'check' : 'filter2';
    },
    editLabel (): string {
      return this.isAmountEditing ? 'Apply' : 'Edit';
    },
    hasGiftCardsInOrder (): boolean {
      return this.cartItems.some((item) => item.sku === 'GiftCard');
    },
    isOnlyGiftCardsInOrder (): boolean {
      return this.cartItems.every((item) => item.sku === 'GiftCard');
    },
    showAppliedGiftCard (): boolean {
      return !!(this.showForm && this.appliedGiftCard);
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
    },
    appliedCodeAmount (): number {
      if (!this.appliedGiftCard) {
        return 0;
      }

      return this.appliedGiftCard.value;
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
      giftCardValue: 0,
      isAmountEditing: false
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
        await this.$store.dispatch(
          'giftCard/applyGiftCardCode',
          this.giftCardCode
        );

        this.giftCardValue = this.appliedCodeAmount;
      } catch (err) {
        this.codeError = (err as Error).message;
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
      await this.$store.dispatch('giftCard/changeAppliedGiftCardValue', {
        code: this.appliedGiftCard.code,
        value: this.giftCardValue
      });
      this.isChangingValue = false;
    },
    async onEditAmountClick (): Promise<void> {
      if (this.isAmountEditing) {
        await this.changeAppliedGiftCardValue();
        this.isAmountEditing = false;
        return;
      }

      this.isAmountEditing = true;
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

  ._applied-code {
    font-size: var(--font-lg);
    height: 1.4em;
    margin-bottom: var(--spacer-xs);
  }

  ._code-amount {
    color: var(--c-primary);
    font-weight: var(--font-bold);
  }

  ._code-error {
    background-color: var(--c-warning-darken);
    margin-bottom: var(--spacer-sm);
    padding: var(--spacer-xs) var(--spacer-sm);
    text-align: center;
  }

  ._code {
    color: var(--c-success-variant);
    margin: 0 var(--spacer-xs);
    font-weight: var(--font-bold);

    &.-open {
      margin-left: 0;
    }
  }

  ._code-remove,
  ._amount-edit,
  ._code-amount {
    cursor: pointer;
  }

  ._applied-code,
  ._code-actions {
    display: flex;
    align-items: center;
  }

  ._code-amount-input {
    --input-padding: var(--spacer-2xs);
    --input-height: 1.4em;
    --input-width: 5em;
  }
}
</style>
