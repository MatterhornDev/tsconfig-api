import http from 'http'
import _data from './tsconfig-data.json'
import { tsconfigData } from '../types/tsconfig-api'
import helper from './helper'

const data: tsconfigData = _data

const handler = (_: http.IncomingMessage, res: http.ServerResponse) => {
  const payload = Object.keys(data)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

export default helper(handler)