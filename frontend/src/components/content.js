import styles from "./Content.module.scss";
import { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import AddTodo from "./ComponentsTodo/AddTodo";
import TodoList from "./ComponentsTodo/TodoList";
import { getCookie } from "./ComponentsTodo/AddTodo";

function todoReducer(state, action) {
  switch (action.type) {
    case "FETCH_TODOS": {
      return {
        ...state,
        todoList: action.todoList,
      };
    }
    case "ADD_TODO": {
      return {
        ...state,
        todoList: [...state.todoList, action.todo],
      };
    }
    case "UPDATE_TODO": {
      return {
        ...state,
        todoList: state.todoList.map((t) =>
          t._id === action.todo._id ? action.todo : t
        ),
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter((t) => t._id !== action.todo._id),
      };
    }
    default: {
      throw new Error("Action inconnue");
    }
  }
}

function Content() {
  const [state, dispatch] = useReducer(todoReducer, { todoList: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shouldCancel = false;
    async function fetchTodoList() {
      const token = getCookie("token");

      if (!token) {
        throw new Error("Token manquant");
      }
      try {
        const response = await fetch(`http://localhost:3000/api/todolists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const todos = await response.json();
          if (!shouldCancel) {
            if (Array.isArray(todos)) {
              dispatch({ type: "FETCH_TODOS", todoList: todos });
            } else {
              dispatch({ type: "FETCH_TODOS", todoList: [todos] });
            }
          }
        } else {
          console.log("Erreur");
        }
      } catch (e) {
        console.log("Erreur");
      } finally {
        setLoading(false);
      }
    }
    fetchTodoList();
    return () => {
      shouldCancel = true;
    };
  }, []);

  function addTodo(newTodo) {
    dispatch({ type: "ADD_TODO", todo: newTodo });
  }

  function deleteTodo(deletedTodo) {
    dispatch({ type: "DELETE_TODO", todo: deletedTodo });
  }

  function updateTodo(updatedTodo) {
    dispatch({ type: "UPDATE_TODO", todo: updatedTodo });
  }
  return (
    <div className="d-flex flex-row justify-content-center align-items-center p-20">
      <div className="card container p-20">
        <h1 className="mb-20">Todo list</h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <p>Chargement en cours</p>
        ) : (
          <TodoList
            todoList={state.todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default Content;
