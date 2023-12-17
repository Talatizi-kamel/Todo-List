import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";

function TodoList({ todoList, deleteTodo, updateTodo }) {
  return todoList.length ? (
    <ul>
      {todoList.map((todo) =>
        todo.edit ? (
          <EditTodo key={todo._id} todo={todo} updateTodo={updateTodo} />
        ) : (
          <TodoItem
            key={todo._id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        )
      )}
    </ul>
  ) : (
    <p>Aucune todo pour le moment</p>
  );
}

export default TodoList;
