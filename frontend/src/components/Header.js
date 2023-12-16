import styles from "./Header.module.scss";
import logo from "../assets/images/Logo-PZ-Bleu-Blanc-Rouge.png";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <i className="fa-solid fa-bars mr-15"></i>
      <div className="flex-fill">
        <NavLink to="/">
          {" "}
          <img src={logo} alt="logo planzone"></img>{" "}
        </NavLink>
      </div>
      <ul>
        <button className="btn btn-primary mr-5">connexion</button>
      </ul>
      <ul>
        <NavLink to="signup">
          <button className="btn btn-reverse-primary ml-5">Inscription</button>
        </NavLink>
      </ul>
    </header>
  );
}

export default Header;
