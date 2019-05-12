import MailItem from '../types/MailItem'
import { Module } from 'vuex'
import { ConfigManager } from '@vue-storefront/core/lib/config-manager'

export const module: Module<any, any> = {
  namespaced: true,
  actions: {
    sendEmail (context, letter: MailItem) {
      const config = ConfigManager.getConfig()
      return new Promise((resolve, reject) => {
        fetch(config.mailer.endpoint.token)
        .then(res => res.json())
        .then(res => {
          if (res.code === 200) {
            fetch(config.mailer.endpoint.send, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ...letter,
                token: res.result
              })
            })
            .then(res => resolve(res))
            .catch(() => reject())
          } else {
            reject()
          }
        })
        .catch(() => reject())
      })
    }
  }
}
