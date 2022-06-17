import { type Iseko } from '../client/client.ts'
import { type Payload } from '../interfaces/Payload.ts'
import { ClientEvents } from './ClientEvents.ts'

export class GatewayEvent {
  run: (args: {
    client: Iseko
    payload: Payload
    eventRunner: <Event extends keyof ClientEvents = keyof ClientEvents>(
      eventName: Event,
      ...eventArgs: ClientEvents[Event]
    ) => void
  }) => void

  constructor(
    run: (args: {
      client: Iseko
      payload: Payload
      eventRunner: <Event extends keyof ClientEvents = keyof ClientEvents>(
        eventName: Event,
        ...eventArgs: ClientEvents[Event]
      ) => void
    }) => void
  ) {
    this.run = run
  }
}
