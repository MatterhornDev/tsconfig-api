import http from 'http'
import url from 'url'
import _data from './tsconfig-data.json'
import helper from './helper'
import { tsconfigData } from '../types/tsconfig-api'
import { ERR_NO_OPTION_PARAM, ERR_OPTION_IS_LIST, ERR_OPTION_DOES_NOT_EXIST } from './errors'

const data: tsconfigData = _data

const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const parsedUrl = url.parse(req.url as string, true) // req.url is validated as not-undefined in the helper wrapper

  // the query object does not inherit usual JS Object prototype methods https://github.com/nodejs/node/pull/6289
  // instead use prototype .call to check for existence of option property
  if (Object.prototype.hasOwnProperty.call(parsedUrl.query, `option`)) {
    const { query: { option } } = parsedUrl
    console.log(option.indexOf(','))
    if (!Array.isArray(option) && option.indexOf(',') === -1) {
      const prop = data[option]
      if (prop === undefined) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end(ERR_OPTION_DOES_NOT_EXIST.error)
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(prop))
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' })
      res.end(ERR_OPTION_IS_LIST.error)
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end(ERR_NO_OPTION_PARAM.error)
  }
}

export default helper(handler)