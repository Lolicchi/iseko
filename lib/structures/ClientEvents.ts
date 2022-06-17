import { Member } from '../guild/member.guild.ts'
import { Iseko } from '../types/Iseko.ts'

export interface ClientEvents {
  // deno-lint-ignore ban-types
  login: {}
  ready: { client: Iseko.Ready }
  messageCreate: { message: { content: string; channel_id: string } }
  debug: { data: string }
  guildMemberUpdate: { member: Member }
  guildMemberAdd: { member: Member }
  guildMemberRemove: { member: Member }
}
