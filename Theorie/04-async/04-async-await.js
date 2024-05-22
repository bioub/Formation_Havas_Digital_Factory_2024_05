import fs from "node:fs/promises";

// Async (style async/await)
// Avantage : simple à lire/écrire (les lignes s'éxecutent dans l'ordre)
// Avantage : thread libre le temps de l'opération (à utiliser sur un serveur)
async function copy() {
  try {
    const buffer = await fs.readFile("package.json");
    await fs.writeFile("package.json.copy", buffer);
    console.log("Copy done");
  } catch (err) {
    console.log(err);
  }
}

copy();
