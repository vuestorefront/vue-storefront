import i18n from '@vue-storefront/i18n'
import MailItem from '../types/MailItem'

export const EmailForm = {
  name: 'EmailForm',
  data () {
    return {
      token: null
    }
  },
  methods: {
    sendEmail (letter: MailItem, success, failure) {
      this.$store.dispatch('mailer/sendEmail', letter)
        .then(res => {
          if (res.ok) {
            if (success) success(i18n.t('Email has successfully been sent'))
          } else {
            return res.json()
          }
        })
        .then(errorResponse => {
          if (errorResponse) {
            const errorMessage = errorResponse.result
            if (failure) failure(i18n.t(errorMessage))
          }
        })
        .catch(() => {
          if (failure) failure(i18n.t('Could not send an email. Please try again later.'))
        })
    }
  }
}
