<template>
  <div class="promotion-platform-banner-timer">
    <div class="_number-group-container -days">
      <div class="_number-group">
        <timer-numbers-group class="_group-value" :value="days[0]" />
        <timer-numbers-group class="_group-value" :value="days[1]" />
      </div>

      <div class="_caption">
        days
      </div>
    </div>

    <div class="_number-group-container">
      <div class="_number-group">
        <timer-numbers-group class="_group-value" :value="hours[0]" />
        <timer-numbers-group class="_group-value" :value="hours[1]" />
      </div>

      <div class="_caption">
        hours
      </div>
    </div>

    <span>:</span>

    <div class="_number-group-container">
      <div class="_number-group">
        <timer-numbers-group class="_group-value" :value="minutes[0]" />
        <timer-numbers-group class="_group-value" :value="minutes[1]" />
      </div>

      <div class="_caption">
        minutes
      </div>
    </div>

    <span>:</span>

    <div class="_number-group-container">
      <div class="_number-group">
        <timer-numbers-group class="_group-value" :value="seconds[0]" />
        <timer-numbers-group class="_group-value" :value="seconds[1]" />
      </div>

      <div class="_caption">
        seconds
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import TimerNumbersGroup from './TimerNumbersGroup.vue';

const _seconds = 1000;
const minutes = _seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

export default Vue.extend({
  components: {
    TimerNumbersGroup
  },
  props: {
    countdownTime: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      days: [0, 0],
      hours: [0, 0],
      minutes: [0, 0],
      seconds: [0, 0],
      intervalId: undefined as undefined | number,
      time: undefined as undefined | number,
      fUpdateTimerData: undefined as (() => void) | undefined
    }
  },
  created () {
    this.time = this.countdownTime;
  },
  mounted () {
    this.startTimer();
  },
  beforeDestroy () {
    this.stopTimer();
  },
  methods: {
    getArrayOfNumbers (value: number): number[] {
      const array = value.toString(10).split('');

      if (array.length < 2) {
        return [0, Number.parseInt(array[0], 10)];
      }

      return array.map((number) => Number.parseInt(number, 10))
    },
    getDays (): number {
      if (!this.time) {
        return 0;
      }

      return Math.floor(this.time / days);
    },
    getHours (daysCount: number): number {
      if (!this.time) {
        return 0;
      }

      return Math.floor((this.time - daysCount * days) / hours);
    },
    getMinutes (daysCount: number, hoursCount: number): number {
      if (!this.time) {
        return 0;
      }

      return Math.floor((this.time - daysCount * days - hoursCount * hours) / minutes);
    },
    getSeconds (daysCount: number, hoursCount: number, minutesCount: number): number {
      if (!this.time) {
        return 0;
      }

      return Math.round(((this.time - daysCount * days - hoursCount * hours - minutesCount * minutes) / _seconds))
    },
    startTimer (): void {
      if (this.intervalId) {
        return;
      }

      this.updateTimerData();
      this.fUpdateTimerData = this.updateTimerData.bind(this);

      this.intervalId = window.setInterval(this.fUpdateTimerData, 1000);
    },
    stopTimer (): void {
      if (!this.intervalId || !this.fUpdateTimerData) {
        return;
      }

      window.clearInterval(this.intervalId);
    },
    updateTimerData (): void {
      if (!this.time) {
        return;
      }

      this.time -= _seconds;

      const days = this.getDays();
      const hours = this.getHours(days);
      const minutes = this.getMinutes(days, hours);
      const seconds = this.getSeconds(days, hours, minutes);

      this.days = this.getArrayOfNumbers(days);
      this.hours = this.getArrayOfNumbers(hours);
      this.minutes = this.getArrayOfNumbers(minutes);
      this.seconds = this.getArrayOfNumbers(seconds);

      if (this.time <= 0) {
        this.stopTimer();
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.promotion-platform-banner-timer {
  display: flex;
  font-family: Tahoma, Verdana, Aial, sans-serif;
  font-size: 32px;
  line-height: 108%;
  font-weight: bold;
  height: 32px;

  ._number-group-container {
    display: flex;
    flex-direction: column;

    ._number-group {
      display: inline-flex;
      margin-bottom: 6px;

      ._group-value {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 33px;
        border-top: 1px solid silver;
        border-right: 1px solid silver;
        border-bottom: 1px solid silver;
        overflow: hidden;

        &:first-child {
          border-left: 1px solid silver;
        }
      }
    }

    ._caption {
      text-align: center;
      font-size: 9px;
      line-height: 80%;
      font-weight: normal;
      color: #fff;
    }

    &.-days {
      margin-right: 0.4em;
    }
  }
}
</style>
