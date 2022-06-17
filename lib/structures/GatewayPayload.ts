import { type Iseko } from '../client/client.ts'
import { type Payload } from '../interfaces/Payload.ts'

export interface GatewayPayload {
  [key: string]: (args: { client: Iseko; payload: Payload }) => void
}
