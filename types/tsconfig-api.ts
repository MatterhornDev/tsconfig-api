import { IncomingMessage, ServerResponse } from 'http'

export interface Handler {
  (req: IncomingMessage, res: ServerResponse): void
}

export interface tsconfigData {
  [k: string]: {
    cliOption: null | string | string[],
    type: string | string[],
    defaultValue: string | string[],
    description: string,
    experimental: boolean,
    configOnly: boolean
  }
}