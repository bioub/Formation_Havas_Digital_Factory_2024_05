const mysql = require('mysql2/promise');

const todos = [
  {
    id: 1,
    title: 'Acheter du pain',
    completed: false,
  },
  {
    id: 2,
    title: 'Introduire Express',
    completed: true,
  }
];

function generateId() {
  const maxId = todos.reduce((acc, c) => c.id > acc ? c.id : acc, 0);
  return maxId + 1;
}

async function find() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'formation_havas_2024_05',
  });

  const [results] = await connection.query(
    'SELECT `id`, `title`, `completed` FROM `todos` LIMIT 0, 100'
  );

  return results;
}

async function findById(id) {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'formation_havas_2024_05',
  });

  const [results] = await connection.execute(
    'SELECT `id`, `title`, `completed` FROM `todos` WHERE `id` = ?',
    [id]
  );

  return results[0];
}

function create(todo) {
  // Exercice
  // En utilisant une requete préparée (la méthode execute comme dans findById)
  // Exécuter une requête INSERT pour créer la todo
  // Comme précédemment retourner un object todo avec le nouvel id
  // Exemple INSERT : https://sidorares.github.io/node-mysql2/docs/examples/queries/simple-queries/insert#querysql

  todo.id = generateId();

  todos.push(todo);

  return Promise.resolve(todo);
}

function findByIdAndDelete(id) {
  id = Number(id);
  const todo = todos.find((c) => c.id === id);

  if (!todo) {
    return Promise.resolve(null);
  }

  const index = todos.indexOf(todo);
  todos.splice(index, 1);

  return Promise.resolve(todo);
}


function findByIdAndUpdate(id, newTodo) {
  id = Number(id);
  const todo = todos.find((c) => c.id === id);
  newTodo.id = id;

  if (!todo) {
    return Promise.resolve(null);
  }

  const index = todos.indexOf(todo);
  todos[index] = newTodo;

  return Promise.resolve(todo);
}

exports.find = find;
exports.findById = findById;
exports.create = create;
exports.findByIdAndDelete = findByIdAndDelete;
exports.findByIdAndUpdate = findByIdAndUpdate;
