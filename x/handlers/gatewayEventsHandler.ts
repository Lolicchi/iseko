import { type IHandler } from '../interfaces/IHandler.ts'
import { type GatewayEvent } from '../structures/GatewayEvent.ts'
import { type Constants } from '../utils/Constants.ts'
import { gatewayEvents } from '../gatewayPayloads/DISPATCH.ts'

const gatewayEventsHandler: IHandler<
  keyof typeof Constants.Events,
  GatewayEvent
> = {
  path: 'gatewayEvents',
  run({ modName, module }) {
    gatewayEvents.set(modName, module)
  }
}

export default gatewayEventsHandler
