import { IPayload } from '../interfaces/IPayload.ts'
import { Iseko } from '../client/client.ts'
import { GatewayEvents } from './dispatch.gateway.ts'
import { Constants } from '../utils/Constants.ts'

export const GatewayPayloads: Record<
  keyof typeof Constants.OP,
  ({ client, payload }: { client: Iseko; payload: IPayload }) => void
> = {
  DISPATCH: ({ client, payload }) => {
    client.ws.sequence = payload.s!

    if (
      !((t: string): t is keyof typeof Constants.Events =>
        // deno-lint-ignore no-prototype-builtins
        Constants.Events.hasOwnProperty(t))(payload.t!)
    )
      return

    GatewayEvents[payload.t]({
      client,
      payload,
      eventRunner: (eventName, ...args) => {
        if (client.events && typeof client.events == 'object') {
          const event = client.events[eventName]

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
  }
}
