<template>
  <div class="row current-location">
    <div class="col-md-12 flex text-center pointer" @click="getCurrentLocation">
      <i class="material-icons  cl-accent location-icon">location_on</i>
      <h4 class="m0">
        <u>  {{ $t('Use my current location') }} </u>
      </h4>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    getCurrentLocation () {
      // TODO : will implement in next release
    }
  }
}
</script>

<style  lang="scss" scoped>
@import "~theme/css/variables/grid";

    .text-center{
        justify-content: center;
    }
    .current-location {
        margin-top:20px;
        padding: 0 40px;
        @media (max-width: 767px) {
            margin-top:20px;
            padding:0 10px;
        }
    }

    .location-icon {
        font-size:18px;
        padding-right: 5px;
    }

</style>
