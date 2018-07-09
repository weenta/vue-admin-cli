#!/usr/bin/env node

const program = require('commander')
const logger = require('../lib/logger')
const asker = require('../lib/asker')

program
  .version(require('../package.json').version)
  .command('init <name>')
  .description('生成后台管理项目')
  .action(function (name) {
    initProj(name)
  })

/**
 * help
 */
program.on('--help', function () {
  logger.log('  Examples:')
  logger.log('')
  logger.cyan('    # 初始化项目:')
  logger.cyan('    $ vadmin init project-name')
  logger.log('')
})

program.parse(process.argv)

function initProj(name) {
  asker(name)
}

