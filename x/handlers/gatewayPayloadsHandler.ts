import { gatewayPayloads } from '../client/ws.client.ts'
import { type IHandler } from '../interfaces/IHandler.ts'
import { type GatewayPayload } from '../structures/GatewayPayload.ts'
import { Constants } from '../utils/Constants.ts'

const gatewayPayloadHandler: IHandler<
  keyof typeof Constants.OP,
  GatewayPayload
> = {
  path: 'gatewayPayloads',
  run({ modName, module }) {
    gatewayPayloads.set(Constants.OP[modName], module)
  }
}

export default gatewayPayloadHandler
