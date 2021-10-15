<template>
  <div class="promotion-platform-countdown-banner-wrapper">
    <div
      class="promotion-platform-countdown-banner-container"
      :style="bannerStyle"
      ref="container"
      v-html="bannerContent"
    />
  </div>
</template>

<script lang="ts">

/*
data-countdown-date="2021-10-15 03:59:00"
data-background-color="f7acb7"
data-numbers-color="535353"
data-text-color="FFFFFF"
data-version="2021-09-13 09:39:58"
data-id="29"
class="promotion-platform-countdown-banner -visible"
style="--background-color:#f7acb7;
--numbers-color:#535353;
--text-color:#FFFFFF;"
*/
import { Dictionary } from 'src/modules/budsies';
import Vue from 'vue';

import Timer from './Timer.vue';

export default Vue.extend({
  computed: {
    showBanner (): boolean {
      if (!this.countdownDate || this.countdownDate <= new Date()) {
        return false;
      }

      return !this.isBannerWasClosedByUser;
    },
    isBannerWasClosedByUser (): boolean {
      return this.$store.getters['promotionPlatform/lastClosedByUserBannerVersion'] === this.version;
    },
    bannerContent (): string {
      return `<div data-countdown-date='2021-10-15 03:59:00' data-background-color='f7acb7' data-numbers-color='535353' data-text-color='FFFFFF' data-version='2021-09-13 09:39:58' data-id='29' class='promotion-platform-countdown-banner'>
  <div class='_container'>
    <div class='_left-column'>
      <h2 class='_title'>
        Labor Day Savings!      </h2>
      <div class='_timer-container'>
        <div class='_timer'>
        </div>
      </div>
    </div>
    <div class='_content'>
      <ul class="-with-markers">
<li><span style="color: #ffffff;"><strong class="-with-markers">Get FREE Shipping on all Petsies Products</strong></span></li>
<li><span style="color: #ffffff;"><strong class="-with-markers">Use code: LABORDAYSHIP during checkout</strong></span></li>
<li><span style="color: #ffffff;"><strong class="-with-markers">Deal ends 8/6/21 at 11:59 PM EST</strong></span></li>
</ul>    </div>
    <div class='_timer-btn _close-btn'>
      <i class='fa fa-times'>
      </i>
    </div>
    <div class='_timer-btn _view-toggle-btn'>
      <i class='fa fa-times'>
      </i>
      <i class='fa fa-angle-double-down'>
      </i>
      <div class='_btn-text'>
        More Info
      </div>
    </div>
  </div>
</div>` // TODO mock
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
      textColor: undefined as undefined | string
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fillData();

      this.initTimer();
    })
  },
  methods: {
    fillData () {
      const bannerElement = this.getBannerElement();
      if (!bannerElement) {
        return;
      }

      this.backgroundColor = bannerElement.dataset.backgroundColor;
      this.numbersColor = bannerElement.dataset.numbersColor;
      this.textColor = bannerElement.dataset.textColor;

      this.version = bannerElement.dataset.version;
    },
    getBannerContainer (): HTMLElement | undefined {
      return this.$refs.container as HTMLElement | undefined;
    },
    getBannerElement (): HTMLElement | null {
      const bannerContainer = this.getBannerContainer();

      if (!bannerContainer) {
        return null;
      }

      return bannerContainer.querySelector('.promotion-platform-countdown-banner');
    },
    initTimer (): void {
      console.log('init');

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
        render: (h) => h(Timer)
      })
    }
  }
})
</script>

<style lang="scss">
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.promotion-platform-countdown-banner {
  min-width: 320px;

  $countdown-banner-background-color: #77b834;
  $countdown-banner-text-color: #fff;
  $countdown-banner-numbers-color: #000;

  .timeTo {
    figcaption {
      color: $countdown-banner-text-color;
      color: var(--text-color);
      line-height: 0.5;
    }

    div {
      color: $countdown-banner-numbers-color;
      color: var(--numbers-color);
    }

    ul {
      li {
        line-height: 1.05;
      }
    }

    span {
      color: $countdown-banner-numbers-color;
      color: var(--numbers-color);
    }
  }

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
      font-size: 1em;
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
      // @extend %formatted-text-block;

      color: $countdown-banner-text-color;
      color: var(--text-color);
      font-size: 0.75em;
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
      top: 0.5em;
      z-index: 99;
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

  @media (min-width: $tablet-min) {
    ._container {
      display: flex;
      justify-content: center;
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
    ._container {
      justify-content: center;

      ._left-column {
        flex-direction: row;
        text-align: right;
      }

      ._title {
        font-size: 2em;
      }

      ._timer-container {
        transform: scale(0.75);
        transform-origin: center;
        width: auto;
      }

      ._content {
        font-size: 0.8em;
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

  @include for-desktop {
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
</style>
