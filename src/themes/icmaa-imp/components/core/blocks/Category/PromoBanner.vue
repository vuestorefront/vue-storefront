<template>
  <div v-if="promo" class="t-flex t-items-center t-h-6 t-text-xxs t-uppercase t-text-white lg:t-h-8 lg:t-text-xs" :class="[ background ? ' t-px-2' : 't-font-bold t-bg-base-light' ]" :style="background">
    <template v-if="!background">
      <retina-image :image="`/assets/catalog/promo-flags/${promo.key}.png`" :alt="promo.label" class="t-blend-hard-light" />
    </template>
    <template v-else>
      {{ discount || promo.label }}
    </template>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'
import i18n from '@vue-storefront/i18n'

export default {
  name: 'PromoBanner',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    RetinaImage
  },
  data () {
    return {
      map: [
        { id: '1', key: 'exclusive', label: i18n.t('Exclusive'), background: '#B18C3E' },
        { id: '3', key: 'american_apparel', label: 'American Apparel', background: null },
        { id: '5', key: 'preorder', label: i18n.t('Preorder'), background: '#611222' },
        { id: '6', key: 'special_offer', label: i18n.t('Special Offer'), background: '#64BCAC' },
        { id: '7', key: 'special_offer', label: i18n.t('Special Offer'), background: '#64BCAC' },
        { id: '8', key: 'artery', label: 'Artery', background: null },
        { id: '9', key: 'sumerian', label: 'Sumerian Records', background: null },
        { id: '10', key: 'deathwish', label: 'Deathwish', background: null },
        { id: '11', key: 'continental', label: 'Continental', background: null },
        { id: '12', key: 'purenoise', label: 'Pure Noise', background: null },
        { id: '13', key: 'limited', label: i18n.t('Limited'), background: '#023AE1' },
        { id: '14', key: 'backprint', label: i18n.t('Backprint'), background: '#551D99' },
        { id: '', key: 'sale', label: i18n.t('Sale'), background: '#006EA1' },
        { id: '', key: 'new', label: i18n.t('New'), background: '#1AC759' }
      ]
    }
  },
  computed: {
    promoId () {
      return this.product.promo_id
    },
    promo () {
      if (this.product.special_price && parseFloat(this.product.special_price) > 0) {
        return this.map.find(v => v.key === 'sale')
      }

      const newRange = dayjs(this.product.online).isAfter(dayjs().subtract(14, 'days'))
      const isNew = newRange ? this.map.find(v => v.key === 'new') : undefined

      return this.map.find(v => v.id === this.promoId) || isNew || false
    },
    discount () {
      const original = this.product.original_price_incl_tax
      const special = this.product.price_incl_tax
      if (this.promo.key === 'sale' && special < original) {
        return '–' + (100 - parseInt(special * 100 / original)) + '%'
      }

      return false
    },
    background () {
      let { background } = this.promo
      return background && background.startsWith('#') ? { background } : false
    }
  }
}
</script>
