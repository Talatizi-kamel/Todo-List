import React from "react";

function Homepage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">
            Bienvenue dans notre site Todo List
          </h1>
          <p className="lead">
            Gérez vos tâches quotidiennes de manière simple et efficace.
          </p>
          <p>
            Notre application Todo List vous permet de rester organisé et de
            suivre vos progrès.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
