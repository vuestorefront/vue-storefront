<template>
  <div class="reviews t-text-base-light t-text-sm">
    <material-icon v-for="(star,i) in stars" :key="i" :icon="star" size="xs" class="t-align-text-bottom" :class="{'t-text-alt-2': star !== 'star_border'}" />
    <span>({{ total }})</span>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'ReviewsShort',
  components: {
    MaterialIcon
  },
  props: {
    count: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    maxRating: {
      type: Number,
      default: 5
    }
  },
  computed: {
    total () {
      return this.count + ' ' + (this.count > 1 ? i18n.t('Reviews') : i18n.t('Review'))
    },
    ratingCalculated () {
      return this.rating / 100 * this.maxRating
    },
    stars () {
      let stars = []
      const fullStars = parseInt(this.ratingCalculated)
      const partialStar = Math.round(this.ratingCalculated - fullStars)
      const emptyStars = this.maxRating - fullStars - partialStar

      for (let i = 1; i <= this.maxRating; i++) {
        if (i <= fullStars) {
          stars.push('star')
        } else if (i > fullStars && i <= this.maxRating - emptyStars && partialStar > 0) {
          stars.push('star_half')
        } else if (i > this.ratingCalculated) {
          stars.push('star_border')
        }
      }

      return stars
    }
  }
}
</script>
