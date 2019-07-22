import http from 'http'
import { TSConfigData, isTSConfigKey } from './tsconfig-data'
import helper from './helper'

const handler = (_: http.IncomingMessage, res: http.ServerResponse) => {
  const defaultKeys = ["target", "module", "strict", "esModuleInterop"]
  const payload = defaultKeys.map(k =>
    isTSConfigKey(TSConfigData, k) && ({ option: k, defaultValue: TSConfigData[k].defaultValue}) // short-circuit with type guard
  )
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

export default helper(handler)