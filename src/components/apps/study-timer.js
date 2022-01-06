import { useState } from "react";
import "./study-timer.css";
import ClearButton from "../UI/ClearButton";

const StudyTimer = (props) => {
  const clearApp = () => {
    props.onClearApp();
  };

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const breakLengthDownHandler = () => {
    if (breakLength > 0) {
      setBreakLength(breakLength - 1);
    }
  };

  const breakLengthUpHandler = () => {
    setBreakLength(breakLength + 1);
  };

  return (
    <div className="study-timer">
      <ClearButton onClearApp={clearApp} />
      <div className="timer-box">
        <div className="timer-title">
          <h3>Study timer</h3>
        </div>
        <div className="timer-settings">
          <div className="timer-setting">
            <div className="setting-title">Break length</div>
            <div className="setting-controls">
              <button onClick={breakLengthDownHandler}>-</button>
              <p>{breakLength}</p>
              <button onClick={breakLengthUpHandler}>+</button>
            </div>
          </div>
          <div className="timer-setting">
            <div className="setting-title">Session length</div>
            <div className="setting-controls">
              <button>+</button>
              <p>{sessionLength}</p>
              <button>-</button>
            </div>
          </div>
        </div>
        <div className="timer-countdown">
          <h2>
            Session
            <br />
            25:00
          </h2>
        </div>
        <div className="timer-controls">
          <button className="timer-control">Start / Pause</button>
          <button className="timer-control">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
