import fs from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { minify } from "terser";
import minimist from "minimist";

const argv = minimist(process.argv);

const distPath = resolve(import.meta.dirname, "dist");
const srcPath = resolve(import.meta.dirname, "src");
const horlogeJsPath = resolve(srcPath, "js", "horloge.js");
const indexJsPath = resolve(srcPath, "js", "index.js");
const indexHtmlPath = resolve(srcPath, "index.html");
const indexHtmlDistPath = resolve(distPath, "index.html");
let appJsDistPath = resolve(distPath, "app.js");

async function emptyDir(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true });
  await fs.mkdir(dirPath);
}

async function buildJs() {
  const buffers = await Promise.all([
    fs.readFile(horlogeJsPath),
    fs.readFile(indexJsPath),
  ]);

  let hash = null;
  let bufferOrStr = Buffer.concat(buffers);

  if (argv.minify) {
    const { code } = await minify(bufferOrStr.toString('utf-8'));
    bufferOrStr = code;
  }

  if (argv.hash) {
    hash = createHash('md5').update(bufferOrStr).digest('hex');
    appJsDistPath = appJsDistPath.replace('.js', `.${hash}.js`);
  }

  await fs.writeFile(appJsDistPath, bufferOrStr);

  return hash;
}

async function buildHtml(hash) {
  let indexStr = await fs.readFile(indexHtmlPath, { encoding: "utf-8" });

  indexStr = indexStr
    .replace(
      '<script src="./js/horloge.js"></script>',
      hash ? `<script src="./app.${hash}.js"></script>` : '<script src="./app.js"></script>'
    )
    .replace('<script src="./js/index.js"></script>', "");

  await fs.writeFile(indexHtmlDistPath, indexStr);
}

await emptyDir(distPath);
const hash = await buildJs();
await buildHtml(hash);
