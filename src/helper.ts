import { IncomingMessage, ServerResponse } from 'http'
import { ERR_NO_REQ_URL } from './errors'
import { Handler } from '../types/tsconfig-api'

//Wrap API microservices in a req.url check as well as setting the CORS header Access-Control-Allow-Origin to *
const helper = (handler: Handler) => {
  return (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (req.url === undefined) {
      res.end(JSON.stringify(ERR_NO_REQ_URL))
    } else {
      return handler(req, res)
    }
  }
}

export default helper