import React, { useContext } from "react";
import styles from "../styles/toggle.module.css";
import moon from "../images/moon.png";
import sun from "../images/sun.png";
import moonLight from "../images/moon-light.png";
import sunLight from "../images/sun-light.png";
import AppContext from "./appContext";

export const Toggle = () => {
  const value = useContext(AppContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "0px",
        padding: "0px",
      }}
    >
      <img
        src={value.state.isToggle ? sunLight.src : sun.src}
        style={{ width: "30px", height: "30px", marginRight: "5px" }}
        alt={"sun"}
        onClick={() => value.state.setIsToggle(false)}
      />

      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={value.state.isToggle}
          onChange={(e) => value.state.setIsToggle(!value.state.isToggle)}
        />
        <span className={`${styles.slider} ${styles.round}`} />
      </label>
      <img
        src={value.state.isToggle ? moonLight.src : moon.src}
        alt={"moon"}
        style={{ width: "30px", height: "30px", marginLeft: "5px" }}
        onClick={() => value.state.setIsToggle(true)}
      />
    </div>
  );
};
