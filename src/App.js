import "./App.css";
import React, { useState } from "react";

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
      {isClicked && <div className="projectX">Here it is</div>}
    </div>
  );
}

export default App;
