import runCommand from './utils/runCommand'
const { readJsonFile, writeJsonFile } = require('./utils/jsonFile')

async function updatePackage (args, projectName) {
  console.log(`Creating package.json for ${projectName}`)
  args.chdir('act-cli/scripts/assets')
  const pacakgeFile = await readJsonFile('example-package.json')
  pacakgeFile.name = projectName
  packageFile.repository.url = `git+https://github.com/bbc/${projectName}.git`
  // find where you are running the node script from.
  // then await exec(`mkdir ${name}`)

  args.chdir(`../../../act-test-john`)
  await runCommand('npm init -y')
  await writeJsonFile('package.json', pacakgeFile)
}

export async function runBootstrap (args, name) {
  await updatePackage(args, name)
}


module.exports = {
  runBootstrap
}