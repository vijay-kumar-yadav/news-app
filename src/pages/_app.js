import "@/styles/globals.css";
import AppContext from "@/components/appContext";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isToggle, setIsToggle] = useState(false);
  //true -> night mode
  //false -> day mode
  return (
    <AppContext.Provider
      value={{
        state: {
          isToggle: isToggle,
          setIsToggle: setIsToggle,
        },
      }}
    >
      <Component {...pageProps} />;
    </AppContext.Provider>
  );
}
