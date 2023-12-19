import React from "react";
import image from "../assets/images/image.jpg";
import style from "./Homepage.module.scss";

function Homepage() {
  return (
    <div class=" d-flex container align-items-center">
      <div class=" d-flex container justify-content-center align-items-center card my-30">
        <div class={`${style.box} card`}>
          <h1>Bienvenue dans notre site Todo List</h1>
          <p>Gérez vos tâches quotidiennes de manière simple et efficace.</p>
          <p>
            Notre application Todo List vous permet de rester organisé et de
            suivre vos progrès.
          </p>
        </div>
        <div class={`${style.box} card`}>
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
