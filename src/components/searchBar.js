import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/searchBar.module.css";
import AppContext from "./appContext";

export const SearchBar = ({ text, setText, handleSearch }) => {
  const value = useContext(AppContext);
  const [filterData, setFilterData] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  // const data = ["game", "name", "pub", "dub", "play", "disco", "ritik"];

  const handleText = async (search) => {
    console.log("api 2 call");
    // console.log(search);
    let similarWords = await axios.get(
      `https://api.datamuse.com/words?sl=${search}&ml=${search}`
    );

    setShowSuggestion(true);
    setFilterData(
      [...similarWords.data.map((wordObj) => wordObj.word)].slice(0, 6)
    );
    if (filterData.length === 0) {
      setShowSuggestion(false);
    }
  };

  useEffect(() => {
    if (text.trim().length === 0) return;
    var intr = setTimeout(() => {
      handleText(text.trim());
    }, 1000);
    return () => clearTimeout(intr);
  }, [text]);
  const handleSuggestionClick = (data) => {
    setText(data);
    setFilterData([]);
    setShowSuggestion(false);
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.searchContainer}>
        <input
          className={
            value.state.isToggle
              ? styles.inputContainerDark
              : styles.inputContainer
          }
          value={text}
          onClick={() => setShowSuggestion(true)}
          // onKeyDown={(e) => {
          //   e.key === "Enter" ? handleSearch() : "";
          // }}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search..."
        />
        <div
          onClick={() => handleSearch()}
          className={styles.searchButtonContainer}
        >
          <svg
            className={
              value.state.isToggle ? styles.searchIconDark : styles.searchIcon
            }
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19.71 18.29l-4.6-4.6a7.92 7.92 0 001.43-4.54A8 8 0 108 17a7.92 7.92 0 004.55-1.43l4.6 4.59a1 1 0 101.42-1.42zM4 9a5 5 0 115 5 5 5 0 01-5-5zm1 0a4 4 0 118 0 4 4 0 01-8 0z"
            ></path>
          </svg>
        </div>
      </div>
      {showSuggestion && (
        <div
          className={
            value.state.isToggle
              ? styles.searchListSuggestionDark
              : styles.searchListSuggestion
          }
          onMouseLeave={() => setShowSuggestion(false)}
        >
          {filterData.map((data, index) => (
            <p
              key={index}
              onClick={() => {
                handleSuggestionClick(data);
              }}
            >
              {data}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
