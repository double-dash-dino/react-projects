// todo
// US 8 - format mm:ss
// US 11 - reset should reset the whole page values

import { useState, useEffect } from "react";
import "./study-timer.css";
import ClearButton from "../UI/ClearButton";
// import FontAwesomeIcon

const StudyTimer = (props) => {
  const beep = document.getElementById("beep");
  const clearApp = () => {
    props.onClearApp();
  };

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(3);
  const [timer, setTimer] = useState(sessionLength);
  const [timerGoing, setTimerGoing] = useState(false);
  const [timerType, setTimerType] = useState("Session");

  const breakLengthHandler = (event) => {
    if (event.target.id === "break-decrement" && breakLength > 0) {
      setBreakLength(breakLength - 1);
    } else if (event.target.id === "break-increment" && sessionLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const sessionLengthHandler = (event) => {
    if (event.target.id === "session-decrement" && sessionLength > 0) {
      setSessionLength(sessionLength - 1);
    } else if (event.target.id === "session-increment" && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };
  const timerClickHandler = () => {
    if (timer > 0) {
      console.log("timer starts");
      setTimerGoing(!timerGoing);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerGoing) {
        setTimer(timer - 1);
        console.log(timer);
      }
      if (timer <= 0) {
        beep.play();

        if (timerType === "Session") {
          setTimerType("Break");
          setTimer(breakLength);
        }
        if (timerType === "Break") {
          setTimerType("Session");
          setTimer(sessionLength);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, timerGoing, breakLength, sessionLength, timerType, beep]);

  const resetClickHandler = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTimer(25);
    setTimerGoing(false);
    setTimerType("Session");
    beep.pause();
    beep.currentTime = 0;
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
            <div className="setting-title" id="break-label">
              Break length
            </div>
            <div className="setting-controls">
              <button
                id="break-decrement"
                onClick={breakLengthHandler}
                className="length-control"
              >
                -
              </button>
              <p className="length-field" id="break-length">
                {breakLength}
              </p>
              <button
                id="break-increment"
                onClick={breakLengthHandler}
                className="length-control"
              >
                +
              </button>
            </div>
          </div>
          <div className="timer-setting">
            <div className="setting-title" id="session-label">
              Session length
            </div>
            <div className="setting-controls">
              <button
                id="session-decrement"
                onClick={sessionLengthHandler}
                className="length-control"
              >
                -
              </button>
              <p className="length-field" id="session-length">
                {sessionLength}
              </p>
              <button
                id="session-increment"
                onClick={sessionLengthHandler}
                className="length-control"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="timer-countdown">
          <h3 id="timer-label">{timerType}</h3>
          <h2 id="time-left">{timer}</h2>
          <audio
            id="beep"
            src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/beep-synth.wav"
          ></audio>
        </div>
        <div className="timer-controls">
          {timerGoing && (
            <button
              className="timer-control"
              id="start-stop"
              onClick={timerClickHandler}
            >
              <i className="fa fa-pause"></i>
            </button>
          )}
          {!timerGoing && (
            <button
              className="timer-control"
              id="start-stop"
              onClick={timerClickHandler}
            >
              <i className="fa fa-play"></i>
            </button>
          )}

          <button
            className="timer-control"
            id="reset"
            onClick={resetClickHandler}
          >
            <i className="fa fa-sync"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
