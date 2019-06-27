export const ExampleStore = {
  state: {
    message: 'Hello World'
  }
}

export const ExtendCart = {
  actions: {
    state: {
      newprop: null
    },
    list () {
      console.log('Hello from extended action')
    }
  }
}
