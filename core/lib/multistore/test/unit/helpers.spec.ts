import { getNormalizedPath } from './../../helpers'

describe('getNormalizedPath', () => {
  it('always return path with leading slash', () => {
    expect(getNormalizedPath('/us')).toBe('/us')
    expect(getNormalizedPath('/')).toBe('/')
    expect(getNormalizedPath('us')).toBe('/us')
    expect(getNormalizedPath('us/de')).toBe('/us/de')
  })
})
