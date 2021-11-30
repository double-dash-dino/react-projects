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
    <div className="main-page">
      <NavBar />
      <div className="apps">
        {displayApp === "quoteApp" && <RandomQuoteApp onClearApp={clearApp} />}
        {displayApp === "drumMachine" && <DrumMachine onClearApp={clearApp} />}
        {displayApp === "randomSentenceGenerator" && (
          <RandomSentenceGenerator onClearApp={clearApp} />
        )}
      </div>
    </div>
  );
}

export default App;
