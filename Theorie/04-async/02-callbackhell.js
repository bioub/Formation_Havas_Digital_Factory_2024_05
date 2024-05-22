import fs from "node:fs";

try {
  const buffer = fs.readFileSync("package.json");
  fs.writeFileSync("package.json.copy", buffer);
  console.log("Copy done");
} catch (err) {
  console.log(err);
}

// Callback Hell / Pyramid of Doom
fs.readFile("package.json", (err, buffer) => {
  if (err) {
    console.log(err);
  } else {
    fs.writeFile("package.json.copy", buffer, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Copy done");
      }
    });
  }
});
