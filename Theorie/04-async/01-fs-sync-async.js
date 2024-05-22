import fs from "node:fs";

// Sync
// Avantage : simple à lire/écrire (les lignes s'éxecutent dans l'ordre)
// Inconvénient : thread bloqué le temps de l'opération (à banir sur un serveur)
const buffer = fs.readFileSync('package.json')
console.log(buffer.toString('utf-8'));

// peut être raccourci :
// const string = fs.readFileSync('package.json', { encoding: 'utf-8' });

// Async
// Avantage : thread libre le temps de l'opération (à utiliser sur un serveur)
// Inconvénient : plus dur à lire/écrire (les lignes s'éxecutent pas dans l'ordre, parfois l'ordre n'est pas prévisible)
fs.readFile('package.json', (err, buffer) => {
  console.log(buffer.toString('utf-8'));
});

fs.readFile('01-fs-sync-async.js', (err, buffer) => {
  console.log(buffer.toString('utf-8'));
});

// do {
//   executeJSCallStack();
// } while(thereIsTaskToExecute())


// ^
// |
// |
// |                                                                      [log   ][log        ]
// |[readFileSync                 ][log][readFile][readFile] ..⟳..        [taskJs][taskPackage]
// +0ms---------------------------2ms----------------------------------------5ms---->


// file d'attente de tache 5ms : taskPackage
// file d'attente de tache 6ms :
