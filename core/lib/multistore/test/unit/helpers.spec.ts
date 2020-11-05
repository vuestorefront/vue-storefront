import { getNormalizedPath, getPrefixFromUrl } from './../../helpers'

describe('getNormalizedPath', () => {
  it('always return path with leading slash', () => {
    expect(getNormalizedPath('/us')).toBe('/us')
    expect(getNormalizedPath('/')).toBe('/')
    expect(getNormalizedPath('us')).toBe('/us')
    expect(getNormalizedPath('us/de')).toBe('/us/de')
  })
})

describe('getPrefixFromUrl', () => {
  it('always return path with leading slash', () => {
    expect(getPrefixFromUrl('domain.co.uk/us')).toBe('/us')
    expect(getPrefixFromUrl('domain.co.uk')).toBe('/')
    expect(getPrefixFromUrl('/')).toBe('/')
    expect(getPrefixFromUrl('/us')).toBe('/us')
    expect(getPrefixFromUrl('domain.co.uk/gb/foo')).toBe('/gb')
    expect(getPrefixFromUrl('http://domain.co.uk/us')).toBe('/us')
    expect(getPrefixFromUrl('https://domain.co.uk/us')).toBe('/us')
  })
})
