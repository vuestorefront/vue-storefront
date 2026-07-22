import fetch from '../../client'

describe('client fetch adapter', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('delegates to the current browser fetch implementation', async () => {
    const response = new Response(null, { status: 200 })
    const nativeFetch: typeof globalThis.fetch = jest.fn().mockResolvedValue(response)
    globalThis.fetch = nativeFetch

    await expect(fetch('/api/test')).resolves.toBe(response)
    expect(nativeFetch).toHaveBeenCalledWith('/api/test', undefined)
  })
})
