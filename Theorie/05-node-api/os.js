import os from 'node:os';

// Infos
console.log(os.platform()); // darwin (macOS), win32, linux...
console.log(os.arch()); // arm64
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.cpus());
console.log(os.uptime());
console.log(os.version());
