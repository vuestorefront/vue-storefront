<template>
  <div class="newsletter py25 px15 bg-cl-secondary">
    <div class="container">
      <div class="newsletter-content m0 row middle-sm start-md">
        <div class="col-md-9 col-xs-12">
          <h3 class="h3 cl-accent weight-400 m0">
            {{ $t('Subscribe to the newsletter and receive a coupon for 10% off') }}
          </h3>
        </div>
        <div class="newsletter-button col-md-3 col-xs-12 end-md">
          <button-outline
            @click.native="$bus.$emit('modal-show', 'modal-newsletter')"
            color="dark"
            data-testid="openNewsletterButton"
          >
            {{ $t('Subscribe') }}
          </button-outline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Newsletter from '@vue-storefront/core/components/blocks/Footer/Newsletter'
import ButtonOutline from 'theme/components/theme/ButtonOutline'

export default {
  mixins: [Newsletter],
  components: {
    ButtonOutline
  }
}
</script>

<style scoped>
  @media (max-width: 1023px) {
    .newsletter-button {
      padding-top: 25px;
      text-align: center;
    }
  }

  @media (max-width: 767px) {
    .h3 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>
