const inquirer = require('inquirer')
const downloadAndGenerate = require('./generate')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'enter you proj name:',
    default: 'name'
  },
  {
    type: 'input',
    name: 'description',
    message: 'description:',
    default: 'a vue admin project'
  },
  {
    type: 'list',
    name: 'tmpType',
    message: '选择模板:',
    choices: ['一级导航', '二级导航', '二级导航+顶部导航']
  }

]

module.exports = function ask(name) {
  questions[0].default = name
  inquirer.prompt(questions).then(answers => {
    downloadAndGenerate(answers)
  })
}