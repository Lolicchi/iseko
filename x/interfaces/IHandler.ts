import { type Iseko } from '../client/client.ts'
import { type IModule } from './IModule.ts'

export interface IHandler<
  ModName extends string = string,
  Module extends IModule = IModule
> {
  path: string
  run(args: { client: Iseko; modName: ModName; module: Module }): void
}
