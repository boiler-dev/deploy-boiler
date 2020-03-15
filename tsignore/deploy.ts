import { basename, join, relative } from "path"

import ls from "./ls"
import spawn from "./spawn"

export class Deploy {
  async run(args: string[]): Promise<void> {
    const root = join(__dirname, "../../")
    const { files } = await ls.run(join(root, "deploy"))

    if (!args.length) {
      args = files.map(file => relative(root, file))
    }

    for (const file of files) {
      for (const arg of args) {
        const rel = relative(root, file)
        const baseMatch = basename(rel) === basename(arg)
        const serverless = rel.match(
          /\/serverless.[^.]+.yml$/
        )

        if (baseMatch && serverless) {
          await spawn.run("npx", {
            args: ["serverless", "deploy", "-c", rel],
            stdout: true,
          })
        }
      }
    }
  }
}

export default new Deploy()
