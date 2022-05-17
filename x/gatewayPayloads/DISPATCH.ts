import { GatewayEvent } from '../structures/GatewayEvent.ts'
import { GatewayPayload } from '../structures/GatewayPayload.ts'
import { Constants } from '../utils/Constants.ts'

export const gatewayEvents: Map<keyof typeof Constants.Events, GatewayEvent> =
  new Map()

export default new GatewayPayload(({ client, payload }) => {
  client.ws.sequence = payload.s!

  const gatewayEventMod = gatewayEvents.get(payload.t!)

  if (!gatewayEventMod) return

  gatewayEventMod.run({
    client,
    payload,
    eventRunner: (eventName, ...args) => {
      if (client.events) {
        const event = client.events[eventName]
        if (event) event({ ...args, client })
      }
    }
  })
})
