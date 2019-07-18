import { IncomingMessage, ServerResponse } from 'http'

export interface Handler {
  (req: IncomingMessage, res: ServerResponse): void
}

type refLink = {
  title: string,
  link: string
}
export interface tsconfigData {
  [k: string]: {
    cliFlag: null | string | string[],
    defaultValue: string | string[],
    description: string,
    experimental: boolean,
    type: string | string[],
    extendedDescription?: string,
    refLinks?: refLink[]
  }
}