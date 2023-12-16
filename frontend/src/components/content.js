import styles from "./Content.module.scss";

function Content() {
  return (
    <div className="flex-fill container p-20">
      <h1 className="my-30">Bonjour et bienvenue dans notre site .</h1>
      <div className={`card p-20 ${styles.contentCard}`}>
        <div className={styles.grid}></div>
      </div>
    </div>
  );
}

export default Content;
