import React from "react";
import styles from "../styles/subToolbar.module.css";

export const SubToolbar = ({ categories, setTypeOfNews, typeOfNews }) => {
  return (
    <div className={styles.main}>
      {categories.map((category, index) => {
        return (
          <div
            className={
              category === typeOfNews ? styles.active : styles.inactive
            }
            onClick={() => {
              setTypeOfNews(category);
            }}
            key={index}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
};
