import { parse } from './deps.ts'
import { handlers } from './handlers/handlers.ts'
import { IModule } from './interfaces/IModule.ts'
import { Iseko } from './types/Iseko.ts'

export const handler = (client: Iseko.LoggedIn): void => {
  const recursiveImport = async <ModuleType>(
    dirPath: string,
    mods: { name: string; mod: ModuleType }[] = []
  ) => {
    for await (const file of Deno.readDir(dirPath)) {
      if ((await Deno.stat(`${dirPath}/${file.name}`)).isDirectory)
        mods = await recursiveImport(file.name)

      mods.push({
        name: parse(file.name).name,
        mod: (await import(`file://${Deno.cwd()}/${dirPath}/${file.name}`))
          .default
      })
    }
    return mods
  }

  handlers.forEach(async handler => {
    const path = await handler.path(client)
    if (!path) return
    ;(await recursiveImport<IModule>(path)).forEach(importedModule =>
      //@ts-ignore=name is of type string, make it accept type string
      handler.run({
        ...importedModule,
        client
      })
    )
  })
}
