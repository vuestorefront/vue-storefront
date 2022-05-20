<template>
  <div class="production-spot-countdown" v-show="showTimer">
    <span class="_text">
      {{ $t('Hurry - save your spot in line!') }}
    </span>

    <span class="_timer">
      {{ formattedTimerValue }}
    </span>
  </div>
</template>

<script lang="ts">
import { InjectType } from 'src/modules/shared';
import Vue, { VueConstructor } from 'vue';

import { CLEAR_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE, SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE, SN_PROMOTION_PLATFORM } from '../types/StoreMutations';

const timerInterval = 1000;
const millisecondsInMinute = 60 * 1000;

interface InjectedServices {
  window: Window
}

export default (Vue as VueConstructor<Vue & InjectedServices>).extend({
  props: {
    canShow: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    window: { from: 'WindowObject' }
  } as unknown as InjectType<InjectedServices>,
  data () {
    return {
      showTimer: false,
      timerValue: 0,
      timerIntervalId: undefined as number | undefined
    }
  },
  computed: {
    expirationMinutesCount (): number {
      const expirationMinutesCount = this.$store.getters['backend-settings/getSettingByCompositeKey']('promotions/productionSpotCountdown/expirationMinutesCount');
      return expirationMinutesCount || 0;
    },
    expirationDate (): number {
      return this.$store.getters[`${SN_PROMOTION_PLATFORM}/productionSpotCountdownExpirationDate`];
    },
    formattedTimerValue (): string {
      const minutes = Math.floor(this.timerValue / 60);
      let seconds: number | string = Math.round(this.timerValue - minutes * 60);

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    }
  },
  created (): void {
    if (!this.getIsTimerCanStart) {
      return;
    }

    this.initAndStartTimer();
  },
  beforeDestroy (): void {
    this.stopTimer();
  },
  methods: {
    getIsExpired (): boolean {
      return !!this.expirationDate && this.expirationDate <= Date.now();
    },
    getIsTimerCanStart (): boolean {
      return !!this.expirationMinutesCount && this.canShow;
    },
    initAndStartTimer (): void {
      if (!this.expirationDate) {
        this.setExpirationDate();
      }

      if (this.getIsExpired()) {
        return;
      }

      this.initTimerData();

      if (!this.canShow) {
        this.clearExpirationDate();
        return;
      }

      this.startTimer();
    },
    initTimerData (): void {
      this.timerValue = (this.expirationDate - Date.now()) / 1000;
    },
    setExpirationDate (): void {
      const expirationDate = Date.now() + this.expirationMinutesCount * millisecondsInMinute;
      this.$store.commit(
        `promotionPlatform/${SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE}`,
        expirationDate
      );
    },
    startTimer (): void {
      this.showTimer = true;

      this.timerIntervalId = this.window.setInterval(() => {
        this.timerValue -= 1;

        if (this.timerValue <= 0) {
          this.stopTimer();
        }
      }, timerInterval)
    },
    stopTimer (): void {
      this.showTimer = false;
      if (!this.timerIntervalId) {
        return;
      }

      clearInterval(this.timerIntervalId);
      this.timerIntervalId = undefined;
    },
    clearExpirationDate (): void {
      this.$store.commit(
        `${SN_PROMOTION_PLATFORM}/${CLEAR_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE}`
      );
    }
  },
  watch: {
    canShow (canShow): void {
      const isExpired = this.getIsExpired();

      if (!canShow) {
        this.stopTimer();

        if (!isExpired) {
          this.clearExpirationDate();
        }
      } else {
        if (!isExpired) {
          this.initAndStartTimer();
        }
      }
    }
  }
});
</script>

<style lang="scss" scoped>
 .production-spot-countdown {
    text-align: center;
    color: var(--c-black);
    font-size: var(--font-lg);
    font-weight: var(--font-bold);
    line-height: 1;

    ._timer {
      color: var(--c-danger);
    }

 }
</style>
