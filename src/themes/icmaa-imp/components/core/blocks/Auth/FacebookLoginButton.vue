<template>
  <button-component v-if="visible" type="facebook" :icon="working ? '' : 'facebook'" icon-set="icmaa" icon-position="left" :disabled="disabled" :class="{ 't-relative': working, 't-opacity-75': disabled }" @click="toggleLogin">
    <template v-if="!connected">
      {{ $t(initialText) }}
    </template>
    <template v-else-if="working">
      {{ $t('Please wait') }}
    </template>
    <template v-else>
      {{ $t('Logout of Facebook') }}
    </template>
    <loader-background v-if="working" bar="t-bg-white t-opacity-50" class="t-bottom-0" />
  </button-component>
</template>

<script>
import { mapGetters } from 'vuex'
import config from 'config'
import ButtonComponent from 'theme/components/core/blocks/Button'
import LoaderBackground from 'theme/components/core/LoaderBackground'

/**
 * We use the FB auth-token based login method usind their JS SDK.
 * We can't use the more save `code-flow` authorization because it's not supported by the SDK.
 *
 * Workflow:
 * - Request an oauth access token via SDK
 * - Send a request with this access token to API
 * - API sends it to VSF bridge
 * - Bridge actions sends request to FB API using this access token to fetch user data
 * - If found the user will be logged in
 * - If not a new account will be created and the new user will be logged in
 *
 * @see https://developers.facebook.com/docs/facebook-login/security
 */

export default {
  name: 'FacebookLoginButton',
  props: {
    initialText: {
      type: String,
      default: 'Login with Facebook'
    },
    hideConnected: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ButtonComponent,
    LoaderBackground
  },
  data () {
    const { enabled, appId, version, scope } = config.icmaa_facebook.login
    return {
      enabled,
      appId,
      version,
      options: {},
      loginOptions: { scope, return_scopes: true },
      working: false,
      connected: undefined
    }
  },
  computed: {
    ...mapGetters({ isLoggedIn: 'user/isLoggedIn' }),
    visible () {
      return !(!this.enabled || this.isLoggedIn || this.connected === undefined || (this.connected && this.hideConnected))
    },
    disabled () {
      return this.working === true
    }
  },
  methods: {
    onSuccess () {
      this.$store.dispatch('ui/closeAll')
      this.$bus.$emit('modal-hide', 'modal-signup')

      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('You are logged in!'),
        action1: { label: this.$t('OK') }
      })
    },
    onFailure (error) {
      this.logout()
        .then(() => {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: error,
            action1: { label: this.$t('OK') }
          })
        })
    },
    async authorizeRequest (response) {
      if (this.connected) {
        const { version } = this
        const { accessToken } = response.authResponse

        await this.process(this.$store.dispatch('user/facebookLogin', { accessToken, version }))
          .catch(e => this.onFailure(e))
          .then(() => this.onSuccess())
      }
    },
    toggleLogin () {
      this.$emit('click')
      if (this.connected) {
        this.logout()
      } else {
        this.login()
      }
    },
    async login () {
      const login = this.fbLogin(this.loginOptions)
      const response = await this.process(login)

      this.connected = (response.status === 'connected')

      await this.authorizeRequest(response)
      this.$emit('login', response)

      return login
    },
    async logout () {
      const logout = this.fbLogout()
      const response = await this.process(logout)

      this.connected = false
      this.$emit('logout', response)

      return logout
    },
    async process (promise) {
      this.working = true
      await promise
      this.working = false

      return promise
    },
    async initFbSdk (options) {
      return new Promise(resolve => {
        window.fbAsyncInit = function () {
          const defaults = { cookie: true, xfbml: true }
          options = { ...defaults, ...options }
          window.FB.init(options)
          resolve()
        };
        (function (d, s, id) {
          const fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)) { return; }
          const js = d.createElement(s); js.id = id
          js.src = '//connect.facebook.net/en_US/sdk.js'
          fjs.parentNode.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk'))
      })
    },
    async getFbSdk (options) {
      return new Promise(async resolve => {
        if (window.FB) {
          resolve(window.FB)
        } else {
          await this.initFbSdk(options)
          resolve(window.FB)
        }
      })
    },
    async fbLogin (options) {
      return new Promise(resolve => {
        window.FB.login(response => resolve(response), options)
      })
    },
    async getFbLoginStatus () {
      return new Promise(resolve => {
        window.FB.getLoginStatus(response => resolve(response))
      })
    },
    async fbLogout () {
      return new Promise(resolve => {
        window.FB.logout(response => resolve(response))
      })
    }
  },
  created () {
    if (!this.enabled) {
      return
    }

    const created = new Promise(async resolve => {
      const { appId, version, options } = this
      const sdk = await this.getFbSdk({ appId, version, options })
      const fbLoginStatus = await this.getFbLoginStatus()
      this.connected = (fbLoginStatus.status === 'connected')
      this.$emit('sdk-init', { FB: sdk })
      resolve()
    })

    this.$bus.$on('user-after-logout', this.logout)

    this.process(created).then(() => {
      if (this.connected && !this.isLoggedIn) {
        this.logout()
      }
    })
  }
}
</script>
