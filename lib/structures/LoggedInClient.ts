import { ClientWebSocket } from '../client/ws.client.ts'
import { IsekoOptions } from '../types/IsekoOptions.ts'
import { ApiRequest } from './ApiRequest.ts'
import { LoggedOutClient } from './LoggedOutClient.ts'

export class LoggedInClient {
  api
  events?
  plugins?
  prefix?

  constructor(options: IsekoOptions & { ws: ClientWebSocket })
  constructor(options: LoggedOutClient, ws: ClientWebSocket)
  constructor(
    options: (IsekoOptions & { ws: ClientWebSocket }) | LoggedOutClient,
    public ws: ClientWebSocket = (
      options as IsekoOptions & { ws: ClientWebSocket }
    ).ws //(options !instanceof LoggedOutClient)
  ) {
    if (options instanceof LoggedOutClient) {
      this.api = options.api
      options.events && (this.events = options.events)
      options.plugins && (this.plugins = options.plugins)
      options.prefix && (this.prefix = options.prefix)
      return
    }

    this.api = options.api || new ApiRequest(options.token)
  }

  disconnect() {
    this.ws.close()
  }
}
