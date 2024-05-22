// (function (exports, require, module, __filename, __dirname) {
  const {default: chalk} = require('chalk');
  const { hello } = require('./hello');

  const names = ['Romain', 'Toto', 'Titi'];

  for (const n of names) {
    console.log(chalk.red(hello(n)));
  }

// })
