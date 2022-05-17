import { ClientUser } from '../client/user.client.ts'
import { GatewayEvent } from '../structures/GatewayEvent.ts'

export default new GatewayEvent(
  ({
    client,
    payload: {
      d: { user, session_id }
    },
    eventRunner
  }) => {
    eventRunner('login', client)
    client.user = new ClientUser(user)
    client.ws.sessionId = session_id
    eventRunner('ready', client)
  }
)
