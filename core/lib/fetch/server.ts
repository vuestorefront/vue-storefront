import { fetch as undiciFetch } from 'undici'

const fetch: typeof globalThis.fetch = (input, init) => {
  return undiciFetch(input as Parameters<typeof undiciFetch>[0], init as Parameters<typeof undiciFetch>[1]) as unknown as Promise<Response>
}

export default fetch
