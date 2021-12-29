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

const startTimeThreshold = 1;

export default Vue.extend({
  computed: {
    bannerContent (): string | undefined {
      if (
        !this.campaignContent ||
        !this.campaignContent.countdownBannerContent
      ) {
        return;
      }

      return this.campaignContent.countdownBannerContent;
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
      if (
        !this.campaignContent ||
        !this.campaignContent.countdownBannerBlacklistUrls
      ) {
        return [];
      }

      return this.campaignContent.countdownBannerBlacklistUrls;
    },
    campaignContent (): CampaignContent | undefined {
      return this.$store.getters['promotionPlatform/campaignContent'];
    },
    isBannerWasClosedByUser (): boolean {
      return (
        this.$store.getters['promotionPlatform/lastClosedBannerVersionByUser'] ===
         this.version
      );
    },
    showBanner (): boolean {
      return this.showOnCurrentPage && !this.isBannerWasClosedByUser && !this.isTimeOver;
    },
    showOnCurrentPage (): boolean {
      return this.blackListUrls.every((url) => !this.$route.path.includes(url));
    }
  },
  data () {
    return {
      timerParentInstance: undefined as undefined | Vue,
      countdownDate: undefined as undefined | Date,
      version: undefined as undefined | string,
      backgroundColor: undefined as undefined | string,
      numbersColor: undefined as undefined | string,
      textColor: undefined as undefined | string,
      fOnCloseButtonClickHandler: undefined as (() => void) | undefined,
      fOnToggleViewButtonClickHandler: undefined as (() => void) | undefined,
      isNarrow: false,
      isTimeOver: false
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
    addTimerInstanceEventListeners (): void {
      const timerInstance = this.getTimerInstance();
      if (!timerInstance) {
        return;
      }

      timerInstance.$on('timer-stopped', this.onTimerStopped);
    },
    destroyTimerParentInstance (): void {
      if (!this.timerParentInstance) {
        return;
      }

      this.removeTimerInstanceEventListeners();
      this.timerParentInstance.$destroy();
      this.timerParentInstance = undefined;
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

      this.isTimeOver = this.getCountdownTime() <= 1000 * startTimeThreshold;
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
    getCloseButtonElement (): HTMLElement | null {
      const bannerElement = this.getBannerElement();

      if (!bannerElement) {
        return null;
      }

      return bannerElement.querySelector('._timer-btn._close-btn');
    },
    getCountdownTime (): number {
      if (!this.countdownDate) {
        return 0;
      }

      const currentDate = new Date();

      return this.countdownDate.getTime() - currentDate.getTime();
    },
    getTimerInstance (): InstanceType<typeof Timer> | undefined {
      if (!this.timerParentInstance) {
        return;
      }

      return (this.timerParentInstance.$children[0] as InstanceType<typeof Timer> | undefined);
    },
    getToggleViewButtonElement (): HTMLElement | null {
      const bannerElement = this.getBannerElement();

      if (!bannerElement) {
        return null;
      }

      return bannerElement.querySelector('._timer-btn._view-toggle-btn');
    },
    async initBanner (): Promise<void> {
      await this.$nextTick();

      this.fillData();

      if (this.isBannerWasClosedByUser || this.isTimeOver) {
        return;
      }

      this.addButtonsClickListeners();
      this.initTimer();
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

      this.timerParentInstance = new Vue({
        el: timer,
        render: (h) =>
          h(Timer, { props: { countdownTime: this.getCountdownTime() } })
      });

      this.addTimerInstanceEventListeners();
    },
    onCloseButtonClickHandler (): void {
      if (!this.version) {
        return;
      }

      this.setLastClosedBannerVersionByUser(this.version);
      this.removeButtonsClickHandlers();
      this.destroyTimerParentInstance();
    },
    onTimerStopped (): void {
      this.isTimeOver = true;
      this.removeButtonsClickHandlers();
      this.destroyTimerParentInstance();
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
    removeTimerInstanceEventListeners (): void {
      const timerInstance = this.getTimerInstance();
      if (!timerInstance) {
        return;
      }

      timerInstance.$off('timer-stopped', this.onTimerStopped);
    },
    setLastClosedBannerVersionByUser (version: string): void {
      this.$store.commit(
        `promotionPlatform/${SET_LAST_BANNER_VERSION_CLOSED_BY_USER}`,
        version
      );
    }
  },
  watch: {
    bannerContent: {
      immediate: true,
      handler (val) {
        if (!val) {
          return;
        }

        this.initBanner();
      }
    } }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

$countdown-banner-background-color: #77b834;
$countdown-banner-text-color: #fff;
$countdown-banner-numbers-color: #000;
$mobile-s: 640px;

.promotion-platform-countdown-banner-wrapper {
  position: relative;
  z-index: 201;

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
          color: $countdown-banner-text-color;
          color: var(--text-color);
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

          ._timer {
            white-space: nowrap;
          }
        }

        ._content {
          color: $countdown-banner-text-color;
          color: var(--text-color);
          font-size: 0.79em;
          margin-top: 0.25em;
          padding: 0.75em;
          text-align: center;
          box-sizing: border-box;

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
  }

  @media (min-width: $mobile-s) {
    ::v-deep {
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
    }

    &.-narrow {
      ::v-deep {
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

    &.-narrow {
      ::v-deep {
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
