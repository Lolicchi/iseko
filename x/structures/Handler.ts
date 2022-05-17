import { Iseko } from '../client/client.ts'
import { IModule } from '../interfaces/IModule.ts'

export class Handler<
  ModName extends string = string,
  Module extends IModule = IModule
> {
  path: string
  run: (args: { client: Iseko; modName: ModName; module: Module }) => void
  condition: (() => boolean) | undefined

  constructor(
    path: string,
    run: (args: { client: Iseko; modName: ModName; module: Module }) => void,
    condition?: () => boolean
  ) {
    this.path = path
    this.run = run
    this.condition = condition
  }
}

// export const Handler = <
//   ModName extends string = string,
//   Module extends IMod = IMod
// >(
//   path: string,
//   run: (args: { client: Iseko; modName: ModName; module: Module }) => void,
//   condition?: () => boolean
// ) => Object.assign(run, { path, condition })
