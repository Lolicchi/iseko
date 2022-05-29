import { Constants } from '../utils/Constants.ts'
import { type IPayload } from '../interfaces/IPayload.ts'
import { type Iseko } from './client.ts'
import { GatewayPayloads } from '../gateway/payloads.gateway.ts'

export class ClientWebSocket extends WebSocket {
  heartbeatInterval!: number
  sessionId!: string
  sequence!: number
  heartbeat: (ms: number) => void
  identify: (token: string, intents?: string[] | number) => void

  constructor(client: Iseko) {
    super(Constants.Gateway.URL)

    this.onopen = () => {
      console.log({ mod: 'WS', x: 'WebSocket open.', o: this.url }) // {gateway,encoding,version}
    }

    this.onmessage = rawData => {
      const payload: IPayload = JSON.parse(rawData.data.toString()),
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

    this.onerror = err => console.log('Err ::', err)

    this.onclose = code => console.log('Closed ::', code)

    this.identify = (token, intents = 0) => {
      const i = () => {
        this.send(
          JSON.stringify({
            op: Constants.OP.IDENTIFY,
            d: {
              token: token,
              intents: intents,
              properties: {
                $os: 'linux',
                $browser: 'Discord iOS',
                $device: 'discord.js'
              }
            }
          })
        )
      }

      if (this.readyState == 1) return i()

      this.addEventListener('open', () => {
        i()
      })
    }

    this.heartbeat = (ms: number) => {
      this.heartbeatInterval = ms
      setInterval(() => {
        this.send(JSON.stringify({ op: Constants.OP.HEARTBEAT, d: null }))
      }, ms)
    }
  }
}
