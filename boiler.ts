import {
  ActionBoiler,
  PromptBoiler,
  BoilerAction,
  BoilerPrompt,
} from "boiler-dev"

export const prompt: PromptBoiler = async () => {
  const prompts: BoilerPrompt[] = []

  // prompts.push({
  //   type: "input",
  //   name: "someValue",
  //   message: "some message",
  //   default: "some default",
  // })

  return prompts
}

export const install: ActionBoiler = async () => {
  const actions: BoilerAction[] = []

  actions.push({
    action: "generate",
    source: [
      "git@github.com:boiler-dev/ls-boiler.git",
      "git@github.com:boiler-dev/spawn-boiler.git",
    ],
  })

  actions.push({
    action: "npmInstall",
    dev: true,
    source: ["source-map-support"],
  })

  actions.push({
    action: "merge",
    path: "package.json",
    source: {
      deploy: "./bin/deploy",
    },
  })

  return actions
}

export const uninstall: ActionBoiler = async () => {
  const actions: BoilerAction[] = []

  actions.push({
    action: "generate",
    source: [
      "git@github.com:boiler-dev/ls-boiler.git",
      "git@github.com:boiler-dev/spawn-boiler.git",
    ],
    uninstall: true,
  })

  actions.push({
    action: "npmInstall",
    source: ["source-map-support"],
    uninstall: true,
  })

  return actions
}

export const generate: ActionBoiler = async () => {
  const actions: BoilerAction[] = []

  actions.push({
    action: "write",
    path: "src/deploy.ts",
    sourcePath: "tsignore/deploy.ts",
  })

  actions.push({
    action: "write",
    path: "bin/deploy",
    sourcePath: "deploy",
    bin: true,
  })

  return actions
}

export const absorb: ActionBoiler = async ({ writes }) => {
  return writes.map(({ path, sourcePath }) => ({
    action: "write",
    sourcePath: path,
    path: sourcePath,
    // modify: (src: string): string => src,
  }))
}
