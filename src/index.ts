import { IncomingMessage, ServerResponse } from 'http'
import helper from './helper'

const handler = (_: IncomingMessage, res: ServerResponse) => {
  res.end(`Try using the /tsconfig route!\n`)
}

export default helper(handler)