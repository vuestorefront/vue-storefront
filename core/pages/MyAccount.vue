<template>
  <div id="my_account">
    Core My Account
  </div>
</template>

<script>
import Breadcrumbs from 'core/components/Breadcrumbs'
import MyProfile from 'core/components/blocks/MyAccount/MyProfile'
import MyShippingDetails from 'core/components/blocks/MyAccount/MyShippingDetails'
import MyNewsletter from 'core/components/blocks/MyAccount/MyNewsletter'
import MyOrders from 'core/components/blocks/MyAccount/MyOrders'
import MyOrder from 'core/components/blocks/MyAccount/MyOrder'
import Composite from 'core/mixins/composite'
import i18n from 'core/lib/i18n'

export default {
  name: 'MyAccount',
  mixins: [Composite],
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('My Account'),
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  props: {
    activeBlock: {
      type: String,
      default: 'MyProfile'
    }
  },
  data () {
    return {
      navigation: [
        { title: 'My profile', link: '/my-account' },
        { title: 'My shipping details', link: '/my-account/shipping-details' },
        { title: 'My newsletter', link: '/my-account/newsletter' },
        { title: 'My orders', link: '/my-account/orders' },
        { title: 'My loyalty card', link: '#' },
        { title: 'My product reviews', link: '#' }
      ]
    }
  },
  created () {
    this.$bus.$on('myAccount-before-updateUser', (updatedData) => {
      if (updatedData) {
        this.$store.dispatch('user/update', { customer: updatedData })
      }
    })
    this.$bus.$on('myAccount-before-changePassword', (passwordData) => {
      this.$store.dispatch('user/changePassword', passwordData)
    })
    this.$bus.$on('myAccount-before-updatePreferences', (updatedData) => {
      if (updatedData) {
        if (updatedData.action === 'subscribe') {
          this.$bus.$emit('newsletter-after-subscribe', { email: updatedData.email })
          this.$store.dispatch('user/updatePreferences', updatedData.preferences)
        } else {
          this.$bus.$emit('newsletter-after-unsubscribe', { email: updatedData.email })
          this.$store.dispatch('user/updatePreferences', null)
        }
      }
    })
  },
  destroyed () {
    this.$bus.$off('myAccount-before-updateUser')
    this.$bus.$off('myAccount-before-changePassword')
    this.$bus.$off('myAccount-before-updatePreferences')
  },
  mounted () {
    const usersCollection = global.db.usersCollection
    usersCollection.getItem('current-token', (err, token) => {
      if (err) {
        console.error(err)
      }
      if (!token) {
        this.$router.push('/')
      }
    })
  },
  methods: {
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$bus.$emit('notification', {
          type: 'warning',
          message: i18n.t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: 'OK', action: 'close' }
        })
      }
    }
  },
  components: {
    Breadcrumbs,
    MyProfile,
    MyShippingDetails,
    MyNewsletter,
    MyOrders,
    MyOrder
  }
}
</script>
