// Un stream est une abstracion d'une suite d'octet
// qu'on peut manipuler dans le temps
// ReadStream + WriteStream dans le même stream => DuplexStream
// ReadStream + Transformation + WriteStream dans le même stream => TransformStream

import fs from 'node:fs';
import { createGzip } from 'node:zlib';


const readStream = fs.createReadStream('bigfile.html');
const writeStream = fs.createWriteStream('bigfile.html.zip');

readStream.on('open', () => {
  console.log('file open');
})

readStream.on('data', () => {
  console.log('data received');
})

// cat bigfile.html | gzip > bigfile.html.zip
readStream.pipe(createGzip()).pipe(writeStream)
