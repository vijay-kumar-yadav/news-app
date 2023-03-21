import React, { useContext } from "react";
import styles from "../styles/filter.module.css";
import AppContext from "./appContext";

export const Filter = ({ onSelect, filter }) => {
  const value = useContext(AppContext);

  const handleSelection = (event) => {
    onSelect(event.target.value);
  };
  return (
    <div
      className={
        value.state.isToggle
          ? styles.filterContainerDark
          : styles.filterContainer
      }
    >
      <label htmlFor="filter">Filter by :</label>
      <select
        onChange={handleSelection}
        name="filter"
        id="filter"
        value={filter}
      >
        <option value="Day">Day</option>
        <option value="Week">Week</option>
        <option value="Month">Month</option>
      </select>
    </div>
  );
};
