import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { z } from 'zod';
import { maxBy } from 'lodash-es';

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
  },
];

function nextId() {
  return maxBy(todos, 'id').id + 1;
}

const Todo = z.object({
  title: z.string(),
  completed: z.boolean().optional().default(false),
});

const app = express();

// app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  next();
});
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', express.json(), (req, res) => {
  const todo = Todo.parse(req.body);

  const newTodo = {
    id: nextId(),
    ...todo,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.delete('/api/todos/:todoId', (req, res) => {
  const todoId = Number(req.params.todoId);

  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ msg: 'Todo not found' });
  }

  todos.splice(todos.indexOf(todo), 1);

  res.json(todo);
});

app.use((req, res, next) => {
  res.status(404).json({ msg: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ msg: err });
});

app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
