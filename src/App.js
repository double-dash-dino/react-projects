import "./App.css";
import React, { useState } from "react";
import RandomQuoteApp from "./components/apps/random-quote-app.js";
import DrumMachine from "./components/apps/drum-machine.js";
import RandomSentenceGenerator from "./components/apps/random-sentence-generator.js";
import NavBar from "./components/UI/NavBar";
import ContactPage from "./components/pages/contact-page";
import StudyTimer from "./components/apps/study-timer";
import D3Graphs from "./components/apps/D3Graphs";
import DBPage from "./components/DB-projects/DBpage";
import PlaylistBuilder from "./components/apps/playlist-builder";

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
        {onDisplay === "studyTimer" && <StudyTimer onClearApp={clearApp} />}
        {onDisplay === "d3Graphs" && <D3Graphs onClearApp={clearApp} />}

        {onDisplay === "db-projects" && <DBPage />}
        {onDisplay === "playlistBuilder" && <PlaylistBuilder />}
        {onDisplay === "contact" && <ContactPage />}
      </div>
    </div>
  );
}

export default App;
