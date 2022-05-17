import { Iseko } from '../client/client.ts'
import { ClientEvents } from './ClientEvents.ts'

export class Event<Key extends keyof ClientEvents = keyof ClientEvents> {
  run: ({ client, ...args }: { client: Iseko } & ClientEvents[Key]) => void

  constructor(
    run: ({ client, ...args }: { client: Iseko } & ClientEvents[Key]) => void
  ) {
    this.run = run
  }
}

// export const Event = <Key extends keyof ClientEvents>(
//   run: ({
//     client,
//     ...args
//   }: {
//     client: Iseko
//   } & ClientEvents[Key]) => void
// ) => run
