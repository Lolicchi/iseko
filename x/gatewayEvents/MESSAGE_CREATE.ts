import { GatewayEvent } from '../structures/GatewayEvent.ts'

export default new GatewayEvent(args => {
  args.eventRunner('messageCreate', args.payload.d)
})
