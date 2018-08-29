export const signIn = {
  methods: {
    signIn (username: string, password: string, onSuccess: any, onError: any) {
      this.$store.dispatch('user/login', { username: username, password: this.password })
        .then((result) => {
          result.code !== 200 ? this.onError() : onSuccess()
        })
        .catch(err => {
          onError()
          console.error(err)
        })
    }
  }
}
