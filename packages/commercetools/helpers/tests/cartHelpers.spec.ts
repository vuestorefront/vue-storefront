import { getCartProducts } from './../src/index'

const price = p => ({ value: { centAmount: p } })
const variant = (p = {}) => ({ ...p, images: [{ url: 'a.jpg' }, { url: 'b.jpg' }] })
const configuration = () => ([{ name: 'size', value: '38' }, { name: 'color', value: 'white' }])

const cart = {
  lineItems: [
    { name: 'prod1', id: 1, price: price(1100), variant: variant(), quantity: 1, _configuration: configuration() },
    { name: 'prod2', id: 2, price: price(1500), variant: variant(), quantity: 2, _configuration: configuration() }
  ]
} as any

describe('[commercetools-helpers] cart helpers', () => {
  it('returns default values', () => {
    expect(getCartProducts(null)).toEqual([])
  })

  it('returns products', () => {
    expect(getCartProducts(cart)).toEqual([
      { title: 'prod1', id: 1, price: { regular: 11 }, image: 'a.jpg', qty: 1, configuration: configuration() },
      { title: 'prod2', id: 2, price: { regular: 15 }, image: 'a.jpg', qty: 2, configuration: configuration() },
    ])
  })

  it('returns products with whitelisted attributes', () => {
    expect(getCartProducts(cart, ['color'])).toEqual([
      { title: 'prod1', id: 1, price: { regular: 11 }, image: 'a.jpg', qty: 1, configuration: [ { name: 'color', value: 'white' } ] },
      { title: 'prod2', id: 2, price: { regular: 15 }, image: 'a.jpg', qty: 2, configuration: [ { name: 'color', value: 'white' } ] },
    ])
  })
})
