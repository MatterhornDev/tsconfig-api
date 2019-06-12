import { IncomingMessage, ServerResponse } from 'http'

const handler = (_: IncomingMessage, res: ServerResponse) => {
  res.end(`Try using the /tsconfig route!\n`)
}

export default handler