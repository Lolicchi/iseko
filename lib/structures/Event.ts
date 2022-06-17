import { ClientEvents } from './ClientEvents.ts'
import { Iseko } from '../types/Iseko.ts'

export class Event<Key extends keyof ClientEvents = keyof ClientEvents> {
  constructor(
    public run: ({
      client,
      ...args
    }: { client: Iseko.LoggedIn } & ClientEvents[Key]) => void
  ) {}
}

// export const Event = <Key extends keyof ClientEvents>(
//   run: ({
//     client,
//     ...args
//   }: {
//     client: Iseko
//   } & ClientEvents[Key]) => void
// ) => run
