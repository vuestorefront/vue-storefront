<template>
  <div id="my_account">
    Core My Account
  </div>
</template>

<script>
  import Breadcrumbs from '../components/core/Breadcrumbs'
  import MyProfile from '../components/core/blocks/MyAccount/MyProfile'
  import MyShippingDetails from '../components/core/blocks/MyAccount/MyShippingDetails'
  import MyNewsletter from '../components/core/blocks/MyAccount/MyNewsletter'
  import Meta from 'src/lib/meta'
  import i18n from 'lib/i18n'

  export default {
    name: 'MyAccount',
    meta () {
      return {
        title: 'My Account'
      }
    },
    data () {
      return {
        navigation: [
          { title: 'My profile', link: '#profile' },
          { title: 'My shipping details', link: '#shipping_details' },
          { title: 'My newsletter', link: '#newsletter' },
          { title: 'My orders', link: '#' },
          { title: 'My loyalty card', link: '#' },
          { title: 'My product reviews', link: '#' }
        ],
        activeSection: {
          profile: false,
          shipping: false,
          newsletter: false
        },
        editMode: true
      }
    },
    created () {
      this.$bus.$on('myAccount.activateSection', (sectionName) => {
        this.activateSection(sectionName)
      })
      this.$bus.$on('myAccount.updateUser', (updatedData) => {
        if (updatedData) {
          this.$store.dispatch('user/update', { customer: updatedData })
        }
        this.editMode = true
        this.activateSection()
      })
      this.$bus.$on('myAccount.changePassword', (passwordData) => {
        this.$store.dispatch('user/changePassword', passwordData)
      })
      this.$bus.$on('myAccount.updatePreferences', (updatedData) => {
        if (updatedData) {
          if (updatedData.action === 'subscribe') {
            this.$bus.$emit('newsletter-after-subscribe', { email: updatedData.email })
            this.$store.dispatch('user/updatePreferences', updatedData.preferences)
          } else {
            this.$bus.$emit('newsletter-after-unsubscribe', { email: updatedData.email })
            this.$store.dispatch('user/updatePreferences', null)
          }
        }
        this.editMode = true
        this.activateSection()
      })
    },
    destroyed () {
      this.$bus.$off('myAccount.activateSection')
      this.$bus.$off('myAccount.updateUser')
      this.$bus.$off('myAccount.changePassword')
      this.$bus.$off('myAccount.updatePreferences')
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
      activateSection (sectionToActivate) {
        for (let section in this.activeSection) {
          this.activeSection[section] = false
        }
        if (sectionToActivate) {
          this.activeSection[sectionToActivate] = true
          this.editMode = false
        }
      },
      notify (title) {
        if (title === 'My loyalty card' || title === 'My product reviews' || title === 'My orders') {
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
      MyNewsletter
    },
    mixins: [Meta]
  }
</script>