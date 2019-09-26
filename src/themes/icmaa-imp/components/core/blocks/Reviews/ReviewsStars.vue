<template>
  <span class="t-text-reset">
    <material-icon v-for="(star,i) in stars" :key="i" :icon="star" :size="starsSize" :class="{ 't-text-alt-2': !starsColor && star !== 'star_border', [starsColor]: starsColor }" />
  </span>
</template>

<script>
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'ReviewsStars',
  components: {
    MaterialIcon
  },
  props: {
    rating: {
      type: Number,
      required: true
    },
    maxRating: {
      type: Number,
      default: 5
    },
    starsSize: {
      type: String,
      default: 'sm'
    },
    starsColor: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
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
