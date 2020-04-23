<template>
  <div class="t-mt-4 t--mb-8 t--mx-8 t-bg-base-tone t-px-8 t-py-4 t-text-sm t-text-white">
    <material-icon icon="alarm" size="sm" class="t--ml-6 t-absolute" />
    <span class="t-font-bold">{{ $t('Notice') }}: </span>
    <span class="description" v-text="preorderText" />
  </div>
</template>

<script>
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import { toDate } from 'icmaa-config/helpers/datetime'
import i18n from '@vue-storefront/i18n'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    MaterialIcon
  },
  computed: {
    preorderText () {
      if (this.hasMediaReleaseDate) {
        return i18n.t('Delivery of your complete order not before {date}. The preorder date is the release date for Germany, as we were told by the record label or distributor. There is no guarantee for a delivery on that date. In exceptional cases, especially for imported products, there might be delays. As soon as we receive the article, we will ship it.', { date: this.mediaReleaseDate })
      }
      return i18n.t('Delivery of your complete order not before official release. The preorder date is the release or delivery date for Germany, as we were told by the record label,the producer or the shipping company. There is no guarantee for a delivery on that date. In exceptional cases, especially for US imported products, there might be delays. As soon as we receive the article, we will ship it.')
    },
    hasMediaReleaseDate () {
      return this.product.media_release || false
    },
    mediaReleaseDate () {
      return toDate(this.product.media_release)
    }
  }
}
</script>
