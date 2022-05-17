import { GatewayPayload } from '../structures/GatewayPayload.ts'

export default new GatewayPayload(args => {
  args.client.ws.heartbeat(args.payload.d.heartbeat_interval)
})
