import Vue from 'vue';
import {
  SfInput,
  SfIcon,
  SfLoader
} from '@storefront-ui/vue';

export default Vue.extend({
  name: 'AppliedGiftCard',
  components: {
    SfIcon,
    SfInput,
    SfLoader
  },
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
      giftCardValueModel: 0,
      isAmountEditing: false,
      isChangingValue: false,
      isRemoving: false

    }
  },
  computed: {
    editLabel (): string {
      return this.isAmountEditing ? 'Apply' : 'Edit';
    }
  },
  methods: {
    async changeAppliedGiftCardValue (): Promise<void> {
      if (this.isChangingValue) {
        return;
      }

      this.isChangingValue = true;
      try {
        await this.$store.dispatch('giftCard/changeAppliedGiftCardValue', {
          code: this.giftCardCode,
          value: this.giftCardValue
        });

        this.giftCardValueModel = this.giftCardValue;
      } catch (e) {
      } finally {
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
    },
    async removeAppliedGiftCard (): Promise<void> {
      if (this.isRemoving) {
        return;
      }

      this.isRemoving = true;
      await this.$store.dispatch('giftCard/removeAppliedGiftCard', this.giftCardCode);
      this.isRemoving = false;
    }
  }
});
