const async = require('async')
const Metalsmith = require('metalsmith')
const render = require('consolidate').handlebars.render
const path = require('path')
const logger = require('./logger')
const download = require('download-git-repo')
const exists = require('fs').existsSync
const ora = require('ora')
const home = require('user-home')
const rm = require('rimraf').sync

const spinner = ora({ text: 'generating project ...' })
const tmp = path.join(home, '.vadmin-templates')
const src = path.join(tmp, 'template')
var dest = process.cwd()

function success(metadata) {
  logger.log()
  spinner.succeed(`Success Generated ${metadata.name}.`)
  logger.log('To get started:')
  logger.green(`    cd ${metadata.name}\n    npm install\n    npm start`)
  logger.log()
}

function generate(metadata) {
  const metalsmith = Metalsmith(src)
    .use(renderTemplate)
    .source('.')
    .destination(path.join(dest, metadata.name))
    .build(function (err) {
      if (err) throw err
      spinner.stop()
      success(metadata)
    })

  /**
   * Template in place plugin.
   *
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  function renderTemplate(files, metalsmith, done) {
    var keys = Object.keys(files)
    async.each(keys, (file, next) => {
      const str = files[file].contents.toString()
      let fileName = file.toLowerCase()
      if (fileName !== 'read.md' && fileName !== 'index.html' && fileName !== 'package.json') {
        return next()
      }
      // 渲染包含{{}}的文件,将inquirer获取到的值写入替换掉{{}}
      render(str, metadata, (err, res) => {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer(res)
        next()
      })
    }, done)
  }
}

module.exports = function downloadAndGenerate(metadata) {
  let repo
  switch (metadata.tmpType) {
    case '一级导航':
      repo = 'weenta/template-vadmin-default'
      break
    case '二级导航':
      repo = 'weenta/template-vadmin-default'
      break
    case '二级导航+顶部导航':
      repo = 'weenta/template-vadmin-default'
      break
  }
  if (exists(tmp)) rm(tmp)

  spinner.start()
  download(repo, tmp, (err) => {
    if (err) {
      spinner.fail([err.message])
    } else {
      generate(metadata)
    }
  })

}
