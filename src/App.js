import "./App.css";
import React, { useState } from "react";

function App() {
  const [isClicked, setIsClicked] = useState("");
  const clickHandler = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="App">
      <button onClick={clickHandler}>Load project X</button>
      {isClicked && <div className="projectX">Here it is</div>}
    </div>
  );
}

export default App;
