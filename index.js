'use strict';

const http = require('http')
const httpProxy = require('http-proxy')
const streamify = require('stream-array')

const proxy = httpProxy.createProxyServer({})

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const data = Buffer.concat(buffers).toString()

  console.log(data)

  proxy.web(req, res, {
    target: 'http://127.0.0.1:9999',
    buffer: streamify(buffers)
  })
})

server.listen(8000)
