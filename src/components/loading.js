import React, { useContext } from "react";
import styles from "../styles/loading.module.css";
import AppContext from "./appContext";

export const Loading = () => {
  const value = useContext(AppContext);

  return (
    <div className={styles.loadingContainer}>
      <div
        className={value.state.isToggle ? styles.spinnerDark : styles.spinner}
      ></div>
    </div>
  );
};
