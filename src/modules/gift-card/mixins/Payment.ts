import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import Vue, { PropType } from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

import GiftCard from '../types/GiftCard';

extend('required', {
  ...required,
  message: 'Please enter your code'
});

export default Vue.extend({
  name: 'GiftCardPayment',
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
    showAppliedGiftCards (): boolean {
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
    showGrandTotalNotification (): boolean {
      return this.useGiftCard && this.grandTotal === 0;
    },
    showNoticeMessage (): boolean {
      return this.hasGiftCardsInOrder;
    }
  },
  data () {
    return {
      codeError: '',
      giftCardCode: '',
      isAllAppliedGiftCardsRemoving: false,
      isSubmitting: false,
      useGiftCard: false
    };
  },
  async created (): Promise<void> {
    await this.$store.dispatch('giftCard/pullAppliedGiftCards');

    if (this.appliedGiftCards.length) {
      this.useGiftCard = true;
    }
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
    },
    async removeAllAppliedGiftCards (): Promise<void> {
      if (!this.appliedGiftCards.length || this.isAllAppliedGiftCardsRemoving) {
        return;
      }

      this.isAllAppliedGiftCardsRemoving = true;
      await this.$store.dispatch(
        'giftCard/removeAppliedGiftCard',
        this.appliedGiftCards.map((giftCard) => giftCard.code)
      )
      this.isAllAppliedGiftCardsRemoving = false;
    }
  },
  watch: {
    useGiftCard (val) {
      if (!val) {
        this.removeAllAppliedGiftCards();
      }
    }
  }
});
