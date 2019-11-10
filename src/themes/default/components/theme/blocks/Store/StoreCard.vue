<template>
  <card class="card-user animated fadeIn">
    <div class="row brand-card-cover-div" slot="image">
      <div class="brand-card-cover-image"
           v-lazy:background-image="storeImage.image"
           :alt="$t('noImage')"
      />
    </div>
    <div class="row">
      <div class="author">
        <div class="images">
          <div v-lazy:background-image="storeImage.logo" class="avatar border-gray" />
        </div>
        <h4 class="title">
          {{ storeName }}
        </h4>
      </div>
    </div>
  </card>
</template>
<script>
import Card from 'theme/components/core/Card'

export default {
  components: {
    Card
  },
  mounted () {
    this.getStoreImages()
  },
  methods: {
    async getStoreImages () {
      const storeImages = await import(/* webpackChunkName: "vsf-head-img-[request]" */ `theme/resource/banners/${this.storeCode}_main-image.json`)
      this.storeImage = storeImages.image
    }
  },
  data () {
    return {
      storeImage: {}
    }
  },
  props: {
    storeCode: {
      type: [String],
      required: true
    },
    storeName: {
      type: [String],
      required: true
    }
  }
}
</script>
<style lang="scss">
  .card-user .tooltip-inner {
    padding: 12px !important;
  }

  .brand-card .tooltip-inner.popover-inner {
    background: #ffffff !important;
  }

  .brand-card{
    div.popover-inner{
      padding: 0!important;
    }
  }
  .card-user{
    border-radius: 10px;
    height: 330px;
    div.card-body{
      border-radius: 10px;
      padding-top: 0!important;
      padding-bottom: 0!important;
    }
  }
  .card-image{
    height: 155px!important;
  }

  .brand-card-cover-div{
    height: 10rem;
    .brand-card-cover-image{
      width: 100%;
      height: 155px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 10px;
    }
  }

</style>
