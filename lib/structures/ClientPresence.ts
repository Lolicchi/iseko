import { ClientWebSocket } from '../client/ws.client.ts'
import { Resolvable } from '../types/Resolvable.ts'
import { Presence } from './Presence.ts'
import { PresencePayload } from './PresencePayload.ts'

export class ClientPresence extends Presence {
  constructor(private ws: ClientWebSocket) {
    super([])
  }

  set(...presenceData: Resolvable<typeof Presence>) {
    this.ws.send(
      JSON.stringify({
        op: 3,
        d:
          presenceData[0] instanceof Presence
            ? new PresencePayload(presenceData[0])
            : '' // fix this
      })
    )
  }
}
