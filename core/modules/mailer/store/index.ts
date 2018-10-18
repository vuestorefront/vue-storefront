import config from 'config'
import i18n from '@vue-storefront/i18n'
import MailItem from '../types/MailItem'
import { Module } from 'vuex'

export const store: Module<any, any> = {
  namespaced: true,
  actions: {
    getToken ({}) {
      return fetch(config.mailer.endpoint.token)
    },
    sendEmail ({}, letter: MailItem) {
      return fetch(config.mailer.endpoint.send, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(letter)
      })
    },
    sendConfirmation ({}, letter: MailItem) {
      if (config.mailer.sendConfirmation) {
        const confirmationLetter = {
          sourceAddress: letter.targetAddress,
          targetAddress: letter.sourceAddress,
          subject: i18n.t('Confirmation of receival'),
          emailText: i18n.t(`Dear customer,\n\nWe have received your letter.\nThank you for your feedback!`),
          token: letter.token,
          confirmation: true
        }

        fetch(config.mailer.endpoint.send, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(confirmationLetter)
        })
        .catch(error => console.error(error))
      }
    }
  }
}
