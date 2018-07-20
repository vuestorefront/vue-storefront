export const signIn = {
  methods: {
    signIn (username, password, onSuccess, onError) {
      this.$store.dispatch('user/login', { username: this.username, password: this.password })
        .then((result) => {
          result.code !== 200 ? this.onError() : this.onSuccess()
        })
        .catch(err => {
          this.onError()
          console.error(err)
        })
    }
  }
}
