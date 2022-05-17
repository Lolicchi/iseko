import { ClientUser } from '../client/user.client.ts'

export interface Iseko<isReady extends boolean> {
  user: isReady extends true ? ClientUser : null
}
