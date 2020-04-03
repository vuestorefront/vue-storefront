<template>
  <div class="reset-password">
    <h2 class="reset-password__heading">
      {{ $t('Reset password') }}
    </h2>
    <form class="reset-password__form">
      <div class="reset-password__row">
        <base-input
          class="mb10"
          type="password"
          name="password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validations="[{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Field is required.')
          }]"
        />
      </div>
      <div class="reset-password__row">
        <base-input
          class="mb10"
          type="password"
          name="password-confirm"
          v-model="rPassword"
          @blur="$v.password.$touch()"
          @keyup.enter="!$v.$invalid ? resetPassword() : null"
          :placeholder="$t('Repeat password *')"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.rPassword.sameAsPassword && $v.rPassword.$error,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
      </div>
      <div class="reset-password__row">
        <ButtonFull
          theme="dark"
          :disabled="$v.$invalid"
          @click.native="resetPassword"
        >
          {{ $t('Reset password') }}
        </ButtonFull>
      </div>
    </form>
  </div>
</template>

<script>
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore';
import i18n from '@vue-storefront/i18n';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {

  name: 'ResetPassword',

  data () {
    return {
      email: this.$route.query.email,
      password: '',
      rPassword: ''
    };
  },

  components: {
    ButtonFull,
    BaseInput
  },

  validations: {
    password: {
      minLength: minLength(8),
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },

  methods: {

    async resetPassword () {
      const { storeCode } = currentStoreView();

      // 1. Change password
      //  a) Sign in if success
      //  b) Display error if fail

      // Start progress notification
      const { id: changingNotificationId } = await this.$store.dispatch('notification/spawnNotification', {
        action1: { label: i18n.t('OK') },
        message: i18n.t('Changing password in progress ...'),
        type: 'success',
        hasNoTimeout: true
      });

      try {
        // Send request to the VSF-API
        let response = await this.$store.dispatch('user/createPassword', {
          email: this.email,
          newPassword: this.password,
          resetToken: this.$route.query.token
        })

        this.$store.dispatch('notification/removeNotificationById', changingNotificationId);

        if (response.code === 500) {
          const responseMessage = response.result && response.result.errorMessage && response.result.errorMessage.includes('No such entity with email')
            ? i18n.t('Provided email does not exist')
            : response.result.errorMessage

          this.$store.dispatch('notification/spawnNotification', {
            action1: { label: i18n.t('OK') },
            message: responseMessage,
            type: 'error'
          });
        } else if (response.code === 200) {
          this.$store.dispatch('notification/spawnNotification', {
            action1: { label: i18n.t('OK') },
            message: i18n.t('Sucessfully changed password'),
            type: 'success'
          });

          if (this.$store.state.config.users.loginAfterCreatePassword) {
            const { id: authNotificationId } = this.$store.dispatch('notification/spawnNotification', {
              action1: { label: i18n.t('OK') },
              message: i18n.t('Authorization in progress ...'),
              type: 'success',
              hasNoTimeout: true
            });

            // Now we are singing in
            try {
              let loginResult = await this.$store.dispatch('user/login', {
                username: this.email,
                password: this.password
              });
              this.$store.dispatch('notification/removeNotificationById', authNotificationId);

              if (loginResult.code !== 200) {
                this.$store.dispatch('notification/spawnNotification', {
                  action1: { label: i18n.t('OK') },
                  message: i18n.t('Something went wrong, sorry'),
                  type: 'error'
                });
              } else {
                this.$router.push(this.localizedRoute('/'));
              }
            } catch (err) {
              this.$store.dispatch('notification/removeNotificationById', authNotificationId);

              this.$store.dispatch('notification/spawnNotification', {
                action1: { label: i18n.t('OK') },
                message: i18n.t('Something went wrong, sorry'),
                type: 'error'
              });
            }
          } else {
            this.$router.push(this.localizedRoute('/'));
          }
        }
      } catch (err) {
        // Never invoked (?)
        await this.$store.dispatch('notification/removeNotificationById', changingNotificationId);
        await this.$store.dispatch('notification/spawnNotification', {
          action1: { label: i18n.t('OK') },
          message: i18n.t('Something went wrong, sorry'),
          type: 'error'
        });
      }
    }
  },

  async asyncData ({ context, route }) {
    // route.query.token & email are needed for this route
    // Otherwise redirect to the home
    const { storeCode } = currentStoreView();
    if (context) {
      if (!route.query.token || !route.query.email) {
        context.server.response.redirect(localizedRoute('/'));
      }
    }
  }
};
</script>

<style scoped>
  .reset-password {
    padding: 20px 30px;
  }
</style>
