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
      v-html="bannerContent"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Dictionary } from 'src/modules/budsies';

import CampaignContent from '../types/CampaignContent.model';
import { SET_LAST_BANNER_VERSION_CLOSED_BY_USER } from '../types/StoreMutations';

import Timer from './Timer.vue';

export default Vue.extend({
  computed: {
    blackListUrls (): string[] {
      if (
        !this.campaignContent ||
        !this.campaignContent.countdownBannerBlacklistUrls
      ) {
        return [];
      }

      return this.campaignContent.countdownBannerBlacklistUrls;
    },
    showBanner (): boolean {
      if (this.getCountdownTime() <= 0) {
        return false;
      }

      return !this.isBannerWasClosedByUser && this.getShouldShowOnPage();
    },
    isBannerWasClosedByUser (): boolean {
      return (
        this.$store.getters[
          'promotionPlatform/lastClosedBannerVersionByUser'
        ] === this.version
      );
    },
    bannerContent (): string | undefined {
      if (
        !this.campaignContent ||
        !this.campaignContent.countdownBannerContent
      ) {
        return;
      }

      return this.campaignContent.countdownBannerContent;
    },
    campaignContent (): CampaignContent | undefined {
      return this.$store.getters['promotionPlatform/campaignContent'];
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
    }
  },
  data () {
    return {
      timerInstance: undefined as undefined | Vue,
      countdownDate: undefined as undefined | Date,
      version: undefined as undefined | string,
      backgroundColor: undefined as undefined | string,
      numbersColor: undefined as undefined | string,
      textColor: undefined as undefined | string,
      fOnCloseButtonClickHandler: undefined as (() => void) | undefined,
      fOnToggleViewButtonClickHandler: undefined as (() => void) | undefined,
      isNarrow: false
    };
  },
  methods: {
    addButtonsClickListeners (): void {
      const closeButton = this.getCloseButtonElement();
      const toggleViewButton = this.getToggleViewButtonElement();

      this.removeButtonsClickHandlers();

      if (closeButton) {
        this.fOnCloseButtonClickHandler =
          this.onCloseButtonClickHandler.bind(this);
        closeButton.addEventListener('click', this.fOnCloseButtonClickHandler);
      }

      if (toggleViewButton) {
        this.fOnToggleViewButtonClickHandler =
          this.onToggleViewButtonClickHandler.bind(this);
        toggleViewButton.addEventListener(
          'click',
          this.fOnToggleViewButtonClickHandler
        );
      }
    },
    fillData () {
      const bannerElement = this.getBannerElement();
      if (!bannerElement) {
        return;
      }

      this.backgroundColor = bannerElement.dataset.backgroundColor;
      this.numbersColor = bannerElement.dataset.numbersColor;
      this.textColor = bannerElement.dataset.textColor;

      this.version = bannerElement.dataset.version;
      if (bannerElement.dataset.countdownDate) {
        this.countdownDate = new Date(bannerElement.dataset.countdownDate);
      }
    },
    getBannerContainer (): HTMLElement | undefined {
      return this.$refs.container as HTMLElement | undefined;
    },
    getBannerElement (): HTMLElement | null {
      const bannerContainer = this.getBannerContainer();

      if (!bannerContainer) {
        return null;
      }

      return bannerContainer.querySelector(
        '.promotion-platform-countdown-banner'
      );
    },
    getShouldShowOnPage (): boolean {
      return this.blackListUrls.every((url) => !this.$route.path.includes(url));
    },
    initTimer (): void {
      const bannerElement = this.getBannerElement();
      if (!bannerElement) {
        return;
      }

      const timer = bannerElement.querySelector('._timer-container ._timer');
      if (!timer) {
        return;
      }

      this.timerInstance = new Vue({
        el: timer,
        render: (h) =>
          h(Timer, { props: { countdownTime: this.getCountdownTime() } })
      });
    },
    getCloseButtonElement (): HTMLElement | null {
      const bannerElement = this.getBannerElement();

      if (!bannerElement) {
        return null;
      }

      return bannerElement.querySelector('._timer-btn._close-btn');
    },
    getToggleViewButtonElement (): HTMLElement | null {
      const bannerElement = this.getBannerElement();

      if (!bannerElement) {
        return null;
      }

      return bannerElement.querySelector('._timer-btn._view-toggle-btn');
    },
    getCountdownTime (): number {
      if (!this.countdownDate) {
        return 0;
      }

      return this.countdownDate.getTime() - Date.now();
    },
    onCloseButtonClickHandler (): void {
      if (!this.version) {
        return;
      }

      this.setlastClosedBannerVersionByUser(this.version);
      this.removeButtonsClickHandlers();
    },
    onToggleViewButtonClickHandler (): void {
      this.isNarrow = !this.isNarrow;
    },
    removeButtonsClickHandlers (): void {
      const closeButton = this.getCloseButtonElement();
      const toggleViewButton = this.getToggleViewButtonElement();

      if (closeButton && this.fOnCloseButtonClickHandler) {
        closeButton.removeEventListener(
          'click',
          this.fOnCloseButtonClickHandler
        );
      }

      if (toggleViewButton && this.fOnToggleViewButtonClickHandler) {
        toggleViewButton.removeEventListener(
          'click',
          this.fOnToggleViewButtonClickHandler
        );
      }
    },
    setlastClosedBannerVersionByUser (version: string): void {
      this.$store.commit(
        `promotionPlatform/${SET_LAST_BANNER_VERSION_CLOSED_BY_USER}`,
        version
      );
    }
  },
  watch: {
    async bannerContent (val) {
      if (!val) {
        return;
      }

      await this.$nextTick();

      this.fillData();
      this.addButtonsClickListeners();
      this.initTimer();
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

$countdown-banner-background-color: #77b834;
$countdown-banner-text-color: #fff;
$countdown-banner-numbers-color: #000;

.promotion-platform-countdown-banner-wrapper {
  position: sticky;
  top: 0;
  z-index: 10;

  ::v-deep {
    .promotion-platform-countdown-banner {
      min-width: 320px;

      ._container {
        background-color: $countdown-banner-background-color;
        background-color: var(--background-color);
        height: inherit;
        overflow: hidden;
        position: relative;
        vertical-align: middle;
        width: 100%;

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
          color: $countdown-banner-text-color;
          color: var(--text-color);
          font-size: 1.2em;
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

          ._timer {
            white-space: nowrap;
          }
        }

        ._content {
          color: $countdown-banner-text-color;
          color: var(--text-color);
          font-size: 0.9em;
          margin-top: 0.25em;
          padding: 0.75em;
          text-align: center;

          * {
            margin: 0;
            padding: 0;
          }

          ul {
            text-align: left;
            display: inline-block;

            li {
              line-height: 1;
              list-style: disc;

              & + li {
                margin-top: 0.35em;
              }

              &:before {
                top: 0.15em;
              }
            }
          }
        }

        ._timer-btn {
          color: $countdown-banner-text-color;
          color: var(--text-color);
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
              background: $countdown-banner-text-color;
              background: var(--text-color);
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
              border-color: $countdown-banner-text-color;
              border-color: var(--text-color);
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
    }
  }

  &.-narrow {
    ::v-deep {
      ._container {
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
  }

  @media (min-width: $tablet-min) {
    ::v-deep {
      .promotion-platform-countdown-banner {
        ._container {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          padding: 0.5em 0;

          ._content {
            max-width: 50%;
            padding: 0 2.5em 0 1em;
            text-align: left;
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
  }

  @media (min-width: 820px) {
    ::v-deep {
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
    }
  }

  @include for-desktop {
    ::v-deep {
      .promotion-platform-countdown-banner {
        ._container {
          ._title {
            padding-right: 1em;
          }

          ._timer-container {
            margin-top: -10px;
            transform: scale(1);
            margin-right: 15px;
          }

          ._content {
            padding-left: 1em;
          }
        }
      }
    }
  }
}
</style>
