import fs from "node:fs/promises";

// Callback hell
// fs.readFile("package.json")
//   .then((buffer) => {
//     fs.writeFile("package.json.copy", buffer)
//       .then(() => {
//         console.log("Copy done");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// si un callback dans la chaine (de .then ou .catch)
// retourne une promesse, on a plus besoin d'imbriqué
// (les .then/.catch suivant portent sur la promesse retournée)
// fs.readFile("package.json")
//   .then((buffer) => {
//     return fs.writeFile("package.json.copy", buffer);
//   })
//   .then(() => {
//     console.log("Copy done");
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// en version compactée :
fs.readFile("package.json")
  .then((buffer) => fs.writeFile("package.json.copy", buffer))
  .then(() => console.log("Copy done"))
  .catch((err) => console.log(err));
