import { Iseko } from '../client/client.ts'
import { Member } from '../guild/member.guild.ts'

export interface ClientEvents {
  login: [client: Iseko]
  ready: [client: Iseko<true>]
  messageCreate: [message: [content: string]]
  debug: [data: string]
  guildMemberUpdate: [member: Member]
  guildMemberAdd: [member: Member]
}
