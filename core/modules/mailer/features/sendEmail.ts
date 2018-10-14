import fetch from 'isomorphic-fetch'
import EventBus from '@vue-storefront/core/plugins/event-bus'
import i18n from '@vue-storefront/i18n'
import MailItem from '../types/MailItem'

export const sendEmail = {
  methods: {
    sendEmail (letter: MailItem, callback) {
      fetch(this.$store.state.config.mailer.endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(letter)
      })
      .then(res => {
        if (res.ok) {
          callback('success', i18n.t('Email has successfully been sent'))

          if (this.$store.state.config.mailer.sendConfirmation) {
            this.sendConfirmation(letter)
          }
        } else {
          res.json().then(jsonResponse => {
            callback('error', i18n.t(jsonResponse.result))
          })
        }
      })
      .catch(error => {
        console.error(error)
        callback('error', i18n.t('Could not send an email. Please try again later.'))
      })
    },
    sendConfirmation (letter: MailItem) {
      const customerName = this.$store.state.checkout.personalDetails.firstName
      const confirmationLetter = {
        sourceAddress: letter.targetAddress,
        targetAddress: letter.sourceAddress,
        subject: i18n.t('Confirmation of receival'),
        emailText: i18n.t(`Dear ${customerName},\n\nWe have received your letter.\nThank you for your feedback!`)
      }

      fetch(this.$store.state.config.mailer.endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(confirmationLetter)
      })
      .then(res => {})
      .catch(error => console.error(error))
    }
  }
}
