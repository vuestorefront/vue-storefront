<template>
  <nav class="customer-account">
    <div class="t-flex t-flex-wrap t-bg-white">
      <div class="t-flex t-flex-expand t-px-4 t-py-6 t-border-b t-border-base-lightest">
        <material-icon icon="account_circle" size="xl" class="t-mr-3 t-text-primary" />
        <div class="t-leading-1-rem t-mt-2">
          <div class="t-text-base t-font-bold">
            {{ welcome }}
          </div>
          <router-link :to="localizedRoute('/my-account')" @click.native="$emit('click')" class="t-text-xs t-text-base-light">
            {{ $t('Edit profile') }}
          </router-link>
        </div>
      </div>
      <ul @click="$emit('click')" class="t-flex t-flex-wrap t-overflow-hidden" :class="[ visible ? 't-pt-3 t-max-h-screen-100 t-border-b t-border-base-lightest lg:t-border-none' : 't-max-h-0' ]" style="transition: all .5s">
        <li class="t-flex t-w-full" v-for="(page, index) in navigation" :key="index">
          <router-link @click.native="close" :to="localizedRoute(page.link)" class="t-flex t-flex-grow t-items-center t-px-6 t-py-3 t-text-sm">
            <material-icon v-if="page.icon" :icon="page.icon" size="sm" class="t-mr-4" :class="[ isActive(page.link) ? 't-text-base-darkest' : 't-text-base-light' ]" />
            {{ page.title }}
          </router-link>
        </li>
        <li class="t-flex t-w-full t-pt-3">
          <router-link :to="localizedRoute('')" @click.native="logout" class="t-flex t-flex-grow t-items-center t-text-sm t-px-6 t-py-6 t-border-t t-border-base-lightest t-text-base-light">
            <material-icon icon="exit_to_app" size="sm" class="t-mr-2 t-text-base-light" />
            {{ $t('Logout') }}
          </router-link>
        </li>
      </ul>
      <div v-if="accordion" class="t-flex lg:t-hidden t-w-full t-py-3 t-items-center t-justify-center t-text-sm t-text-base-light t-cursor-pointer" @click="visible = !visible">
        {{ $t('Swap navigation') }}
        <material-icon :icon="visible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" size="sm" class="t-ml-4" />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  data () {
    return {
      visible: !this.accordion,
      navigation: [
        { title: this.$t('My profile'), icon: 'account_circle', link: '/my-account' },
        { title: this.$t('My orders'), icon: 'local_mall', link: '/my-account/orders' },
        { title: this.$t('My addresses'), icon: 'home', link: '/my-account/addresses' },
        { title: this.$t('My newsletter'), icon: 'mail', link: '/my-account/newsletter' },
        { title: this.$t('My product reviews'), icon: 'subject', link: '/my-account/reviews' },
        { title: this.$t('My coupons'), icon: 'receipt', link: '/my-account/coupons' }
      ]
    }
  },
  components: {
    MaterialIcon
  },
  props: {
    accordion: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      viewport: 'ui/getViewport',
      customer: 'user/getCustomer'
    }),
    firstname () {
      return this.customer && this.customer.firstname ? this.customer.firstname : false
    },
    welcome () {
      return this.firstname ? i18n.t('Hi {firstname}', { firstname: this.firstname }) : i18n.t('Your account')
    }
  },
  methods: {
    isActive (link) {
      return this.$route.path.endsWith(link)
    },
    logout () {
      this.$store.dispatch('user/logout', { silent: false })
        .then(() => {
          this.$router.push(this.localizedRoute('/'))
        })
    },
    close () {
      if (this.accordion && ['xs', 'sm'].includes(this.viewport)) {
        this.visible = false
      }
    }
  },
  watch: {
    viewport (v) {
      this.visible = !['xs', 'sm'].includes(v)
    }
  }
}
</script>
