import "./App.css";
import React, { useState } from "react";
import RandomQuoteApp from "./components/apps/random-quote-app.js";

function App() {
  const [isClicked, setIsClicked] = useState("");
  const clickHandlerQuoteApp = () => {
    setIsClicked("quoteApp");
  };
  return (
    <div className="App">
      <button id="quote-app-button" onClick={clickHandlerQuoteApp}>
        Random quote app
      </button>
      {isClicked === "quoteApp" && <RandomQuoteApp />}
    </div>
  );
}

export default App;
