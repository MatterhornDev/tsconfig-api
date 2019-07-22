import http from 'http'
import { TSConfigData } from './tsconfig-data'
import helper from './helper'

const handler = (_: http.IncomingMessage, res: http.ServerResponse) => {
  const payload = Object.keys(TSConfigData)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

export default helper(handler)