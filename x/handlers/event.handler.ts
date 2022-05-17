import { Handler } from '../structures/Handler.ts'
import { type ClientEvents } from '../structures/ClientEvents.ts'
import { type Event } from '../structures/Event.ts'

export default new Handler<keyof ClientEvents, Event>(
  'events',
  ({ modName, module: { run }, client: { events } }) =>
    events && (events[modName] = run),
  () => false // check if events dir exist
)

// export default Handler<keyof ClientEvents, typeof Event>(
//   'events',
// ({ modName, module, client: { events } }) => {
//   if (events) events[modName] = module
// }
// )
