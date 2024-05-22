import fs from 'node:fs';
import chalk from 'chalk';
import { hello } from './hello.js';

const names = ['Romain', 'Toto', 'Titi'];

for (const n of names) {
  console.log(chalk.red.underline(hello(n)));
}

// Attention import.meta.dirname (Node 20.11 ou plus)
// et release candidate (risque de voir la variable renommée ou disparaitre du jour au lendemain)
console.log(fs.readFileSync(import.meta.dirname + '/package.json', { encoding: 'utf-8' }));

