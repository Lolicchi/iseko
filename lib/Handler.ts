import { parse } from './deps.ts'
import { Iseko } from './client/client.ts'
import { handlers } from './handlers/handlers.ts'
import { IModule } from './interfaces/IModule.ts'

export const handler = (client: Iseko): void => {
  const recursiveImport = async <ModuleType>(
    dirPath: string,
    mods: { name: string; mod: ModuleType }[] = []
  ) => {
    for await (const file of Deno.readDir(dirPath)) {
      if ((await Deno.stat(`${dirPath}/${file.name}`)).isDirectory)
        mods = await recursiveImport(file.name)

      mods.push({
        name: parse(file.name).name,
        mod: (await import(`${Deno.cwd()}/${dirPath}/${file.name}`)).default
      })
    }
    return mods
  }

  handlers.forEach(async handler => {
    const path = await handler.path(client)
    if (!path) return
    ;(await recursiveImport<IModule>(path)).forEach(importedModule =>
      //@ts-ignore=will fix later
      handler.run({ ...importedModule, client })
    )
  })
}
