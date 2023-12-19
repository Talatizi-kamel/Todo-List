import React, { useState } from "react";
import styles from "./Todoitem.module.scss";

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
  const [editedDescription] = useState(todo.description);
  const [showNotification, setShowNotification] = useState(false);

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
            description: editedDescription,
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
        setLoading(false);
        setShowNotification(true); // Afficher la notification après la mise à jour
        setTimeout(() => {
          setShowNotification(false);
        }, 3000); // Masquer la notification après 3 secondes
      } else {
        console.log("Erreur lors de la mise à jour du todo");
      }
    } catch (error) {
      console.log("Erreur lors de la mise à jour du todo", error);
    } finally {
      setLoading(false);
    }
  }

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDeleteClick = async () => {
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
        setEditMode(false);
        setLoading(false);
        setShowNotification(true); // Afficher la notification après la suppression
        setTimeout(() => {
          setShowNotification(false);
        }, 3000); // Masquer la notification après 3 secondes
      } else {
        console.log("Erreur lors de la suppression du todo");
      }
    } catch (error) {
      console.log("Erreur lors de la suppression du todo", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="mb-10 d-flex flex-row justify-content-center align-items-center p-10">
      {loading ? (
        <span className="flex-fill mr-15">Chargement ....</span>
      ) : editMode ? (
        <div className={`${styles.modal} d-flex flex-column m-10`}>
          <h3
            className={`${
              editedStatus === "terminé" ? styles.termine : styles.Encours
            }`}
          >
            la tache :
          </h3>
          <p>{editedTitle}</p>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Titre"
            className=" label p-10"
          />
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
            className={`${styles.editmodeselect}`}
          >
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
          <div className="d-flex flex-row ">
            <button onClick={tryUpdateTodo} className="btn btn-primary mr-5">
              Sauvegarder
            </button>
            <button onClick={handleCancel} className="btn btn-primary mr-5">
              Annuler
            </button>
            <button
              onClick={handleDeleteClick}
              className="btn btn-reverse-primary mr-5"
            >
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="flex-fill mr-15">{todo.titre}</span>
          <button onClick={handleEditClick} className="btn btn-primary mr-15">
            Modifier
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
