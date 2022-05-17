import { GatewayPayload } from '../structures/GatewayPayload.ts'

export default new GatewayPayload(() => {
  console.log('Request to reconnect.')
})
