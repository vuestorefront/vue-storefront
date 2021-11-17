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
          <div
            class="_code-amount"
            v-show="!isAmountEditing"
            @click="onEditAmountClick"
          >
            ${{ appliedCodeAmount }}
          </div>

          <SfInput
            class="_code-amount-input"
            name="giftCardValue"
            :disabled="isChangingValue"
            v-model="giftCardValue"
            v-show="isAmountEditing"
          />

          <div class="_amount-edit" @click="onEditAmountClick" :disabled="isChangingValue">
            <SfIcon icon="check" size="xxs" :title="editLabel" v-show="!isChangingValue && isAmountEditing" />

            <SfIcon size="xxs" :title="editLabel" v-show="!isChangingValue && !isAmountEditing">
              <div class="_edit-icon" />
            </SfIcon>

            <div class="_loader" v-show="isChangingValue">
              <SfLoader class="_sf-loader -sm" :loading="true" />
            </div>
          </div>

          <div class="_code -close">
            )
          </div>

          <div class="_code-remove" @click="removeAppliedGiftCard" :disabled="isRemoving">
            <SfIcon icon="cross" size="xxs" title="Remove" v-show="!isRemoving" />

            <div class="_loader" v-show="isRemoving">
              <SfLoader class="_sf-loader -sm" :loading="true" />
            </div>
          </div>
        </div>
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
import {
  SfInput,
  SfButton,
  SfCheckbox,
  SfIcon,
  SfLoader
} from '@storefront-ui/vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

import GiftCard from '../types/GiftCard';

extend('required', {
  ...required,
  message: 'Please enter your code'
});

export default Vue.extend({
  name: 'GiftCardPayment',
  components: {
    SfButton,
    SfCheckbox,
    SfIcon,
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
    appliedCodeAmount (): number {
      if (!this.appliedGiftCard) {
        return 0;
      }

      return this.appliedGiftCard.value;
    },
    appliedGiftCard (): GiftCard | undefined {
      return this.$store.getters['giftCard/appliedGiftCard'];
    },
    editLabel (): string {
      return this.isAmountEditing ? 'Apply' : 'Edit';
    },
    grandTotal (): number | undefined {
      // return 0;
      const totals = this.$store.getters['cart/getTotals'];

      if (!totals || !totals.grand_total) {
        return;
      }

      return totals.grand_total;
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
      codeError: '',
      isRemoving: false,
      isChangingValue: false,
      giftCardValue: 0,
      isAmountEditing: false
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

        this.giftCardValue = this.appliedCodeAmount;
        this.giftCardCode = '';
      } catch (err) {
        this.codeError = (err as Error).message;
      } finally {
        this.isSubmitting = false;
      }
    },
    onGiftCardCodeChangeHandler (value: string): void {
      console.log(value);

      this.giftCardCode = value;

      this.getGiftCardCodeValidator()?.reset();
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
      try {
        await this.$store.dispatch('giftCard/changeAppliedGiftCardValue', {
          code: this.appliedGiftCard.code,
          value: this.giftCardValue
        });

        this.giftCardValue = this.appliedCodeAmount;
      } catch (e) {} finally {
        this.isChangingValue = false;
      }
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
    margin-bottom: var(--spacer-xs);
  }

  ._code-amount {
    color: var(--c-primary);
    font-weight: var(--font-bold);
    height: 1.4em;
    line-height: 155%;
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
    height: 1.4em;
    line-height: 155%;

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

  ._amount-edit {
    margin-left: var(--spacer-xs);
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

  ._edit-icon {
    width: 100%;
    height: 100%;
    background: url('../../../themes/petsies-capybara/assets/images/edit.svg');
  }

  ._loader {
    display: flex;
    align-items: center;

    ._sf-loader {
      width: 2em;
      height: 2em;

      &.-sm {
        width: 1em;
        height: 1em;
      }
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
