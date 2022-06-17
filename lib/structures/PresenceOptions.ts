export class PresenceOptions {
  since: number | null
  status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline'
  afk: boolean

  constructor(args?: {
    since?: number | null
    status?: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline'
    afk?: boolean
  }) {
    this.since = args?.since || null
    this.status = args?.status || 'online'
    this.afk = args?.afk || false
  }
}
