import { hello } from './hello.js';

const names = ['Romain', 'Toto', 'Titi'];

for (const n of names) {
  console.log(hello(n));
}
