import "./App.css";
import React, { useState } from "react";
import RandomQuoteApp from "./components/apps/random-quote-app.js";
import DrumMachine from "./components/apps/drum-machine.js";
import RandomSentenceGenerator from "./components/apps/random-sentence-generator.js";
import NavBar from "./components/UI/NavBar";

function App() {
  const [onDisplay, setOnDisplay] = useState("");
  const selectAppHandler = (appName) => {
    setOnDisplay(appName);
  };

  const clearApp = () => {
    setOnDisplay("");
  };
  return (
    <div className="main-page">
      <NavBar onSelectApp={selectAppHandler} />
      <div className="onDisplay">
        {onDisplay === "quoteApp" && <RandomQuoteApp onClearApp={clearApp} />}
        {onDisplay === "drumMachine" && <DrumMachine onClearApp={clearApp} />}
        {onDisplay === "randomSentenceGenerator" && (
          <RandomSentenceGenerator onClearApp={clearApp} />
        )}
      </div>
    </div>
  );
}

export default App;
