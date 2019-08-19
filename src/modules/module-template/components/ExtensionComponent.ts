/**
 * User list component example. Try to document components like this. You can also export .vue files if you want to provide baseline template.
 *
 * #### Data
 * - `users: String[]` - list of users
 *
 * #### Methods
 * - `addUser(name: Function, success?: Function, failure?: Function)` adds new user to the list, calls failure if user with the same name is already on list
 */
export const ExtensionComponent = {
  name: 'ExtensionComponent',
  computed: {
    users () {
      return this.$store.state.example.user
    }
  },
  methods: {
    addUser (user: Record<string, any>, success: (res: Record<string, any>) => void, failure: (err: Error) => void): void {
      this.$store.dispatch('example/addUser', user).then(res => {
        success(res)
      }).catch(err => {
        failure(err)
      })
    }
  }
}
