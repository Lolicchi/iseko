import { type Iseko } from '../client/client.ts'
import { type IPayload } from '../interfaces/IPayload.ts'
import { ClientEvents } from './ClientEvents.ts'

export class GatewayEvent {
  run: (args: {
    client: Iseko
    payload: IPayload
    eventRunner: <Event extends keyof ClientEvents = keyof ClientEvents>(
      eventName: Event,
      ...eventArgs: ClientEvents[Event]
    ) => void
  }) => void

  constructor(
    run: (args: {
      client: Iseko
      payload: IPayload
      eventRunner: <Event extends keyof ClientEvents = keyof ClientEvents>(
        eventName: Event,
        ...eventArgs: ClientEvents[Event]
      ) => void
    }) => void
  ) {
    this.run = run
  }
}
