import config from 'config'
import fetch from 'isomorphic-fetch'
export default {
  data: function () {
    return {
      accessToken: ''
    }
  },
  methods: {
    getAccessToken () {
      let token = localStorage.getItem('accessToken');
      if (token) {
        return token
      } else {
        let token = this.getToken()
        return token
      }
    },
    getToken () {
      return new Promise((resolve, reject) => {
        fetch(config.google_my_business.token_endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(resp => {
          return resp.json()
        }).then(data => {
          localStorage.setItem('accessToken', data.accessToken)
          resolve(data.accessToken)
        }).catch(err => {
          reject(err);
        })
      })
    },
    refreshToken () {
      return new Promise((resolve, reject) => {
        fetch(config.google_my_business.refresh_token_endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(resp => {
          return resp.json()
        }).then(data => {
          localStorage.setItem('accessToken', data.accessToken)
          resolve(data.accessToken)
        }).catch(err => {
          reject(err);
        })
      })
    },
    getAccounts (accessToken) {
      return new Promise((resolve, reject) => {
        fetch(config.google_my_business.api_url + '/accounts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        }).then(res => {
          return res.json()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllLocations (account, searchFilters, accessToken) {
      return new Promise((resolve, reject) => {
        fetch(`${config.google_my_business.api_url}/${account.name}/locations?filter=address.postal_code=*${searchFilters.zip}*+AND+address.administrative_area=* ${searchFilters.state}*+AND+address.locality=*${searchFilters.city}*+AND+open_info.status=OPEN`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        }).then(res => {
          return res.json()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
