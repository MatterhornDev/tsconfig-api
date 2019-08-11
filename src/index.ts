import { IncomingMessage, ServerResponse } from 'http'
import helper from './helper'

const handler = (_: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(`
  Available routes include:\n
  - \`/tsconig?option=<option>\`: Returns information about a specific TypeScript compiler option\n
  - \`/tsconfig/options\`: Returns an array of TypeScript compiler options as strings\n
  - \`/tsconfig/defaults\`: Returns the default key-value pairs from \`tsc --init\`\n
  `)
}

export default helper(handler)