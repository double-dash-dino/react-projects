import { useState, useEffect } from "react";
import "./study-timer.css";
import ClearButton from "../UI/ClearButton";

const StudyTimer = (props) => {
  const clearApp = () => {
    props.onClearApp();
  };

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(sessionLength);
  const [timerGoing, setTimerGoing] = useState(false);

  const breakLengthHandler = (event) => {
    if (event.target.id === "break-length-down" && breakLength > 0) {
      setBreakLength(breakLength - 1);
    } else if (event.target.id === "break-length-up" && sessionLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const sessionLengthHandler = (event) => {
    if (event.target.id === "session-length-down" && sessionLength > 0) {
      setSessionLength(sessionLength - 1);
    } else if (event.target.id === "session-length-up" && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };
  const timerClickHandler = () => {
    setTimerGoing(!timerGoing);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerGoing) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, timerGoing]);

  const resetClickHandler = () => {
    setTimer(10);
    setTimerGoing(false);
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
              <button
                id="break-length-down"
                onClick={breakLengthHandler}
                className="length-control"
              >
                -
              </button>
              <p className="length-field">{breakLength}</p>
              <button
                id="break-length-up"
                onClick={breakLengthHandler}
                className="length-control"
              >
                +
              </button>
            </div>
          </div>
          <div className="timer-setting">
            <div className="setting-title">Session length</div>
            <div className="setting-controls">
              <button
                id="session-length-down"
                onClick={sessionLengthHandler}
                className="length-control"
              >
                -
              </button>
              <p className="length-field">{sessionLength}</p>
              <button
                id="session-length-up"
                onClick={sessionLengthHandler}
                className="length-control"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="timer-countdown">
          <h2>
            Session
            <br />
            {timer > 0 && timer}
            {timer <= 0 && <p>Time is up!</p>}
          </h2>
        </div>
        <div className="timer-controls">
          <button className="timer-control" onClick={timerClickHandler}>
            Start / Pause
          </button>
          <button className="timer-control" onClick={resetClickHandler}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
