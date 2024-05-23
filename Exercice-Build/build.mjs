import fs from "node:fs/promises";
import { resolve } from "node:path";
import md5 from "md5";
import { minify } from "terser";

const distPath = resolve(import.meta.dirname, "dist");
const srcPath = resolve(import.meta.dirname, "src");
const horlogeJsPath = resolve(srcPath, "js", "horloge.js");
const indexJsPath = resolve(srcPath, "js", "index.js");
const indexHtmlPath = resolve(srcPath, "index.html");
const indexHtmlDistPath = resolve(distPath, "index.html");
const appJsDistPath = resolve(distPath, "app.js");

async function emptyDir(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true });
  await fs.mkdir(dirPath);
}

async function buildJs() {
  const horlogeBuffer = await fs.readFile(horlogeJsPath);
  await fs.appendFile(appJsDistPath, horlogeBuffer);

  const indexBuffer = await fs.readFile(indexJsPath);
  await fs.appendFile(appJsDistPath, indexBuffer);

  return "abc";
}

async function buildHtml() {
  let indexStr = await fs.readFile(indexHtmlPath, { encoding: "utf-8" });

  indexStr = indexStr
    .replace(
      '<script src="./js/horloge.js"></script>',
      '<script src="./app.js"></script>'
    )
    .replace('<script src="./js/index.js"></script>', "");

  await fs.writeFile(indexHtmlDistPath, indexStr);
}

await emptyDir(distPath);
const valABC = await buildJs();
await buildHtml();
