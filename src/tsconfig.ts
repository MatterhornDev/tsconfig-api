import http from 'http'
import url from 'url'
import _data from './tsconfig-data.json'

const ERRORS = {
  ERR_OPTION_IS_LIST: {
    error: 'Query parameter `option` should not be a list'
  },
  ERR_NO_OPTION_PARAM: {
    error: 'missing `option` query parameter'
  },
  ERR_NO_REQ_URL: {
    error: 'Request object did not contain a URL'
  }
}

interface tsconfigData {
  [k: string]: {
    cliOption: null | string | string[],
    type: string | string[],
    defaultValue: string | string[],
    description: string,
    experimental: boolean,
    configOnly: boolean
  }
}

const data: tsconfigData = _data

const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.url !== undefined) {
    const parsedUrl = url.parse(req.url, true)
    const query = parsedUrl.query
    if (Object.prototype.hasOwnProperty.call(query, `option`)) {
      const option = query.option
      if (!Array.isArray(option)) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data[option]))
      } else {
        res.end(JSON.stringify(ERRORS.ERR_OPTION_IS_LIST))
      }
    } else {
      res.end(JSON.stringify(ERRORS.ERR_NO_OPTION_PARAM))
    }
  } else {
    res.end(JSON.stringify(ERRORS.ERR_NO_REQ_URL))
  }
}

export default handler