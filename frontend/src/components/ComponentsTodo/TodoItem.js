import { useState } from "react";
export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
}
function TodoItem({ todo, deleteTodo, updateTodo }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.titre);
  const [editedStatus, setEditedStatus] = useState(todo.statut);

  async function tryUpdateTodo() {
    try {
      const token = getCookie("token");

      if (!token) {
        throw new Error("Token manquant");
      }

      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/api/todolists/${todo.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            titre: editedTitle,
            statut: editedStatus,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedTodo = await response.json();
        updateTodo(updatedTodo);
        setEditMode(false);
      } else {
        console.log("Erreur lors de la mise à jour du todo");
      }
    } catch (error) {
      console.log("Erreur lors de la mise à jour du todo", error);
    } finally {
      setLoading(false);
    }
  }
  async function tryDeleteTodo() {
    try {
      const token = getCookie("token");

      if (!token) {
        throw new Error("Token manquant");
      }

      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/api/todolists/${todo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Suppression côté client après la suppression réussie côté serveur
        deleteTodo(todo);
      } else {
        console.log("Erreur lors de la suppression du todo");
      }
    } catch (error) {
      console.log("Erreur lors de la suppression du todo", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <li className="mb-10 d-flex flex-row justify-content-center align-items-center p-10">
      {loading ? (
        <span className="flex-fill mr-15">Chargement ....</span>
      ) : editMode ? (
        <div className="d-flex flex-column">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Titre"
            className="mr-15"
          />
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          >
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
          <button onClick={tryUpdateTodo} className="btn btn-primary">
            Sauvegarder
          </button>
        </div>
      ) : (
        <>
          <span className="flex-fill mr-15">
            {todo.titre} - Statut : {todo.statut}
          </span>
          <button
            onClick={() => {
              setEditMode(true);
              setEditedTitle(todo.titre);
              setEditedStatus(todo.statut);
            }}
            className="btn btn-primary mr-15"
          >
            Modifier
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              tryDeleteTodo(); // Appel de la fonction de suppression côté serveur
            }}
            className="btn btn-reverse-primary"
          >
            Supprimer
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
