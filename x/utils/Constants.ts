export const Constants = {
  OP: {
    DISPATCH: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    PRESENCE_UPDATE: 3,
    VOICE_STATE_UPDATE: 4,
    RESUME: 6,
    RECONNECT: 7,
    HELLO: 10,
    HEARTBEAT_ACK: 11
  },
  Gateway: {
    URL: 'wss://gateway.discord.gg/?v=9&encoding=json'
  },
  API: 'https://discord.com/api/v9',
  Endpoints: {
    getGuilds: '/users/@me/guilds',
    getGuild: (guildId: string) => `/guilds/${guildId}`,
    getGuildChannels: (guildId: string) => `/guilds/${guildId}/channels`,
    getChannel: (channelId: string) => `/channels/${channelId}`
  },
  Events: {
    READY: 'ready',
    MESSAGE_CREATE: 'messageCreate',
    GUILD_MEMBER_UPDATE: 'guildMemberUpdate',
    GUILD_MEMBER_ADD: 'guildMemberAdd'
  },
  Presence: {
    PLAYING: 0,
    STREAMING: 1
  }
}
