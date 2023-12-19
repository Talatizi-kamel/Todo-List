import React, { useContext } from "react";
import styles from "./Header.module.scss";
import logo from "../assets/images/Logo-PZ-Bleu-Blanc-Rouge.png";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <i className="fa-solid fa-bars mr-15"></i>
      <div className="flex-fill">
        <NavLink to="/">
          <img src={logo} alt="logo planzone"></img>
        </NavLink>
      </div>
      {user ? (
        <ul>
          <NavLink to="Profile">
            <button className="btn btn-primary mr-5">Profil</button>
          </NavLink>
          <button
            className="btn btn-reverse-primary ml-5"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </ul>
      ) : (
        <ul>
          <NavLink to="Login">
            <button className="btn btn-primary mr-5">Connexion</button>
          </NavLink>
          <NavLink to="signup">
            <button className="btn btn-reverse-primary ml-5">
              Inscription
            </button>
          </NavLink>
        </ul>
      )}
    </header>
  );
}

export default Header;
