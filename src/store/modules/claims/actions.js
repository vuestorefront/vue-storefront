export default {
  set (context, { claimCode, value, description }) {
    const claimCollection = global.$VS.db.claimsCollection
    claimCollection.setItem(claimCode, {
      code: claimCode,
      created_at: new Date(),
      value: value,
      description: description
    }).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  },

  unset (context, { claimCode }) {
    const claimCollection = global.$VS.db.claimsCollection
    claimCollection.removeItem(claimCode).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  },

  check (context, { claimCode }) {
    const claimCollection = global.$VS.db.claimsCollection
    return claimCollection.getItem(claimCode).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    })
  }
}
