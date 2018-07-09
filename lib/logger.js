const chalk = require('chalk')
const logger = console.log
module.exports = {
  cyan: (msg) => {
    logger(chalk.cyan(msg))
  },

  green: (msg) => {
    logger(chalk.green(msg))
  },

  red: (msg) => {
    logger(chalk.red(msg))
  },

  log: (msg = '') => {
    logger(msg)
  }
}