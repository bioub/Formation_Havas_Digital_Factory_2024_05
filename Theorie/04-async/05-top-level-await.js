// ES2022 Top Level Await
import fs from "node:fs/promises";

// Avec Top Level Await
// on peut utiliser directement await à la racine du module ESM (ESM uniquement)

try {
  const buffer = await fs.readFile("package.json");
  await fs.writeFile("package.json.copy", buffer);
  console.log("Copy done");
} catch (err) {
  console.log(err);
}

