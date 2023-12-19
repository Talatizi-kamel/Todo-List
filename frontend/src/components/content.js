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
          dispatch({ type: "FETCH_TODOS", todoList: todos });
        } else {
          console.log("Erreur lors de la récupération des tâches");
        }
      } catch (e) {
        console.log("Erreur lors de la récupération des tâches", e);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoList(); // Appelez la fonction directement sans condition

    const intervalId = setInterval(fetchTodoList, 600); // Rafraîchir toutes les minutes (ajustez selon vos besoins)

    return () => {
      clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
    };
  }, []); // Aucune dépendance ici pour s'assurer que l'effet s'exécute une seule fois

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

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-20">
      <h1 className="mb-20">Mes Todo lists</h1>
      <div
        className={`${styles.box} container flex-column justify-content-center  d-flex`}
      >
        <AddTodo addTodo={addTodo} />
      </div>
      <div className={`${styles.container} card`}>
        {loading ? (
          <p>Chargement en cours</p>
        ) : (
          <div className="container flex flex-row justify-content-center d-flex ">
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
        )}
      </div>
    </div>
  );
}

export default Content;
