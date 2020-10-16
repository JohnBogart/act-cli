import prompts from 'prompts'
import exec from './utils/asyncExec'

const report = (...messages) => console.log('[ACT-CLI]', ...messages)

async function checkNodeVersion () {
  const nodeVersion = await exec('node -v')

  let nv = parseInt(nodeVersion.stdout.substring(1))
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
  const name = await nameRepo()
  report(name)
  report('Creating project')
  await exec(`mkdir ${name}`)
  args.chdir(`${name}`)
  report(`Current Directory: ${args.cwd()}`)
  report('Project directory created')
  report(`Setting up ${name}`)
  await exec('node scripts/bootstrap.js')
  report('Set up complete')

  // npm run bootstrap (move all of our set up code from act-test-template into here)
  // report(`Configuring Git for ${name}`)
  // git init
  // git add .
  // git commit -m "Initial commit"
  // hub create bbc/${name}
  // report(`Setup for ${name}` complete!)


}