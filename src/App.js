import "./App.css";
import React, { useState } from "react";
import RandomQuoteApp from "./components/apps/random-quote-app.js";

// TODO: PASS AND LIFT THE STATE TO HAVE THE CLEAR BUTTON IN EVERY APP

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
