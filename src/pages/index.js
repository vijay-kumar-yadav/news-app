import AppContext from "@/components/appContext";
import { Toolbar } from "@/components/toolbar";
import styles from "@/styles/Home.module.css";
import { useContext } from "react";

export default function Home() {
  const value = useContext(AppContext);

  return (
    <div
      className={
        value.state.isToggle ? "page-container-dark" : "page-container"
      }
    >
      <Toolbar />
      <div className={value.state.isToggle ? styles.mainDark : styles.main}>
        <h1>News App</h1>
        <h3>Your one stop shop for the latest news articles</h3>
      </div>
    </div>
  );
}
