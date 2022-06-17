// deno-lint-ignore-file no-explicit-any
import { ApiRequest } from '../structures/ApiRequest.ts'

export class Cacher<Structure extends new (...args: any[]) => any> {
  protected cache = new Map<string, Structure>()

  constructor(protected api: ApiRequest, private structureClass: Structure) {}

  async get(id?: string) {
    if (id && this.cache.has(id)) return this.cache.get(id)
    const gatewayStructure = await this.api.guilds.get()
    if (!gatewayStructure)
      throw `Couldn't fetch ${this.structureClass.prototype.name}`
    return new this.structureClass(gatewayStructure)
  }

  set(structure: Structure & { id: string }) {
    if (this.cache.has(structure.id)) return
    this.cache.set(structure.id, structure)
  }
}
