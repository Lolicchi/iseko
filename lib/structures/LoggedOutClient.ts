import { ClientWebSocket } from '../client/ws.client.ts'
import { GatewayPayloads } from '../gateway/payloads.gateway.ts'
import { handler } from '../Handler.ts'
import { Payload } from '../interfaces/Payload.ts'
import { IsekoOptions } from '../types/IsekoOptions.ts'
import { Constants } from '../utils/Constants.ts'
import { ApiRequest } from './ApiRequest.ts'
import { LoggedInClient } from './LoggedInClient.ts'

export class LoggedOutClient {
  api
  events? // ...(events && { events }),
  plugins? // ...(plugins && { plugins }),
  prefix? // ...(prefix && { prefix }),

  constructor(private args: IsekoOptions) {
    this.api = args.api || new ApiRequest(this.args.token)
    args.events && (this.events = args.events)
    args.plugins && (this.plugins = args.plugins)
    args.prefix && (this.prefix = args.prefix)
  }

  connect() {
    return new Promise<LoggedInClient>((resolve, reject) => {
      const ws = new ClientWebSocket()
      ws.addEventListener('close', () => reject('ws closed'))

      ws.addEventListener('open', () => {
        const client = new LoggedInClient(this, ws)

        console.log('ws opened')

        handler(client)

        ws.onmessage = rawData => {
          const payload: Payload = JSON.parse(rawData.data.toString()),
            opName = (
              Object.keys(Constants.OP) as (keyof typeof Constants.OP)[]
            ).find(key => Constants.OP[key] == payload.op)

          if (!opName) return
          // console.log(opName)
          GatewayPayloads[opName]({
            client,
            payload
          })
        }

        ws.identify(this.args.token)

        resolve(client)
      })
    })
  }
}
