/** @jest-environment node */

import { createServer, Server } from 'http'
import { AddressInfo, createServer as createNetServer } from 'net'
import { gzipSync } from 'zlib'
import fetch from '../../server'

describe('server fetch adapter', () => {
  let server: Server
  let url: string

  beforeEach(async () => {
    const body = gzipSync(JSON.stringify({ code: 200, result: 'ok' }))

    server = createServer((request, response) => {
      response.writeHead(200, {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json'
      })
      response.write(body.subarray(0, Math.floor(body.length / 2)))
      response.end(body.subarray(Math.floor(body.length / 2)))
    })

    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
    const address = server.address() as AddressInfo
    url = `http://127.0.0.1:${address.port}`
  })

  afterEach(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close(error => error ? reject(error) : resolve())
    })
  })

  it('reads a chunked gzip response', async () => {
    const response = await fetch(url)

    await expect(response.json()).resolves.toEqual({ code: 200, result: 'ok' })
  })

  it('supports the Varnish BAN method', async () => {
    let resolveRequest!: (request: string) => void
    const receivedRequest = new Promise<string>((resolve) => {
      resolveRequest = resolve
    })
    const varnishServer = createNetServer((socket) => {
      socket.once('data', (data) => {
        resolveRequest(data.toString())
        socket.end('HTTP/1.1 200 OK\r\nContent-Length: 0\r\nConnection: close\r\n\r\n')
      })
    })

    await new Promise<void>((resolve) => varnishServer.listen(0, '127.0.0.1', resolve))
    const address = varnishServer.address() as AddressInfo

    try {
      await fetch(`http://127.0.0.1:${address.port}`, { method: 'BAN' })
      await expect(receivedRequest).resolves.toMatch(/^BAN \/ HTTP\/1\.1/)
    } finally {
      await new Promise<void>((resolve, reject) => {
        varnishServer.close(error => error ? reject(error) : resolve())
      })
    }
  })
})
