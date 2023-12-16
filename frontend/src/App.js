import Footer from "./components/Footer";
import Header from "./components/Header";
import Content from "./components/content";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
