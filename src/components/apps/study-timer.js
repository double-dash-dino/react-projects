import { useState } from "react";
import "./study-timer.css";
import ClearButton from "../UI/ClearButton";

const StudyTimer = (props) => {
  const clearApp = () => {
    props.onClearApp();
  };
  return (
    <div className="study-timer">
      <ClearButton onClearApp={clearApp} />
      <div className="timer-box">
        <div className="timer-title">
          <h1>Study timer</h1>
        </div>
        <div className="timer-settings">
          <div className="break-length-setting">Break length</div>
          <div className="session-length-setting">Session length</div>
        </div>
        <div className="timer-countdown">
          Session
          <br />
          25:00
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
