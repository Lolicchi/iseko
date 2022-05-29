import { Handler } from '../structures/Handler.ts'
import { type ClientEvents } from '../structures/ClientEvents.ts'
import { type Event } from '../structures/Event.ts'

export const handlers = [
  new Handler<keyof ClientEvents, Event>(
    'events',
    ({ name, mod: { run }, client: { events } }) =>
      typeof events == 'object' && (events[name] = run)
  )
]
