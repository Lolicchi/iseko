import { type Iseko } from '../client/client.ts'
import { type IPayload } from '../interfaces/IPayload.ts'

export interface GatewayPayload {
  [key: string]: (args: { client: Iseko; payload: IPayload }) => void
}
