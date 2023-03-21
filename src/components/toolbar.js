import { useRouter } from "next/router";
import styles from "@/styles/toolbar.module.css";
import { useContext, useEffect, useState } from "react";
import { Toggle } from "./toggle";
import AppContext from "./appContext";

export const Toolbar = () => {
  const value = useContext(AppContext);
  const router = useRouter();
  const [route, setRoute] = useState("home");

  useEffect(() => {
    const data = window.location.pathname;

    const path = data.split("/")[1];
    switch (path) {
      case "": {
        setRoute("home");
        break;
      }
      case "feed": {
        setRoute("feed");
        break;
      }
      case "search": {
        setRoute("search");
        break;
      }
      default: {
        console.log("not found");
      }
    }
  }, []);
  return (
    <>
      <div className={value.state.isToggle ? styles.mainDark : styles.main}>
        <div
          className={
            route === "home"
              ? !value.state.isToggle
                ? styles.active
                : styles.activeDark
              : !value.state.isToggle
              ? styles.inactive
              : styles.inactiveDark
          }
          onClick={() => {
            router.push("/");
            setRoute("home");
          }}
        >
          Home
        </div>
        <div
          className={
            route === "feed"
              ? !value.state.isToggle
                ? styles.active
                : styles.activeDark
              : !value.state.isToggle
              ? styles.inactive
              : styles.inactiveDark
          }
          onClick={() => {
            router.push("/feed/1");
            setRoute("feed");
          }}
        >
          Feed
        </div>
        <div
          className={
            route === "search"
              ? !value.state.isToggle
                ? styles.active
                : styles.activeDark
              : !value.state.isToggle
              ? styles.inactive
              : styles.inactiveDark
          }
          onClick={() => {
            router.push("/search/1");
            setRoute("search");
          }}
        >
          Search
        </div>
        <div>
          <Toggle />
        </div>
      </div>
    </>
  );
};
