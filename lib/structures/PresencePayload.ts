import { Presence } from '../structures/Presence.ts'
import { ActivityPayload } from './ActivityPayload.ts'

export class PresencePayload {
  since: number | null
  activities: ActivityPayload[]
  status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline'
  afk: boolean

  constructor(presence: Presence) {
    this.since = presence.since ? presence.since : null
    this.activities = presence.activities.map(
      activity => new ActivityPayload(activity)
    )
    this.status = presence.status ? presence.status : 'online'
    this.afk = presence.afk ? presence.afk : false
  }
}
