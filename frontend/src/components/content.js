import { useEffect } from "react";
import { useReducer, useState } from "react";
import AddTodo from "../components/ComponentsTodo/AddTodo";
import TodoList from "../components/ComponentsTodo/TodoList";
import styles from "./Content.module.scss";

export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
}

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
          t.id === action.todo.id ? action.todo : t
        ),
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter((t) => t.id !== action.todo.id),
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
      try {
        const token = getCookie("token");
        const response = await fetch(`http://localhost:3000/api/todolists`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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

  // Filtrer les todos par statut
  const todosEnCours = state.todoList.filter(
    (todo) => todo.statut === "en cours"
  );
  const todosTermines = state.todoList.filter(
    (todo) => todo.statut === "terminé"
  );
  console.log("Todos:", state.todoList);
  console.log("En cours:", todosEnCours);
  console.log("Terminés:", todosTermines);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-20">
      <div className={`${styles.container} card`}>
        <h1 className="mb-20">Todo list</h1>

        {loading ? (
          <p>Chargement en cours</p>
        ) : (
          <>
            <div className={`${styles.box} `}>
              <AddTodo addTodo={addTodo} /> {/* Déplacez l'AddTodo ici */}
            </div>

            <div className="d-flex flex-row">
              {" "}
              {/* Utilisez flex-row pour afficher les deux listes sur la même ligne */}
              <div className={`${styles.box} `}>
                <h2 className={`${styles.Encours}`}>En cours</h2>
                <TodoList
                  todoList={todosEnCours}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              </div>
              <div className={`${styles.box} `}>
                <h2 className={`${styles.termine}`}>Terminés</h2>
                <TodoList
                  todoList={todosTermines}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Content;
