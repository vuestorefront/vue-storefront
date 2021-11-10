<template>
  <div
    class="gift-card-template-container"
    :style="{
      '--height': `${height}px`,
      '--template-height': `${templateHeight}px`,
      '--template-width': `${templateWidth}px`,
    }"
  >
    <div
      class="gift-card-template"
      ref="giftCard"
      :style="{
        '--text-color': textColor,
        '--scale': scale,
      }"
    >
      <div class="_content" v-if="giftCardTemplate">
        <img
          class="_template-image"
          :src="giftCardTemplate.backgroundImage"
          alt=""
        >

        <div class="_to">
          {{ recipientName }}
        </div>

        <div class="_from">
          {{ senderName }}
        </div>

        <div class="_gift-value">
          {{ giftValue }}
        </div>

        <div class="_redemption-code">
          GIFT-XXXX-XXXX
        </div>

        <div class="_custom-message-container">
          <p class="_custom-message">
            {{ customMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isServer } from '@vue-storefront/core/helpers';
import Vue, { PropType, VueConstructor } from 'vue';
import throttle from 'lodash.throttle';

import GiftCardTemplate from '../types/GiftCardTemplate.interface';
import GiftCardTemplateSize from '../GiftCardTemplateSize';

interface TemplateSize {
  templateHeight: number,
  templateWidth: number
}

export default (Vue as VueConstructor<Vue & TemplateSize>).extend({
  props: {
    giftCardTemplate: {
      type: Object as PropType<GiftCardTemplate>,
      default: undefined
    },
    recipientName: {
      type: String,
      default: ''
    },
    senderName: {
      type: String,
      default: ''
    },
    priceAmount: {
      type: Number,
      required: true
    },
    customMessage: {
      type: String,
      default: ''
    }
  },
  computed: {
    textColor (): string | undefined {
      return this.giftCardTemplate
        ? this.giftCardTemplate.textColor
        : undefined;
    },
    giftValue (): string {
      return `$${this.priceAmount}`;
    }
  },
  data () {
    return {
      resizeHandler: undefined as undefined | (() => void),
      scale: 1,
      height: GiftCardTemplateSize.height
    };
  },
  created (): void {
    this.templateHeight = GiftCardTemplateSize.height;
    this.templateWidth = GiftCardTemplateSize.width;
  },
  mounted (): void {
    this.initResizeHandler();
    this.$nextTick().then(this.updateScale);
  },
  beforeDestroy (): void {
    this.removeResizeHandler();
  },
  methods: {
    getGiftCardElement (): HTMLElement | undefined {
      return this.$refs.giftCard as HTMLElement | undefined;
    },
    initResizeHandler (): void {
      if (isServer) {
        return;
      }

      if (this.resizeHandler) {
        this.removeResizeHandler();
      }

      this.resizeHandler = throttle(() => this.updateScale(), 200);

      window.addEventListener('resize', this.resizeHandler);
    },
    removeResizeHandler (): void {
      if (!this.resizeHandler) {
        return;
      }

      window.removeEventListener('resize', this.resizeHandler);
    },
    updateScale (): void {
      const giftCardElement = this.getGiftCardElement();

      if (!giftCardElement) {
        return;
      }

      const parent = giftCardElement.parentElement;

      if (!parent) {
        return;
      }

      const computedStyles = getComputedStyle(parent);
      const parentWidth =
        parent.clientWidth -
        parseFloat(computedStyles.paddingLeft) -
        parseFloat(computedStyles.paddingRight);

      this.scale = parentWidth / this.templateWidth;
      this.height = this.templateHeight * this.scale;
    }
  }
});
</script>

<style lang="scss" scoped>
.gift-card-template-container {
  height: var(--height);

  .gift-card-template {
    position: relative;
    height: var(--template-height);
    width: var(--template-width);
    transform: scale(var(--scale));
    transform-origin: 0 0;

    ._content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: var(--text-color);

      ._template-image {
        width: 100%;
      }
    }

    ._from {
      left: 19%;
      position: absolute;
      top: 69.5%;
      width: 265px;
    }

    ._to {
      left: 16%;
      position: absolute;
      top: 59%;
      width: 290px;
    }

    ._gift-value {
      left: 57%;
      position: absolute;
      top: 59%;
      width: 100px;
    }

    ._redemption-code {
      left: 69%;
      position: absolute;
      text-align: left;
      top: 69.5%;
      width: 200px;
    }

    ._custom-message-container {
      height: 60px;
      left: 116px;
      padding: 0;
      position: absolute;
      top: 305px;
      width: 670px !important;

      ._custom-message {
        max-height: 85px;
        overflow: hidden;
        color: var(--c-black);
        font-size: 0.8em;
        line-height: 1.2;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
