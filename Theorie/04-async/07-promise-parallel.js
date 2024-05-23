import fs from "node:fs/promises";
import { setTimeout } from "node:timers/promises";

// Pour paralléliser des opérations avec des promesses
// on a 4 méthodes possibles :
// - Promise.all
// - Promise.race
// - Promise.allSettled
// - Promise.any

// Promise.all
// on lance plusieurs promesses en même temps
// la promesse combinée sera résolue lorsque toutes les promesses
// en entrée auront été résolues
// Use case :
// - lire plusieurs fichiers en même temps pour les écrires dans l'ordre
// - envoyer plusieurs requetes HTTP dans un composant React en même temps
// et combiner les résultats
// Exemple :

const buffers = await Promise.all([fs.readFile("package.json"), fs.readFile("01-fs-sync-async.js")]);
const packageBuffer = buffers[0];
console.log(packageBuffer.toString('utf-8'));

// Inconvénient de Promise.all, si l'une des promesses est rejetée, l'ensemble est rejeté
// Sinon on peut utiliser Promise.allSettled, retourne tous les résultats avec pour chaque l'info s'il est
// est en succès ou non
const results = await Promise.allSettled([fs.readFile("package.jso"), fs.readFile("01-fs-sync-async.js")]);
console.log(results);

// Promise.race
// on lance plusieurs promesses en même temps
// la promesse combinée sera résolue lorsque la première
// en entrée aura été résolue
// Use case : une opération avec un timeout
const result = await Promise.race([
  fs.readFile('05-top-level-await.js').then((buffer) => ({type: 'buffer', value: buffer})),
  setTimeout(1).then((buffer) => ({type: 'timeout'})),
]);

console.log(result);

// Inconvénient si la première échoue l'ensemble échoue, avec Promise.any si la première échoue on attend la suivante
// c'est que si toutes échouent que l'ensemble échoue
// Use case : trouver le serveur mirroir le plus rapide
