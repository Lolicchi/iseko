import { GatewayPayloads } from '../gateway/payloads.gateway.ts'
import { handler } from '../Handler.ts'
import { Payload } from '../interfaces/Payload.ts'
import { ApiRequest } from '../structures/ApiRequest.ts'
import type { Iseko as IIseko } from '../types/Iseko.ts'
import { IsekoOptions } from '../types/IsekoOptions.ts'
import { Constants } from '../utils/Constants.ts'
import { Channels } from './channels.client.ts'
import { Guilds } from './guilds.client.ts'
import { Voice } from './voice.client.ts'
import { ClientWebSocket } from './ws.client.ts'
import { ClientPresence } from '../structures/ClientPresence.ts'

export const Iseko = (args: IsekoOptions) => {
  const parentArr: [new () => IIseko.LoggedOut] = [
    class Iseko_Dev {
      api = args.api || new ApiRequest(args.token)
      events?
      plugins?
      prefix?

      constructor() {
        args.events && (this.events = args.events)
        args.plugins && (this.plugins = args.plugins)
        args.prefix && (this.prefix = args.prefix)
      }

      connect() {
        return new Promise<IIseko.LoggedIn>((resolve, reject) => {
          const ws = new ClientWebSocket()
          ws.addEventListener('close', () => reject('ws closed'))

          ws.addEventListener('open', () => {
            const loggedInClient: IIseko.LoggedIn =
              new (class Iseko_Dev extends parentArr[0] {
                channels = new Channels(this.api)
                guilds = new Guilds(this.api)
                user = null
                ws = ws
                presence = new ClientPresence(this.ws)
                voice = new Voice(this.ws, this.channels)

                // constructor() {
                //   super()
                // }

                disconnect() {
                  this.ws.close()
                }
              })()

            console.log('ws opened')

            //fix handler for multiple clients
            handler(loggedInClient)

            ws.onmessage = rawData => {
              const payload: Payload = JSON.parse(rawData.data.toString()),
                opName = (
                  Object.keys(Constants.OP) as (keyof typeof Constants.OP)[]
                ).find(key => Constants.OP[key] == payload.op)

              if (!opName) return
              // console.log(opName)
              GatewayPayloads[opName]({
                client: loggedInClient,
                payload
              })
            }

            ws.identify(args.token)

            resolve(loggedInClient)
          })
        })
      }
    }
  ]

  const loggedOutClient: IIseko.LoggedOut = new parentArr[0]()

  return loggedOutClient
}
