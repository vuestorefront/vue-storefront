<template>
  <div class="competition t-container" v-if="competition">
    <div class="t-px-4 t-pt-4 lg:t-pt-8 t-mb-8">
      <div class="t-flex t-flex-wrap t-items-start lg:t-items-stretch t-mb-8">
        <retina-image :image="image" :alt="competition.headline | stripHTML" class="t-w-full lg:t-w-1/2" />
        <div class="t-w-full lg:t-w-1/2 t-bg-white t-p-8 t-flex t-flex-col t-justify-center">
          <h1 class="t-font-light t-leading-tight t-mb-1 t-mb-8 t-text-3xl t-text-primary lg:t-whitespace-pre-line" v-html="competition.headline" />
          <component :is="description" class="description t-text-sm t-leading-relaxed t-text-base-tone" />
          <div class="t-mt-8">
            <button-component type="ghost" v-scroll-to="'#competition-form'" v-text="competition.buttonText || $t('Participate now!')" />
          </div>
        </div>
      </div>
      <div class="t-flex t-flex-wrap t-mb-8">
        <div class="t-w-full lg:t-w-1/2">
          <div class="t-relative t-w-full t-bg-white" style="padding-top: 56.25%">
            <iframe class="t-absolute t-top-0" width="100%" height="100%" :src="youtubeVideoUrl" frameborder="0" allowfullscreen />
          </div>
        </div>
        <div class="t-w-full lg:t-w-1/2 t-pt-px lg:t-pl-px lg:t-pt-0 t-flex">
          <div class="t-relative t-flex-1 t-bg-white">
            <router-link :to="competition.bannerLink" class="t-flex">
              <retina-image :image="bannerImage" :alt="competition.bannerLinkText | stripHTML" class="t-flex-1 t-self-start" />
            </router-link>
            <router-link :to="competition.bannerLink" class="t-flex t-items-center t-w-full lg:t-absolute lg:t-bottom-0 t-bg-white t-p-4 lg:t-px-6 lg:t-py-8 t-text-primary t-text-xl">
              <span v-text="competition.bannerLinkText" class="t-flex-1" />
              <material-icon icon="keyboard_arrow_right" size="lg" class="t-text-base-lighter t-ml-2" />
            </router-link>
          </div>
        </div>
      </div>
      <form-component v-if="isActive && !isSend" :form-elements="competition.form" :submit-button-text="$t('Submit') + (competition.disclaimer ? ' *' : '')" v-model="form" @submit="submit" id="competition-form" />
      <div v-if="!isActive && !isSend" id="competition-form" class="t-p-4 t-bg-white">
        {{ $t('Sorry, but this competition is already over.') }}
      </div>
      <div v-if="isSend" class="t-p-4 t-bg-white">
        <div class="t-flex t-items-center t-text-1xl t-font-bold t-text-alt-3 t-mb-2">
          <material-icon icon="check" size="lg" class="t-mr-2" />
          {{ $t('Done') }}
        </div>
        {{ $t('Thank you. We successfully received your data and will inform you about further steps.') }}
      </div>
      <div v-if="isActive && !isSend && competition.disclaimer" class="t-pt-4 t-text-sm t-text-base-light">
        <p v-if="showTo">
          <material-icon icon="asterisk" icon-set="icmaa" size="xxs" class="t-mr-1" />
          {{ $t('Deadline for entries is {showTo}. The decision is final.', { showTo }) }}
        </p>
        <p>
          <material-icon icon="asterisk" icon-set="icmaa" size="xxs" v-if="showTo" />
          <material-icon icon="asterisk" icon-set="icmaa" size="xxs" class="t-mr-1" />
          {{ competition.disclaimer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { toDate, isDatetimeInBetween } from 'icmaa-config/helpers/datetime'
import { stringToComponent } from 'icmaa-cms/helpers'

import FormComponent from 'theme/components/core/blocks/Form/Form'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'
import ButtonComponent from 'theme/components/core/blocks/Button'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'Competition',
  components: {
    FormComponent,
    ButtonComponent,
    RetinaImage,
    MaterialIcon
  },
  data () {
    return {
      form: {},
      isSend: false
    }
  },
  computed: {
    ...mapGetters({
      getCompetition: 'icmaaCompetitions/getByIdentifier'
    }),
    competition () {
      return this.getCompetition(this.$route.params.identifier)
    },
    sheetId () {
      return this.competition.googleSheetId
    },
    isActive () {
      const { showFrom, showTo, enabled } = this.competition
      return enabled && isDatetimeInBetween(showFrom, showTo)
    },
    description () {
      return stringToComponent(this.competition.description)
    },
    image () {
      return getThumbnailPath('/' + this.competition.image, 0, 0, 'media')
    },
    bannerImage () {
      return getThumbnailPath('/' + this.competition.bannerImage, 0, 0, 'media')
    },
    youtubeVideoUrl () {
      return `https://www.youtube.com/embed/${this.competition.youtubeVideoId}`
    },
    showTo () {
      return this.competition.showTo ? toDate(this.competition.showTo) : false
    }
  },
  methods: {
    async submit () {
      if (!this.isActive) {
        window.location.reload()
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Please wait'))
      this.$store.dispatch('icmaaCompetitions/post', { sheetId: this.sheetId, data: this.form })
        .then(this.afterSend)
    },
    afterSend (success) {
      this.$bus.$emit('notification-progress-stop')

      if (success) {
        this.isSend = true
        this.$bus.$emit('notification-progress-stop')
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('Thank you. We successfully received your data and will inform you about further steps.'),
          action1: { label: i18n.t('OK') }
        })
      } else {
        this.onError()
      }
    },
    onError () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('There was an unexpected error. Please check your entered data and try again.'),
        action1: { label: i18n.t('OK') }
      })
    }
  },
  async asyncData ({ store, route, context }) {
    const value = route.params.identifier
    await store.dispatch('icmaaCompetitions/single', { value })
  }
}
</script>

<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$color-primary: color(primary);

.competition {

  .description {
    a {
      color: $color-primary;
    }

    p, ul, ol {
      margin-bottom: 16px;
    }

    ul, ol {
      margin-left: 16px;

      li > p {
        margin-bottom: 0;
      }
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal-leading-zero;
    }
  }
}

</style>
