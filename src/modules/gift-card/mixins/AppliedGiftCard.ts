import Vue from 'vue';

import getMaskedCode from '../helpers/get-masked-code.function';

export default Vue.extend({
  name: 'AppliedGiftCard',
  props: {
    giftCardCode: {
      type: String,
      required: true
    },
    giftCardValue: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      newGiftCardValue: 0,
      isAmountEditing: false,
      isSubmittingNewValue: false,
      isRemoving: false
    }
  },
  created () {
    this.newGiftCardValue = this.giftCardValue;
  },
  computed: {
    editLabel (): string {
      return this.isAmountEditing ? 'Apply' : 'Edit';
    },
    maskedGiftCardCode (): string {
      return getMaskedCode(this.giftCardCode);
    },
    isSubmitting (): boolean {
      return this.isSubmittingNewValue || this.isRemoving;
    }
  },
  methods: {
    async changeAppliedGiftCardValue (): Promise<void> {
      if (this.isSubmitting || !this.isAmountEditing) {
        return;
      }

      this.isSubmittingNewValue = true;
      try {
        await this.$store.dispatch('giftCard/changeAppliedGiftCardValue', {
          code: this.giftCardCode,
          value: this.newGiftCardValue
        });

        this.isAmountEditing = false;
      } finally {
        this.isSubmittingNewValue = false;
      }
    },
    async removeAppliedGiftCard (): Promise<void> {
      if (this.isSubmitting) {
        return;
      }

      this.isRemoving = true;
      try {
        await this.$store.dispatch('giftCard/removeAppliedGiftCard', [this.giftCardCode]);
      } finally {
        this.isRemoving = false;
      }
    },
    startEdit (): void {
      this.isAmountEditing = true;
    }
  },
  watch: {
    giftCardValue (val) {
      this.newGiftCardValue = val;
    }
  }
});
