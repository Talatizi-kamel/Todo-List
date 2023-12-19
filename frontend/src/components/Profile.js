import React, { useState, useContext } from "react";
import styles from "./Profile.module.scss";
import { AuthContext } from "../context/AuthContext";
export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
}

function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user[0] });
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);

    // Effacer la notification après quelques secondes
    setTimeout(() => {
      setNotification(null);
    }, 3000); //  3 secondes
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = getCookie("token");
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        // mise à jour du contexte avec les nouvelles informations de l utilisateur
        updateUser(updatedUser);
        setEditMode(false);

        // Afficher la notification de succès
      } else {
        console.log("Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
      showNotification("Profil mis à jour avec succès");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex-fill d-flex flex-row container  justify-content-center align-items-center">
      <div className={`${styles.profileContainer} card p-20`}>
        {notification && (
          <div className="notification ">
            <p>{notification}</p>
          </div>
        )}
        <h3 className="mb-20">Page de profil</h3>
        {editMode ? (
          <form>
            <div className="d-flex flex-column card p-20 ">
              <label htmlFor="nom" className="form-label">
                Nom :
              </label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={editedUser.nom}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column card p-20">
              <label htmlFor="prenom" className="form-label">
                Prénom :
              </label>
              <input
                type="text"
                className="form-control"
                id="prenom"
                name="prenom"
                value={editedUser.prenom}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column card p-20">
              <label htmlFor="email" className="form-label">
                Email :
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Enregistrer
            </button>
          </form>
        ) : (
          <ul>
            <li>Nom : {user[0].nom}</li>
            <li>Prénom : {user[0].prenom}</li>
            <li>Email : {user[0].email}</li>
          </ul>
        )}
        {!editMode && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEdit}
          >
            Modifier
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
