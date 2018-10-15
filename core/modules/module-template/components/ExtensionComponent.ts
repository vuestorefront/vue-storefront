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
  data () {
    return {
      users: []
    }
  },
  methods: {
    addUser(name: string, success: () => void, failure: () => void): void {
      if(!this.users.includes[name]) {
        this.users.push(name)
        if (success) success()
      } else {
        if (failure) failure()
      }
    }
  }
}