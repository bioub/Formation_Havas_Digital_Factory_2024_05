import process from 'node:process';

// arguments du programme
console.log(process.argv);

// variables d'environnement
console.log(process.env);

// Current Working Dir (CWD)
// -> la où se trouve le terminal
console.log(process.cwd());
process.chdir('..')
console.log(process.cwd());

// Infos
console.log(process.platform); // darwin (macOS), win32, linux...
console.log(process.arch); // arm64
console.log(process.memoryUsage());
console.log(process.cpuUsage());
console.log(process.uptime());
console.log(process.version);

// Entrée et sortie standard (clavier et le terminal)
// process.stdin, process.stdout
process.stdout.write('Sans retour à la ligne')
console.log('Avec retour à la ligne')

process.exit(0); // kill le programme avec succès
process.exit(1); // kill le programme avec erreur
