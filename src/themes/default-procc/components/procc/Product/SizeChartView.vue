<template>
  <div class="pt-1 pb-1 w-100 h-100 justify-content-center" style="z-index: auto"
       @click.stop.prevent=""
  >
    <div class="w-100 h-auto">
      <div v-if="size_chart_loading" style="min-height: 10rem">
        <label class="margin-auto mt-4"
               style="padding-top: 15%!important;"
               :animation-duration="4000"
               :dot-size="16"
               :dots-num="4"
               color="#23CCEF"
        />
      </div>
      <div v-else>
        <table class="table grey-table table-striped text-align-center" v-if="size_chart_data && size_chart_data != null && size_chart_data != '' && size_chart_data.columns"
               :class="{invisible: (!size_chart_data || size_chart_loading)}"
        >
          <thead>
            <tr>
              <th v-if="product_data && product_data.available_quantity && Object.keys(product_data.available_quantity).length > 0"
                  scope="col" class="text-align-center"
              >
                {{ $t("qty") }}
              </th>
              <th scope="col" class="text-align-center">
                {{ $t("size") }}
              </th>
              <th scope="col" class="text-align-center">
                {{ $t("bust") }}
              </th>
              <th scope="col" class="text-align-center">
                {{ $t("waist") }}
              </th>
              <th scope="col" class="text-align-center">
                {{ $t("hip") }}
              </th>
              <th scope="col" class="text-align-center">
                {{ $t("length") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(size, index) in size_chart_data.columns" :key="index">
              <th v-if="product_data && product_data.available_quantity && Object.keys(product_data.available_quantity).length > 0"
                  class="text-align-center" scope="row"
              >
                {{ getSizeQuantity(size.size_name) }}
              </th>
              <th class="text-align-center" scope="row">
                {{ size.size_name }}
              </th>
              <td class="text-align-center">
                {{ size.bust }} cm
              </td>
              <td class="text-align-center">
                {{ size.waist }} cm
              </td>
              <td class="text-align-center">
                {{ size.hip }} cm
              </td>
              <td class="text-align-center">
                {{ size.length }} cm
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center no-data">
          <strong>{{ $t("noData") }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'SizeChartView',
  components: {
  },
  props: {
    product: {
      type: [String, Number, Array, Object],
      default: ''
    }
  },
  data () {
    return {
      product_data: {},
      size_chart_data: {},
      size_chart_loading: true
    }
  },
  created () {
    this.getSizeChart()
  },
  methods: {
    getSizeQuantity (sizeName) {
      return this.product_data && this.product_data.available_quantity && this.product_data.available_quantity[sizeName] ? this.product_data.available_quantity[sizeName] : 0
    },
    async getSizeChart () {
      try {
        this.size_chart_loading = true
        if (this.product && this.product.product) {
          this.product_data = _.cloneDeep(this.product)
          if (this.product.product && _.isObject(this.product.product)) {
            if (this.product.product._id) {
              this.product_data._id = this.product.product._id
            }
            if (this.product.product.vendor_images && this.product.product.vendor_images[0] && this.product.product.vendor_images[0].thumb) {
              this.product_data.vendor_images = this.product.product.vendor_images
            }
            if (this.product.product.available_quantity) {
              this.product_data.available_quantity = this.product.product.available_quantity
            }
            if (this.product.product && this.product.product.size_chart) {
              this.product_data.size_chart = this.product.product.size_chart
            }
          } else {
            this.product_data._id = this.product.product
          }
        } else {
          this.product_data = _.cloneDeep(this.product)
        }

        let result = await this.ProCcAPI.getSizeChart(this.$props.product.size_chart_id, this.$props.product.procc_brand_id) // product id
        this.size_chart_data = !_.isNull(result.data.sizeChart) ? result.data.sizeChart : {}
        this.$nextTick(() => { this.size_chart_loading = false })
      } catch (e) {
        console.log('getSizeChart Error', e)
      }
    }
  },
  watch: {
    product (newProduct, oldProduct) {
      this.getSizeChart()
    }
  }
}
</script>
<style lang="scss">
.no-data{
  line-height: 60px;
}
</style>
