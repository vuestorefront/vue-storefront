import config from 'config'
import fetch from 'isomorphic-fetch'
import rootStore from '@vue-storefront/core/store'

export default {
  methods: {
    setMyStore (storeCode) {
      const TOKEN = rootStore.getters['user/getUserToken']
      return new Promise((resolve, reject) => {
        fetch(config.users.my_store, {
          method: 'POST',
          body: JSON.stringify({'storeCode': storeCode}),
          headers: {
            'Content-Type': 'application/json',
            'api_key': TOKEN
          }
        }).then(resp => {
          return resp.json()
        }).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err);
        })
      })
    }
  }
}
