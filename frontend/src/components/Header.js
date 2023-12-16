import styles from "./Header.module.scss";
import logo from "../assets/images/Logo-PZ-Bleu-Blanc-Rouge.png";
function Header() {
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <i class="fa-solid fa-bars mr-15"></i>
      <div className="flex-fill">
        <img src={logo} alt="logo planzone"></img>
      </div>
      <ul>
        {/* <button className="mr-5 btn btn-reverse-primary">
          <i class="fa-solid fa-cart-shopping"></i>
          <span className="ml-5">panier</span>
        </button> */}
        <button className="btn btn-primary">connexion</button>
      </ul>
    </header>
  );
}

export default Header;
