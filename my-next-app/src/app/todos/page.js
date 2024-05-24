import mysql from 'mysql2/promise';

export default async function Todos() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'formation_havas_2024_05',
  });

  const [results] = await connection.query(
    'SELECT `id`, `title`, `completed` FROM `todos` LIMIT 0, 100'
  );


  return <div className="Todos">
    <h2>Ma Todo List</h2>
    <p>Version Node.js : {process.version}</p>
    {results.map((result) => <div key={result.id}>{result.title}</div>)}
  </div>
}