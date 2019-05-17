import MailItem from '../types/MailItem'
import { Module } from 'vuex'
import config from 'config'

export const module: Module<any, any> = {
  namespaced: true,
  actions: {
    sendEmail (context, letter: MailItem) {
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
