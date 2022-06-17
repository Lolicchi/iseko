import { Iseko } from '../types/Iseko.ts'
import { ClientEvents } from '../structures/ClientEvents.ts'

export type Events = {
  [Key in keyof ClientEvents]?: ({
    client,
    ...args
  }: { client: Iseko.LoggedIn } & ClientEvents[Key]) => void
}
