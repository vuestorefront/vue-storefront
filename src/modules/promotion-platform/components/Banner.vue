<template>
  <div
    class="promotion-platform-countdown-banner-wrapper"
    :class="{ '-narrow': isNarrow }"
  >
    <div
      class="promotion-platform-countdown-banner-container"
      v-show="showBanner"
      :style="bannerStyle"
      ref="container"
    >
      <div class="promotion-platform-countdown-banner">
        <div class="_container">
          <div class="_left-column">
            <h2 class="_title">
              {{ title }}
            </h2>

            <div class="_timer-container">
              <countdown-timer
                class="_timer"
                :countdown-time="getCountdownTime()"
                @timer-stopped="onTimerStopped"
              />
            </div>
          </div>

          <div class="_content" v-html="processedDescription" />

          <div class="_timer-btn _close-btn" @click="onCloseButtonClickHandler">
            <i class="fa fa-times" />
          </div>

          <div class="_timer-btn _view-toggle-btn" @click="onToggleViewButtonClickHandler">
            <i class="fa fa-times" />

            <i class="fa fa-angle-double-down" />
            <div class="_btn-text">
              {{ $t('More Info') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { computed, ref, watch } from 'vue';

import { isServer, PriceHelper } from '@vue-storefront/core/helpers';
import { PRODUCT_LOCALIZED_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { Dictionary } from 'src/modules/budsies';
import { useRootInstance } from 'src/modules/shared/composables/use-current-instance';
import { DirectiveType, TextPart, useTextDirectives } from 'src/modules/shared/composables/use-text-directives';
import { StatisticMetric } from 'src/modules/budsies/types/statistic-metric';
import { Currency, DEFAULT_CURRENCY, GET_ACTIVE_CURRENCY, GET_CURRENCY_EXCHANGE_RATE } from 'src/modules/currency';

import { CampaignContent } from '../types/CampaignContent.interface';
import { SET_LAST_BANNER_VERSION_CLOSED_BY_USER } from '../types/StoreMutations';

import Timer from './Timer.vue';
import { CountdownBanner } from '../types/CountdownBanner.interface';

const startTimeThreshold = 1;

export default Vue.extend({
  components: {
    CountdownTimer: Timer
  },
  setup (props) {
    const root = useRootInstance();
    const processedDescription = ref<string>('');

    const productBySkuDictionary = computed<Record<string, Product>>(() => {
      return root.$store.getters['product/getProductBySkuDictionary'];
    });

    const localizedPriceDictionary = computed<Record<string, PriceHelper.ProductPrice>>(() => {
      return root.$store.getters[PRODUCT_LOCALIZED_PRICE_DICTIONARY];
    });
    const selectedCurrency = computed<Currency>(() => {
      return root.$store.getters[GET_ACTIVE_CURRENCY] || DEFAULT_CURRENCY;
    });
    const exchangeRate = computed<number>(() => {
      return root.$store.getters[GET_CURRENCY_EXCHANGE_RATE] || 1;
    });
    const bannerRenderingDependencies = computed(() => ({
      localizedPriceDictionary: localizedPriceDictionary.value,
      currencyCode: selectedCurrency.value.code,
      currencySymbol: selectedCurrency.value.symbol,
      exchangeRate: exchangeRate.value
    }));

    const campaignContent = computed<CampaignContent | undefined>(() => {
      return root.$store.getters['promotionPlatform/campaignContent'];
    });

    const bannerContent = computed< CountdownBanner | undefined>(() => {
      return campaignContent.value?.countdown;
    });

    function processTextPart (
      textPart: TextPart,
      productLocalizedPriceDictionary: Record<string, PriceHelper.ProductPrice>
    ): string {
      if (typeof textPart === 'string') {
        return textPart;
      }

      if (textPart.type === DirectiveType.ORDERED_PLUSHIES_COUNT) {
        return root.$store.getters['budsies/getStatisticValueByMetric'](
          StatisticMetric.ORDERED_PLUSHIES_COUNT
        );
      }

      if (textPart.type === DirectiveType.PRICE_VALUE) {
        return PriceHelper.formatPrice(
          textPart.amount * exchangeRate.value,
          selectedCurrency.value.symbol
        );
      }

      const product = productBySkuDictionary.value[textPart.productSku];

      if (!product) {
        return '';
      }

      const productPrice = productLocalizedPriceDictionary[product.id];

      if (!productPrice) {
        return '';
      }

      const finalPrice = PriceHelper.getFinalPrice(productPrice);

      if (textPart.type === DirectiveType.PRODUCT_PRICE) {
        return PriceHelper.formatPrice(finalPrice, selectedCurrency.value.symbol);
      }

      const specificPrice = textPart.priceType === 'special'
        ? productPrice.special
        : productPrice.regular;

      if (!specificPrice) {
        return '';
      }

      return PriceHelper.formatPrice(specificPrice, selectedCurrency.value.symbol);
    }

    function processTextParts (textParts: TextPart[]) {
      processedDescription.value = '';

      if (!textParts.length) {
        return;
      }

      for (const textPart of textParts) {
        processedDescription.value += processTextPart(
          textPart,
          localizedPriceDictionary.value
        );
      }
    }

    const { processDirectivesInText, isDirectivesProcessing } = useTextDirectives(processTextParts);

    watch(
      bannerRenderingDependencies,
      () => {
        processDirectivesInText(bannerContent.value?.description || '');
      }
    );

    return {
      bannerContent,
      campaignContent,
      isDirectivesProcessing,
      processDirectivesInText,
      processedDescription
    };
  },
  computed: {
    backgroundColor (): string | undefined {
      return this.bannerContent?.style?.background_color;
    },
    textColor (): string | undefined {
      return this.bannerContent?.style?.text_color;
    },
    numbersColor (): string | undefined {
      return this.bannerContent?.style?.numbers_color;
    },
    version (): string | undefined {
      return this.bannerContent?.version;
    },
    description (): string {
      return this.bannerContent?.description || ''
    },
    title (): string {
      return this.bannerContent?.title || ''
    },
    countdownDate (): Date | undefined {
      if (!this.bannerContent?.date) {
        return;
      }

      return new Date(this.bannerContent.date);
    },
    bannerStyle (): Dictionary<string> {
      const style: Dictionary<string> = {};

      if (this.backgroundColor) {
        style['--background-color'] = `#${this.backgroundColor}`;
      }

      if (this.textColor) {
        style['--text-color'] = `#${this.textColor}`;
      }

      if (this.numbersColor) {
        style['--numbers-color'] = `#${this.numbersColor}`;
      }

      return style;
    },
    blackListUrls (): string[] {
      return this.bannerContent?.blacklist_urls || [];
    },
    isBannerWasClosedByUser (): boolean {
      return (
        this.$store.getters['promotionPlatform/lastClosedBannerVersionByUser'] ===
         this.version
      );
    },
    showBanner (): boolean {
      return !!this.bannerContent &&
        this.showOnCurrentPage &&
        (!this.isBannerWasClosedByUser || isServer) &&
        !this.isTimeOver &&
        !this.isDirectivesProcessing;
    },
    showOnCurrentPage (): boolean {
      return this.blackListUrls.every((url) => !this.$route.path.includes(url));
    }
  },
  data () {
    return {
      isNarrow: false,
      isTimeOver: false
    };
  },
  methods: {
    getCountdownTime (): number {
      if (!this.countdownDate) {
        return 0;
      }

      const currentDate = new Date();

      return this.countdownDate.getTime() - currentDate.getTime();
    },
    async initBanner (): Promise<void> {
      if (!this.bannerContent) {
        this.isTimeOver = true;
        return;
      }

      this.isTimeOver = this.getCountdownTime() <= 1000 * startTimeThreshold;
    },
    onCloseButtonClickHandler (): void {
      if (!this.version) {
        return;
      }

      this.setLastClosedBannerVersionByUser(this.version);
    },
    onTimerStopped (): void {
      this.isTimeOver = true;
    },
    onToggleViewButtonClickHandler (): void {
      this.isNarrow = !this.isNarrow;
    },
    setLastClosedBannerVersionByUser (version: string): void {
      this.$store.commit(
        `promotionPlatform/${SET_LAST_BANNER_VERSION_CLOSED_BY_USER}`,
        version
      );
    }
  },
  created () {
    this.processDirectivesInText(this.description || '');
    this.initBanner();
  },
  watch: {
    bannerContent: {
      immediate: false,
      handler (val) {
        if (!val) {
          return;
        }

        this.processDirectivesInText(val.description || '');
        this.initBanner();
      }
    } }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

$countdown-banner-background-color: #77b834;
$countdown-banner-text-color: #fff;
$mobile-s: 640px;

.promotion-platform-countdown-banner-wrapper {
  position: relative;
  z-index: 201;

  .promotion-platform-countdown-banner {
    min-width: 320px;

    ._container {
      background-color: var(--background-color, $countdown-banner-background-color);
      height: inherit;
      overflow: hidden;
      position: relative;
      vertical-align: middle;
      width: 100%;
      box-sizing: border-box;

      ._left-column {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-left: 0.5em;
        padding-right: 0.5em;
        width: auto;
      }

      ._title {
        color: var(--text-color, $countdown-banner-text-color);
        font-size: 1.05em;
        line-height: 1.2em;
        margin-bottom: 0.3em;
        margin-top: 0.5em;
        text-align: center;
      }

      ._timer-container {
        margin-top: -5px;
        transform: scale(0.5);
        transform-origin: left;
        width: 142px;
        height: 32px;

        ._timer {
          white-space: nowrap;
        }
      }

      ._content {
        color: var(--text-color, $countdown-banner-text-color);
        font-size: 0.79em;
        margin-top: 0.25em;
        padding: 0.75em;
        text-align: center;
        box-sizing: border-box;

        ::v-deep {
        * {
          margin: 0;
          padding: 0;
        }

        a {
          color: inherit;
          text-decoration: underline;
        }

        ul {
          text-align: left;
          display: inline-block;
          padding: 0 0 0 22px;

          li {
            line-height: 1;
            list-style: disc;

            &+li {
              margin-top: 0.35em;
            }

            &:before {
              top: 0.15em;
            }
          }
        }
      }
      }
    }

    ._timer-btn {
      color: var(--text-color, $countdown-banner-text-color);
      cursor: pointer;
      line-height: 1em;
      position: absolute;
      right: 0.5em;
      top: 0.6em;
      z-index: 99;

      .fa-times {
        position: relative;
        width: 1em;
        height: 1em;
        display: flex;
        align-items: center;

        &:before,
        &:after {
          content: "";
          position: absolute;
          height: 1px;
          width: 100%;
          background: var(--text-color, $countdown-banner-text-color);
        }

        &:before {
          transform: rotate(45deg);
        }

        &:after {
          transform: rotate(-45deg);
        }
      }

      .fa-angle-double-down {
        position: relative;
        width: 0.5em;
        height: 0.5em;
        margin-right: 0.4em;
        transform: translateY(-50%);

        &:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid;
          border-color: var(--text-color, $countdown-banner-text-color);
          border-top: none;
          border-right: none;
          transform: rotate(-45deg);
        }
      }
    }

    ._close-btn {
      display: none;
    }

    ._view-toggle-btn {
      .fa-angle-double-down,
      ._btn-text {
        display: none;
      }

      ._btn-text {
        font-size: 0.8em;
      }
    }
  }

  &.-narrow {
    ._container {
      padding-right: 6em;

      ._left-column {
        flex-direction: row;
      }

      ._timer-container,
      ._content {
        display: none;
      }

      ._view-toggle-btn {
        .fa-times {
          display: none;
        }

        .fa-angle-double-down,
        ._btn-text {
          display: inline-block;
        }
      }
    }
  }

  @media (min-width: $mobile-s) {
    .promotion-platform-countdown-banner {
      ._container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 0.5em 0;

        ._title {
          font-size: 1.2em;
        }

        ._content {
          max-width: 50%;
          padding: 0 2.5em 0 1em;
          text-align: left;
          font-size: 0.9em;
        }

        ._timer-btn {
          top: auto;
        }
      }
    }

    &.-narrow {
      ._container {
        ._timer-container {
          display: block;
          padding-left: 1em;
        }
      }
    }
  }

  @media (min-width: 820px) {
    .promotion-platform-countdown-banner {
      ._container {
        justify-content: center;

        ._left-column {
          flex-direction: row;
          text-align: right;
        }

        ._timer-container {
          transform: scale(0.75);
          transform-origin: center;
          width: auto;
          min-width: 274px;
        }

        ._timer-btn {
          right: 1em;
        }

        ._close-btn {
          display: block;
        }

        ._view-toggle-btn {
          display: none;
        }
      }
    }

    &.-narrow {
      ._container {
        ._timer-container {
          display: block;
          padding-left: 1em;
        }

        ._content {
          display: block;
        }
      }
    }
  }

  @include for-desktop {
    .promotion-platform-countdown-banner {
      ._container {
        ._title {
          padding-right: 1em;
        }

        ._timer-container {
          transform: scale(1);
          margin-top: -10px;
        }

        ._content {
          padding-left: 1em;
        }
      }
    }
  }
}
</style>
