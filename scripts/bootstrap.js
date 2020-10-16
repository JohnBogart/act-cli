import runCommand from './utils/runCommand'

async function updatePackage (projectName) {
  console.log(`Creating package.json for ${projectName}`)
  await runCommand('npm init -y')
}

export async function runBootstrap (args, name) {
  args.chdir(name)
  await updatePackage(name)
}


module.exports = {
  runBootstrap
}