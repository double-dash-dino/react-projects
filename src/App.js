import "./App.css";
import React, { useState } from "react";
import RandomQuoteApp from "./components/apps/random-quote-app.js";

function App() {
  const [displayApp, setDisplayApp] = useState("");
  const clickHandlerQuoteApp = () => {
    setDisplayApp("quoteApp");
  };

  const clearApp = () => {
    setDisplayApp("");
  };
  return (
    <div className="App">
      <button id="quote-app-button" onClick={clickHandlerQuoteApp}>
        Random quote app
      </button>
      <button className="clearApp" onClick={clearApp}>
        X
      </button>
      {displayApp === "quoteApp" && <RandomQuoteApp />}
    </div>
  );
}

export default App;
