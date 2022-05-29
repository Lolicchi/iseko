import { Iseko } from '../client/client.ts'
import { IModule } from '../interfaces/IModule.ts'

export class Handler<
  ModName extends string = string,
  Module extends IModule = IModule
> {
  path: (client: Iseko) => Promise<string | null>
  run: ({
    client,
    name,
    mod
  }: {
    client: Iseko
    name: ModName
    mod: Module
  }) => void

  constructor(
    targetPath: string,
    run: ({
      client,
      name,
      mod
    }: {
      client: Iseko
      name: ModName
      mod: Module
    }) => void,
    condition?: (client: Iseko) => boolean | Promise<boolean>
  ) {
    this.path = async client => {
      if (condition && !(await condition(client))) return null
      const { [targetPath as 'events']: targetObject } = client

      try {
        await Deno.stat(
          targetObject && typeof targetObject == 'object' && targetObject.dir
            ? targetObject.dir
            : targetPath
        )
        return typeof targetObject == 'object' && targetObject.dir
          ? targetObject.dir
          : targetPath
      } catch (err) {
        if (err instanceof Deno.errors.NotFound)
          return targetObject &&
            typeof targetObject == 'object' &&
            targetObject.dir
            ? targetObject.dir
            : targetPath
        console.log('`Unknown Err ::', err)
        return null
      }
    }
    this.run = run
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
