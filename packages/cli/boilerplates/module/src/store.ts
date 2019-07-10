export const ExampleStore = {
  state: {
    message: 'Hello World'
  }
}

export const ExtendProductStore = {
  actions: {
    state: {
      newprop: null
    },
    list () {
      console.log('Hello from extended action')
    }
  }
}
