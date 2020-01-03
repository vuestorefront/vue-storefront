<template>
  <div>
    <div v-if="openStatusData" class="color-green">
      <p> {{ $t('Open Today:') }} {{ tConvert(openStatusData.openTime) }} - {{ tConvert(openStatusData.closeTime) }} </p>
    </div>
    <div v-if="!openStatusData">
      <p>
        {{ $t('open time not available') }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    regularHours: {
      type: Object
    }
  },
  data: function () {
    return {
      openStatusData: {}
    }
  },
  mounted () {
    let days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    let date = new Date();
    let dayName = days[date.getDay()];
    this.openStatusData = this.regularHours.periods.find(period => period.openDay === dayName);
  },
  methods: {
    tConvert (time) {
      if (time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
          time = time.slice(1); // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
      }
    }
  }

}
</script>

<style  lang="scss" scoped>
@import "~theme/css/variables/grid";
.color-green {
  color: green;
}
</style>
