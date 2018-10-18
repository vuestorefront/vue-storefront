import i18n from '@vue-storefront/i18n'
import MailItem from '../types/MailItem'

export const EmailForm = {
  data () {
    return {
      token: null
    }
  },
  methods: {
    sendEmail (letter: MailItem, success, failure) {
      this.$store.dispatch('mailer/getToken')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error()
      })
      .then(tokenResponse => {
        this.token = tokenResponse.result
        return this.$store.dispatch('mailer/sendEmail', { ...letter, token: this.token })
      })
      .then(res => {
        if (res.ok) {
          success(i18n.t('Email has successfully been sent'))
          this.$store.dispatch('mailer/sendConfirmation', { ...letter, token: this.token })
        } else {
          return res.json()
        }
      })
      .then(errorResponse => {
        if (errorResponse) {
          const errorMessage = errorResponse.result
          failure(i18n.t(errorMessage))
        }
      })
      .catch(() => {
        failure(i18n.t('Could not send an email. Please try again later.'))
      })
    }
  }
}
