import { dirname, fromFileUrl, parse } from './deps.ts'
import { Iseko } from './client/client.ts'
import { Handler } from './structures/Handler.ts'
import { IModule } from './interfaces/IModule.ts'

export const handler = async (client: Iseko): Promise<void> => {
  const recursiveImport = async <ModuleType>(
      dirPath: string,
      mods: { name: string; mod: ModuleType }[] = []
    ) => {
      for await (const file of Deno.readDir(dirPath)) {
        if ((await Deno.stat(`${dirPath}/${file.name}`)).isDirectory)
          mods = await recursiveImport(file.name)

        mods.push({
          name: parse(file.name).name,
          mod: (await import(`file:${dirPath}/${file.name}`)).default
        })
      }
      return mods
    },
    __dirname = dirname(fromFileUrl(import.meta.url))
  // __dirname = dirname(
  // fromFileUrl(
  //   import.meta.url.startsWith('https://')
  //     ? import.meta.url.replace('https', 'file')
  //     : import.meta.url
  // )
  // )

  recursiveImport<Handler>(`${__dirname}/handlers`).then(handlers =>
    handlers.forEach(async ({ mod: h }) => {
      if (h.condition && !h.condition()) return
      ;(await recursiveImport<IModule>(`${__dirname}/${h.path}`)).forEach(
        ({ name, mod }) => h.run({ modName: name, module: mod, client })
      )
    })
  )

  try {
    await Deno.stat(`${__dirname}/../../events`)
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) return
    console.log(err)
  }
}
