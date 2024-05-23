import fs from 'node:fs';
import util from 'node:util';

// Si on veut utiliser un API sous forme de promesses :
// - idéalement il existe déjà sous Node (node:fs/promises)
// - il existe sous forme d'une bibliothère à installer (execa pour node:child_process)
// - il faut la créer soit meme

// soit avec new Promise :
function readFilePromise(filePath, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}

// soit avec promisify :
const writeFilePromise = util.promisify(fs.writeFile);

readFilePromise('package.json', { encoding: 'utf-8' })
  .then((content) => {
    return writeFilePromise('package.json.copy', content);
  })
  .then(() => {
    console.log('Copy done');
  })
  .catch((err) => {
    console.log(err);
  });
