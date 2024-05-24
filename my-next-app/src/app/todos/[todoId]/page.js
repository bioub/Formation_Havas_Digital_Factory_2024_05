
export default async function Todos({ params: {todoId} }) {

  return <div className="Todos">
    <h2>Todo {todoId}</h2>
  </div>
}