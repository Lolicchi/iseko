import { Payload } from '../interfaces/Payload.ts'
// import { Iseko } from '../client/client.ts'
import { GatewayEvents } from './dispatch.gateway.ts'
import { Constants } from '../utils/Constants.ts'
import { Iseko } from '../types/Iseko.ts'

//@ts-ignore=Divide properties to recieved sent
export const GatewayPayloads: Record<
  keyof typeof Constants.OP,
  ({ client, payload }: { client: Iseko.LoggedIn; payload: Payload }) => void
> = {
  DISPATCH: ({ client, payload }) => {
    client.ws.sequence = payload.s!

    console.log(payload.t)

    if (
      !((t: string): t is keyof typeof Constants.Events =>
        // deno-lint-ignore no-prototype-builtins
        Constants.Events.hasOwnProperty(t))(payload.t!)
    )
      return
    GatewayEvents[payload.t]({
      client, //: new ReadyClient(client, payload),
      payload,
      eventRunner: (eventName, ...args) => {
        if (client.events && typeof client.events == 'object') {
          const event = client.events[eventName]
          //@ts-ignore=will fix later
          if (event) event({ ...args, client })
        }
      }
    })
  },
  HELLO: ({
    client: {
      ws: { heartbeat }
    },
    payload: {
      d: { heartbeat_interval }
    }
  }) => {
    heartbeat(heartbeat_interval)
  },
  RECONNECT: () => {
    console.log('RECONNECT')
    Deno.exit()
  }
}
