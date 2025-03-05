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

          <div class="_content" v-html="description" />

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
import Vue from 'vue';

import { isServer } from '@vue-storefront/core/helpers';
import { Dictionary } from 'src/modules/budsies';

import { CampaignContent } from '../types/CampaignContent.interface';
import { SET_LAST_BANNER_VERSION_CLOSED_BY_USER } from '../types/StoreMutations';

import Timer from './Timer.vue';
import { CountdownBanner } from '../types/CountdownBanner.interface';

const startTimeThreshold = 1;

export default Vue.extend({
  components: {
    CountdownTimer: Timer
  },
  computed: {
    bannerContent (): CountdownBanner | undefined {
      return this.campaignContent?.countdown;
    },
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
      return !!this.bannerContent && this.showOnCurrentPage && (!this.isBannerWasClosedByUser || isServer) && !this.isTimeOver;
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
    this.initBanner();
  },
  watch: {
    bannerContent: {
      immediate: false,
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
