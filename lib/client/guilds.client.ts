import { ApiRequest } from '../structures/ApiRequest.ts'
import { Cacher } from '../structures/Cacher.ts'
import { Guild } from '../structures/Guild.ts'

export class Guilds extends Cacher<typeof Guild> {
  constructor(api: ApiRequest) {
    super(api, Guild)
  }
}
