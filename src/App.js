import "./App.css";
import React, { useState } from "react";
import RandomQuoteApp from "./components/apps/random-quote-app.js";
import DrumMachine from "./components/apps/drum-machine.js";
import RandomSentenceGenerator from "./components/apps/random-sentence-generator.js";
import NavBar from "./components/UI/NavBar";

function App() {
  const [displayApp, setDisplayApp] = useState("");
  const clickHandlerQuoteApp = () => {
    setDisplayApp("quoteApp");
  };

  const clickHandlerDrumMachine = () => {
    setDisplayApp("drumMachine");
  };

  const clickHandlerRandomSentenceGenerator = () => {
    setDisplayApp("randomSentenceGenerator");
  };

  const clearApp = () => {
    setDisplayApp("");
  };
  return (
    <div className="App">
      <NavBar />
      <button id="quote-app-button" onClick={clickHandlerQuoteApp}>
        Random quote app
      </button>
      <button id="drum-machine-button" onClick={clickHandlerDrumMachine}>
        Drum machine
      </button>
      <button
        id="random-sentence-generator-button"
        onClick={clickHandlerRandomSentenceGenerator}
      >
        Random sentence generator
      </button>

      {displayApp === "quoteApp" && <RandomQuoteApp onClearApp={clearApp} />}
      {displayApp === "drumMachine" && <DrumMachine onClearApp={clearApp} />}
      {displayApp === "randomSentenceGenerator" && (
        <RandomSentenceGenerator onClearApp={clearApp} />
      )}
    </div>
  );
}

export default App;
