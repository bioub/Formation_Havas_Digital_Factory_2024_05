import readline from 'node:readline';
import readlinePromise from 'node:readline/promises';
import fs from 'node:fs';

// Les promesses ne fonctionnent pas si le callback
// est appelé plusieurs fois, ex :
// X setInterval
// X addEventListener
// X WebSocket
// X Worker

// cependant plusieurs solutions existent :
// - rester en callback "classique", le code est pas toujours illisible
// - utiliser des Observables (exemple rxjs dans Angular)
// - async iterator (ES2017 mais très peu connu)

// Exemple on va lire le fichier package.json ligne par ligne
// le callback va s'exécuter pour chaque ligne

// Sans Async iterator :
const rl = readline.createInterface(
  fs.createReadStream('package.json')
)

let lineNb = 1;
rl.on('line', (line) => {
  console.log(lineNb++, line);
})

// Avec Async iterator
const rlP = readlinePromise.createInterface(
  fs.createReadStream('package.json')
)

let lineNbP = 1;

for await (const line of rlP) {
  console.log(lineNbP++, line);
}

