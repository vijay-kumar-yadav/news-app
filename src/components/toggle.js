import React, { useContext } from "react";
import styles from "../styles/toggle.module.css";
import moon from "../images/moon.png";
import sun from "../images/sun.png";
import moonLight from "../images/moon-light.png";
import sunLight from "../images/sun-light.png";
import AppContext from "./appContext";
import Image from "next/image";

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
      <Image
        width="30"
        height="30"
        style={{ marginRight: "5px" }}
        src={value.state.isToggle ? sunLight.src : sun.src}
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
      <Image
        width="30"
        height="30"
        style={{ marginLeft: "5px" }}
        src={value.state.isToggle ? moonLight.src : moon.src}
        alt={"moon"}
        onClick={() => value.state.setIsToggle(true)}
      />
    </div>
  );
};
