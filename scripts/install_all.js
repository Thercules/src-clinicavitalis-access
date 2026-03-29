const path = require('path')
const { execSync } = require('child_process')

const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'
const WHITE = '\x1b[37m'

const rootDir = path.resolve(__dirname, '..')
const bffDir = path.join(rootDir, 'src', 'bff')
const clientDir = path.join(rootDir, 'src', 'client')

function showSuccessBanner() {
  console.log(`
${BOLD}${GREEN}██    ██ ██ ████████  █████  ██      ██ ███████${RESET}
${BOLD}${GREEN}██    ██ ██    ██    ██   ██ ██      ██ ██     ${RESET}
${BOLD}${GREEN}██    ██ ██    ██    ███████ ██      ██ ███████${RESET}
${BOLD}${GREEN} ██  ██  ██    ██    ██   ██ ██      ██      ██${RESET}
${BOLD}${GREEN}  ████   ██    ██    ██   ██ ███████ ██ ███████${RESET}
${DIM}${WHITE}╚══════╝ ╚╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚╝ ╚═════╝${RESET}

${BOLD}${GREEN}✨ All installations completed successfully!${RESET}
  `)
}

try {
  console.log(`${BOLD}${GREEN}[1/3]${RESET} Installing root dependencies...`)
  execSync('npm install', { cwd: rootDir, stdio: 'inherit' })
  console.log(`${BOLD}${GREEN}✓ Root dependencies installed${RESET}\n`)

  console.log(`${BOLD}${GREEN}[2/3]${RESET} Installing BFF dependencies...`)
  execSync('npm install', { cwd: bffDir, stdio: 'inherit' })
  console.log(`${BOLD}${GREEN}✓ BFF dependencies installed${RESET}\n`)

  console.log(`${BOLD}${GREEN}[3/3]${RESET} Installing Client dependencies...`)
  execSync('npm install', { cwd: clientDir, stdio: 'inherit' })
  console.log(`${BOLD}${GREEN}✓ Client dependencies installed${RESET}\n`)

  showSuccessBanner()
} catch (error) {
  console.error(`${BOLD}${RED}Error during installation:${RESET}`, error.message)
  process.exit(1)
}