<template>
  <div v-if="product">
    <div class="t-flex t-bg-white">
      <div class="t-w-1/3">
        <router-link :to="productLink" :title="translatedProductName" class="t-block">
          <placeholder ratio="161:233" v-if="imageLoading" />
          <product-image :image="image" :alt="product.name | htmlDecode" data-testid="productImage" @load="imageLoading = false" />
        </router-link>
      </div>
      <div class="t-flex-1 t-flex t-flex-col t-justify-center t-p-4">
        <div class="t-mb-2 t-leading-tight">
          <router-link :to="productLink" v-text="translatedProductName" class="t-text-sm t-text-primary" />
        </div>
        <div v-if="options.length > 0" class="t-mb-10">
          <div v-for="(option, i) in options" :key="i" class="t-flex t-items-center">
            <span v-text="option.label + ':'" class="t-text-xs t-mr-2" />
            <button-component type="tag" size="xs" :cursor-pointer="false" v-text="option.value" class="t-mr-2" />
          </div>
        </div>
        <div>
          <button-component type="ghost" icon="delete" icon-position="left" :icon-only="true" :confirm="true" @click="removeAlert">
            {{ $t('Delete') }}
          </button-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'
import i18n from '@vue-storefront/i18n'

import ProductNameMixin from 'icmaa-catalog/mixins/ProductNameMixin'
import Placeholder from 'theme/components/core/blocks/Placeholder'
import ProductImage from 'theme/components/core/ProductImage'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'MyProductsAlertProduct',
  mixins: [ ProductNameMixin ],
  components: {
    Placeholder,
    ProductImage,
    ButtonComponent
  },
  data () {
    return {
      imageLoading: true
    }
  },
  props: {
    stockItemId: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getOptionLabel: 'attribute/getOptionLabel',
      getParentProductByStockItem: 'icmaaProductAlert/getParentProductByStockItem',
      getProducts: 'icmaaProductAlert/getProducts'
    }),
    product () {
      return this.getParentProductByStockItem(this.stockItemId)
    },
    productId () {
      return this.product.id
    },
    childProduct () {
      return this.product.configurable_children.find(el => el.id === this.stockItemId)
    },
    options () {
      const options = []
      this.product.configurable_options.forEach(o => {
        const attributeKey = o.attribute_code
        const label = /size/.test(attributeKey) ? i18n.t('Size') : o.label
        const optionId = this.childProduct[o.attribute_code]
        const value = this.getOptionLabel({ attributeKey, optionId })
        options.push({ label, value })
      })

      return options
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    thumbnail () {
      return this.getThumbnail(this.product.image)
    }
  },
  methods: {
    async removeAlert () {
      await this.$store.dispatch('icmaaProductAlert/removeProductStockAlert', this.stockItemId)
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('You successfully unsupscripted for this stock notification.'),
        action1: { label: i18n.t('OK') }
      })
    }
  }
}
</script>
