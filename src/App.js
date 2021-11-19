import "./App.css";
import React, { useState } from "react";
import RandomQuoteApp from "./components/apps/random-quote-app.js";
import DrumMachine from "./components/apps/drum-machine.js";

function App() {
  const [displayApp, setDisplayApp] = useState("");
  const clickHandlerQuoteApp = () => {
    setDisplayApp("quoteApp");
  };

  const clickHandlerDrumMachine = () => {
    setDisplayApp("drumMachine");
  };

  const clearApp = () => {
    setDisplayApp("");
  };
  return (
    <div className="App">
      <button id="quote-app-button" onClick={clickHandlerQuoteApp}>
        Random quote app
      </button>
      <button id="drum-machine-button" onClick={clickHandlerDrumMachine}>
        Drum machine
      </button>

      {displayApp === "quoteApp" && <RandomQuoteApp onClearApp={clearApp} />}
      {displayApp === "drumMachine" && <DrumMachine onClearApp={clearApp} />}
    </div>
  );
}

export default App;
