import { useState } from "react";
export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      console.log("je suis le" + cookieValue);
      return cookieValue;
    }
  }
}

function TodoItem({ todo, deleteTodo, updateTodo }) {
  const [loading, setLoading] = useState(false);

  async function tryUpdateTodo(newTodo) {
    const token = getCookie("token");

    if (!token) {
      throw new Error("Token manquant");
    }

    try {
      setLoading(true);
      const { _id, ...newTodoWithoutId } = newTodo;
      const response = await fetch(
        `http://localhost:3000/api/todolists/${todo.id}`,
        {
          method: "PUT",
          body: JSON.stringify(newTodoWithoutId),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const updatedTodo = await response.json();
        updateTodo(updatedTodo);
      } else {
        console.log("Erreur lors de la mise à jour du todo");
      }
    } catch (e) {
      console.log("Erreur lors de la mise à jour du todo", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleClickDeleteTodo() {
    const token = getCookie("token");

    if (!token) {
      throw new Error("Token manquant");
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/todolists/${todo.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        deleteTodo(todo);
      } else {
        console.log("Erreur lors de la suppression du todo");
      }
    } catch (e) {
      console.log("Erreur lors de la suppression du todo", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <li className="mb-10 d-flex flex-row justify-content-center align-items-center p-10">
      {loading ? (
        <span className="flex-fill mr-15">Chargement ....</span>
      ) : (
        <span className="flex-fill mr-15">
          {todo.content} {todo.done && "( ✓ )"}{" "}
        </span>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, done: !todo.done });
        }}
        className="btn btn-primary mr-15"
      >
        Valider
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, edit: true });
        }}
        className="btn btn-primary mr-15"
      >
        Modifier
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClickDeleteTodo();
        }}
        className="btn btn-reverse-primary mr-15"
      >
        Supprimer
      </button>
    </li>
  );
}

export default TodoItem;
