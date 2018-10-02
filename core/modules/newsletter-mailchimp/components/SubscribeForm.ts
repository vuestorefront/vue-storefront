
import { required, email } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'


import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'

export default {
  data () {
    return {
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  mounted () {
    if (this.$store.state.user.current) {
      this.email = this.$store.state.user.current.email
    }
  },
  methods: {
    subscribe (email) {
      EventBus.$emit('newsletter-after-subscribe', { email: email })
    },
    submit () {
      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK'), action: 'close' }
        })
        return
      }

      this.subscribe(this.email)

      this.$bus.$emit('notification', {
        type: 'success',
        message: i18n.t('You have been successfully subscribed to our newsletter!'),
        action1: { label: i18n.t('OK'), action: 'close' }
      })

      this.$bus.$emit('modal-hide', 'modal-newsletter')
    }
  },
  components: {
    ButtonFull,
    Modal,
    BaseInput
  },
  mixins: [subscribe]
}
