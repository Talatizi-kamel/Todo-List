import styles from "./Footer.module.scss";
function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-20`}
    >
      <p>Copyright © Planzonne TodoList 2023</p>
    </footer>
  );
}

export default Footer;
