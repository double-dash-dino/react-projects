import { useState, useEffect } from "react";
import "./study-timer.css";
import ClearButton from "../UI/ClearButton";

const StudyTimer = (props) => {
  const beep = document.getElementById("beep");
  const clearApp = () => {
    props.onClearApp();
  };

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);
  const [timerGoing, setTimerGoing] = useState(false);
  const [timerType, setTimerType] = useState("Session");
  const [dynamicTime, setDynamicTime] = useState(0);

  const timeFormatter = (minutes, seconds) => {
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (seconds === 60) {
      seconds = "00";
    }
    return minutes + ":" + seconds;
  };

  const breakLengthHandler = (event) => {
    if (event.target.id === "break-decrement" && breakLength > 0) {
      setBreakLength(breakLength - 1);
    } else if (event.target.id === "break-increment" && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const sessionLengthHandler = (event) => {
    if (event.target.id === "session-decrement" && sessionLength > 0) {
      setSessionLength(sessionLength - 1);
      if (!timerGoing) {
        setMinutes(minutes - 1);
      }
    } else if (event.target.id === "session-increment" && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (!timerGoing) {
        setMinutes(minutes + 1);
      }
    }
  };
  const timerClickHandler = () => {
    if (minutes > 0) {
      setTimerGoing(!timerGoing);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerGoing) {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }
      if (minutes <= 0 && seconds <= 0) {
        // beep.play();

        if (timerType === "Session") {
          setTimerType("Break");
          setMinutes(breakLength);
          setSeconds(0);
        }
        if (timerType === "Break") {
          setTimerType("Session");
          setMinutes(sessionLength);
          setSeconds(0);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    minutes,
    timerGoing,
    breakLength,
    sessionLength,
    timerType,
    beep,
    seconds,
  ]);

  useEffect(() => {
    setDynamicTime(document.getElementById("time-left").innerHTML);
    console.log(dynamicTime);
    if (document.getElementById("time-left").innerHTML == "00:00") {
      beep.play();
    }
  }, [seconds, dynamicTime]);

  const resetClickHandler = () => {
    setSessionLength(25);
    setBreakLength(5);
    setMinutes(25);
    setSeconds(0);
    setTimerGoing(false);
    setTimerType("Session");
    const beep = document.getElementById("beep");
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
          <h2 id="time-left">{timeFormatter(minutes, seconds)}</h2>
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
              <i className="play-pause-button fa fa-pause fa-2x"></i>
            </button>
          )}
          {!timerGoing && (
            <button
              className="timer-control"
              id="start-stop"
              onClick={timerClickHandler}
            >
              <i className="play-pause-button fa fa-play fa-2x"></i>
            </button>
          )}

          <button
            className="timer-control"
            id="reset"
            onClick={resetClickHandler}
          >
            <i className="reset-button fa fa-refresh fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
