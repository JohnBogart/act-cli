import prompts from 'prompts'
import exec from './utils/asyncExec'
import { runBootstrap } from '../scripts/bootstrap'

const report = (...messages) => console.log('[ACT-CLI]', ...messages)

async function checkNodeVersion () {
  const nodeVersion = await exec('node -v')

  const nv = parseInt(nodeVersion.stdout.substring(1))
  if (nv < 10) {
    throw new Error('Please ensure you are running node 10 or greater')
  } else {
    return report('Node version OK!')
  }
}

async function nameRepo () {
  const response = await prompts({
    type: 'text',
    name: 'name',
    message: 'Please name your test repo:'
  })

  return `act-test-${response.name}`
}

export async function cli (args) {
  report('START')
  report('Checking Node Version')
  await checkNodeVersion()
  // const name = await nameRepo()
  const name = 'act-test-john'
  report(name)
  // report('Creating project')
  // args.chdir(`act-cli`)
  // report(`Current Directory: ${args.cwd()}`)
  // report('Project directory created')
  report(`Setting up ${name}`)
  await runBootstrap(args, name)
  report('Set up complete')

  // npm run bootstrap (move all of our set up code from act-test-template into here)
  // report(`Configuring Git for ${name}`)
  // git init
  // git add .
  // git commit -m "Initial commit"
  // hub create bbc/${name}
  // report(`Setup for ${name}` complete!)
}
