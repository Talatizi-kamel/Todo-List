import React, { useEffect, useReducer, useState, useCallback } from "react";
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
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    const fetchTodoList = async () => {
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
      } catch (error) {
        console.log("Erreur lors de la récupération des tâches", error);
      } finally {
        setLoading(false);
      }
    };

    try {
      fetchTodoList();

      const intervalId = setInterval(fetchTodoList, 6000);

      return () => {
        clearInterval(intervalId);
      };
    } catch (error) {
      console.error("Erreur lors de l'initialisation de l'effet", error);
    }
  }, []);

  const addTodo = useCallback(
    (newTodo) => {
      dispatch({ type: "ADD_TODO", todo: newTodo });
      setShowAddNotification(true);
      setTimeout(() => {
        setShowAddNotification(false);
      }, 3000);
    },
    [dispatch]
  );

  const deleteTodo = useCallback(
    (deletedTodo) => {
      dispatch({ type: "DELETE_TODO", todo: deletedTodo });
    },
    [dispatch]
  );

  const updateTodo = useCallback(
    (updatedTodo) => {
      dispatch({ type: "UPDATE_TODO", todo: updatedTodo });
      setShowUpdateNotification(true);
      setTimeout(() => {
        setShowUpdateNotification(false);
      }, 3000);
    },
    [dispatch]
  );

  return (
    <div className="d-flex container flex-column justify-content-center align-items-center p-20">
      <h1 className="mb-20">Mes Todo lists</h1>
      {showAddNotification && (
        <div className="notification card">
          <p>Nouvelle tâche ajoutée avec succès !</p>
        </div>
      )}
      {showUpdateNotification && (
        <div className="notification card">
          <p>Tâche mise à jour avec succès !</p>
        </div>
      )}
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
                todoList={state.todoList.filter(
                  (todo) => todo.statut === "en cours"
                )}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            </div>
            <div className={`${styles.box} `}>
              <h2 className={`${styles.termine}`}>Terminés</h2>
              <TodoList
                todoList={state.todoList.filter(
                  (todo) => todo.statut === "terminé"
                )}
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
