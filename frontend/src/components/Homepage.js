import React, { useContext } from "react";
import { Link } from "react-router-dom";
import image from "../assets/images/image.jpg";
import style from "./Homepage.module.scss";
import { AuthContext } from "../context/AuthContext";

function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex container align-items-center">
      <div className="d-flex container justify-content-center align-items-center card my-30">
        <div className={`${style.box} card`}>
          <h1>Bienvenue dans notre site Todo List</h1>
          <p>Gérez vos tâches quotidiennes de manière simple et efficace.</p>
          <p>
            Notre application Todo List vous permet de rester organisé et de
            suivre vos progrès.
          </p>
          {user ? (
            <Link to="/Todolists" className="btn btn-primary">
              TodoList
            </Link>
          ) : (
            <p className={`${style.color}`}>
              Veuillez vous connecter ou vous inscrire pour profiter de ce
              service.
            </p>
          )}
        </div>
        <div className={`${style.box} card`}>
          <img
            src={image}
            alt="Illustration Todo List"
            className="resized-image justify-content-d  my-30"
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
