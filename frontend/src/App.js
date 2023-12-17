import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./App.module.scss";
import { Suspense } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

function App() {
  const user = useLoaderData();
  console.log(user);
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
