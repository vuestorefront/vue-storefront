// initial state

// Inspirations are supposed to link to user accounts on social media apps and websites
//
// Since it's very theme specific it's being put here, with some example data already in the initial state

const state = {
  inspirations: [
    {
      account_name: 'instagram',
      account_link: 'http://instagram.com',
      background_image: '/assets/slide_01.jpg'
    },
    {
      account_name: 'instagram',
      account_link: 'http://instagram.com',
      background_image: '/assets/slide_01.jpg'
    },
    {
      account_name: 'instagram',
      account_link: 'http://instagram.com',
      background_image: '/assets/slide_01.jpg'
    },
    {
      account_name: 'instagram',
      account_link: 'http://instagram.com',
      background_image: '/assets/slide_01.jpg'
    },
    {
      account_name: 'instagram',
      account_link: 'http://instagram.com',
      background_image: '/assets/slide_01.jpg'
    },
    {
      account_name: 'instagram',
      account_link: 'http://instagram.com',
      background_image: '/assets/slide_01.jpg'
    }
  ]
}

// getters
const getters = {
  getInspirations: state => {
    return state.inspirations
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
