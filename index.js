'use strict';

const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer({})

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: 'http://127.0.0.1:9999'})
})

server.listen(8000)
