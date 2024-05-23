import path from 'node:path';

console.log(path.join('dossier', 'fichier.txt'));
console.log(path.resolve('dossier', 'fichier.txt'));
console.log(path.extname(import.meta.filename));
console.log(path.basename(import.meta.filename));
console.log(path.parse(import.meta.filename));
