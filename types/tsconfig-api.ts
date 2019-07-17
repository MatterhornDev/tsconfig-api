import { IncomingMessage, ServerResponse } from 'http'

export interface Handler {
  (req: IncomingMessage, res: ServerResponse): void
}

export interface tsconfigData {
  [k: string]: {
    cliFlag: null | string | string[],
    defaultValue: string | string[],
    description: string,
    extendedDescription: string,
    experimental: boolean,
    refLinks: { title: string, link: string }[]
    type: string | string[],
  }
}